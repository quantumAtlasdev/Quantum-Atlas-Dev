import asyncio
import os
import logging
import aiohttp
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    RunContext,
    WorkerOptions,
    cli,
    function_tool,
)
from livekit.agents.voice.room_io import RoomOptions, AudioInputOptions
from livekit.plugins import deepgram, openai

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

INACTIVITY_TIMEOUT = 60

DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
RAG_API_URL = os.environ.get("RAG_API_URL", "https://api.navbharatwater.biz/api/v1/search")
RAG_API_KEY = os.environ.get("RAG_API_KEY", "")

if not DEEPGRAM_API_KEY:
    logger.error("DEEPGRAM_API_KEY not set"); exit(1)
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY not set"); exit(1)
if not RAG_API_KEY:
    logger.warning("RAG_API_KEY not set — knowledge base lookups will be skipped")


@function_tool
async def lookup_knowledge(context: RunContext, query: str):
    """Search the Quantum Atlas knowledge base for information about services,
    pricing, case studies, or any specific topic the user asks about."""

    if not RAG_API_KEY:
        return {"result": "Knowledge base not configured."}

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                RAG_API_URL,
                headers={
                    "Content-Type": "application/json",
                    "X-API-Key": RAG_API_KEY,
                },
                json={
                    "query": query,
                    "limit": 4,
                    "mode": "hybrid",
                    "include_content": True,
                    "highlight": False,
                },
                timeout=aiohttp.ClientTimeout(total=5),
            ) as resp:
                if resp.status != 200:
                    logger.warning(f"RAG returned {resp.status} for query: {query!r}")
                    return {"result": "Could not retrieve information right now."}

                data = await resp.json()
                results = data.get("results", [])
                if not results:
                    return {"result": "No relevant information found in the knowledge base."}

                # Combine top chunks into a single context string
                context_parts = []
                for r in results:
                    content = (r.get("content") or "").strip()
                    if content:
                        context_parts.append(content)

                combined = "\n\n---\n\n".join(context_parts)
                logger.info(f"RAG returned {len(results)} chunks for query: {query!r}")
                return {"result": combined}

    except asyncio.TimeoutError:
        logger.warning(f"RAG timeout for query: {query!r}")
        return {"result": "Knowledge base lookup timed out."}
    except Exception as e:
        logger.error(f"RAG error: {e}")
        return {"result": "Knowledge base lookup failed."}


async def entrypoint(ctx: JobContext):
    logger.info(f"Starting agent for room: {ctx.room.name}")

    await ctx.connect()

    participant = await ctx.wait_for_participant()
    logger.info(f"Participant joined: {participant.identity}")

    agent = Agent(
        instructions="""You are the Quantum Atlas voice assistant — a concise, knowledgeable AI for a production-grade AI implementation company based in India.

Quantum Atlas builds: AI Voice Agents (self-hosted LiveKit, ₹7/min vs ₹65/min market), Intelligent Document Processing (hundreds of docs in minutes, ₹7/page vs Nanonets ₹25/page), Enterprise RAG knowledge systems (on-premise, citations on every answer), Custom AI SaaS platforms, and AI Workflow Automation.

Key proof points:
- Voice AI running 4+ months in Navbharat Shipping
- DHL evaluated and tested our IDP platform on a dedicated production server
- Maharashtra Government (40 Customs Commissioners) interested in our RAG system for IGST
- Replaced a ₹55 lakh ERP with custom software
- Reduced a 15-person team to 2 via AI automation
- Self-hosted everything — no data leaves client premises

When a user asks a specific question about services, pricing, case studies, or technical details, use the lookup_knowledge tool to search the knowledge base for accurate information before answering.

Answer questions clearly and concisely. Speak in plain English. Keep responses under 3 sentences unless detail is needed. For complex enquiries, suggest they book a discovery call at quantumatlas.dev/contact.""",
        tools=[lookup_knowledge],
    )

    session = AgentSession(
        turn_detection="stt",
        stt=deepgram.STT(
            model="nova-3",
            endpointing_ms=300,
            no_delay=True,
            interim_results=True,
        ),
        llm=openai.LLM(model="gpt-4o-mini"),
        tts=deepgram.TTS(model="aura-asteria-en"),
        allow_interruptions=True,
        min_endpointing_delay=0.0,
    )

    last_interaction: list[float] = [asyncio.get_event_loop().time()]

    @session.on("user_input_transcribed")
    def on_transcribed(ev):
        last_interaction[0] = asyncio.get_event_loop().time()
        logger.info(f"USER SAID: '{ev.transcript}' (final={ev.is_final})")

    @session.on("agent_state_changed")
    def on_state(ev):
        logger.info(f"AGENT STATE: {ev.old_state} -> {ev.new_state}")

    @session.on("conversation_item_added")
    def on_item(ev):
        logger.info(f"CONVERSATION ITEM: role={ev.item.role} text={str(ev.item.text_content)[:80]}")

    async def inactivity_watchdog():
        while True:
            await asyncio.sleep(10)
            idle = asyncio.get_event_loop().time() - last_interaction[0]
            if idle >= INACTIVITY_TIMEOUT:
                logger.info(f"No user interaction for {INACTIVITY_TIMEOUT}s — disconnecting")
                await ctx.room.disconnect()
                return

    await session.start(
        agent=agent,
        room=ctx.room,
        room_options=RoomOptions(
            participant_identity=participant.identity,
            audio_input=AudioInputOptions(
                sample_rate=16000,
            ),
        ),
    )

    asyncio.create_task(inactivity_watchdog())

    await session.generate_reply(
        instructions="Greet the user warmly and briefly. Introduce yourself as the Quantum Atlas AI assistant and ask how you can help."
    )


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
