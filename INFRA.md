# Quantum Atlas — Infrastructure Reference

> Complete reference for all running services, servers, and how they connect.
> Use this for reinstallation, handoff to another agent, or onboarding.
> Last updated: April 2026

---

## Server Map

| Name | Role | IP (Public) | IP (Tailscale) | OS |
|------|------|-------------|----------------|----|
| **RAG Server** | RAG API + PostgreSQL | 109.205.182.9 | 100.87.227.72 | Ubuntu |
| **Prod Server** | iKargos CHA, n8n, MCP Gateway | — | 100.67.19.14 | Ubuntu |
| **Main VPS** | Quantum Atlas website, LiveKit agent | 173.212.246.44 | — | Ubuntu |

All servers are interconnected via **Tailscale** — use Tailscale IPs for internal SSH.
SSH access: `ssh root@<tailscale-ip>` (root login, key-based or password `AndreW3050`).

---

## Service 1 — Quantum Atlas Website (Next.js + Payload CMS)

**Location:** `/opt/Quantum-Atlas-Dev/` on Main VPS (173.212.246.44)
**Process manager:** PM2
**URL:** https://quantumatlas.dev
**Reverse proxy:** Caddy (`/etc/caddy/Caddyfile`)

### Stack
- **Next.js 16.2** (App Router, Turbopack, TypeScript)
- **Payload CMS 3.x** — admin at `/admin`
- **PostgreSQL** — `postgresql://quantumatlasdev:AndreW3050@localhost:5432/quantum_atlas_Dev`
- **pnpm** — package manager (never npm/yarn)

### Start / Restart
```bash
cd /opt/Quantum-Atlas-Dev
pm2 start ecosystem.config.js   # or: pm2 restart quantum-atlas
pm2 save
```

### Environment Variables
File: `/opt/Quantum-Atlas-Dev/.env`
Key vars:
```
DATABASE_URI=postgresql://quantumatlasdev:AndreW3050@localhost:5432/quantum_atlas_Dev
PAYLOAD_SECRET=<secret>
OPENAI_API_KEY=<key>
OPENAI_ASSISTANT_ID=asst_N9FHILecF68s3PLMIGIUigMA
LIVEKIT_URL=ws://173.212.246.44:7880
NEXT_PUBLIC_LIVEKIT_URL=ws://173.212.246.44:7880
LIVEKIT_API_KEY=mykey
LIVEKIT_API_SECRET=<secret>
LIVEKIT_PUBLIC_URL=wss://livekit.quantumatlas.dev
SMTP_HOST=mail.privateemail.com / SMTP_USER=contact@quantumatlas.dev
```

### Key API Routes
| Route | Purpose |
|-------|---------|
| `POST /api/chat` | Text chatbot — uses OpenAI Assistants API (thread-based) |
| `POST /api/livekit-token` | Issues LiveKit JWT for voice chat rooms |
| `POST /api/contact` | Contact form → sends email via SMTP |

### Chat Widget (`src/components/chat/ChatWidget.tsx`)
Floating bottom-right widget with two modes:
- **Text mode** — calls `/api/chat` → OpenAI Assistants API (assistant: `asst_N9FHILecF68s3PLMIGIUigMA`)
- **Voice mode** — calls `/api/livekit-token` → connects to LiveKit room → LiveKit agent handles speech

---

## Service 2 — LiveKit Voice Agent

**Location:** `/opt/apps/livekit-agent/` on Main VPS
**Process manager:** PM2 (`pm2 list` → `livekit-agent`)
**Source:** `infra/livekit-agent/` in this repo

### What It Does
Python-based voice AI agent that:
1. Joins a LiveKit room when a visitor starts voice chat on the website
2. Transcribes speech with **Deepgram STT** (nova-3, 300ms endpointing)
3. Sends transcript to **GPT-4o-mini** for response generation
4. Converts reply to speech with **Deepgram TTS** (aura-asteria-en)
5. Calls the **RAG knowledge base** via `lookup_knowledge` tool when user asks specific questions
6. Auto-disconnects after **60 seconds** of user inactivity

### Stack
- Python 3.x + `venv` at `/opt/apps/livekit-agent/venv/`
- `livekit-agents` SDK v1.3.5
- `livekit-plugins-deepgram` (STT + TTS)
- `livekit-plugins-openai` (LLM)
- `aiohttp` (async HTTP for RAG calls)

### Start / Restart
```bash
# Using PM2
pm2 restart livekit-agent

# Manual
cd /opt/apps/livekit-agent
source venv/bin/activate
bash start.sh   # sources .env then runs: python agent.py start
```

### Environment Variables
File: `/opt/apps/livekit-agent/.env` (see `.env.example` in this folder)
```
LIVEKIT_URL=ws://173.212.246.44:7880
LIVEKIT_API_KEY=mykey
LIVEKIT_API_SECRET=<secret>
DEEPGRAM_API_KEY=<key>
OPENAI_API_KEY=<key>
RAG_API_URL=https://api.navbharatwater.biz/api/v1/search
RAG_API_KEY=rag_sk_<key>
```

### Key Configuration (agent.py)
```python
AgentSession(
    turn_detection="stt",
    stt=deepgram.STT(model="nova-3", endpointing_ms=300, no_delay=True, interim_results=True),
    llm=openai.LLM(model="gpt-4o-mini"),
    tts=deepgram.TTS(model="aura-asteria-en"),
    allow_interruptions=True,
    min_endpointing_delay=0.0,
)
INACTIVITY_TIMEOUT = 60  # seconds — auto-disconnect
```

### RAG Integration
The agent has a `lookup_knowledge` function tool. When the LLM decides it needs factual information (pricing, services, case studies), it calls this tool which:
- POSTs to `RAG_API_URL` with `X-API-Key: RAG_API_KEY` header
- Query params: `limit=4, mode=hybrid, include_content=True`
- Returns top 4 chunks joined with `---` separator
- 5-second timeout; graceful fallback on failure

---

## Service 3 — LiveKit Server

**Location:** Main VPS (173.212.246.44)
**Port:** 7880 (WebSocket), exposed as `wss://livekit.quantumatlas.dev` via Caddy
**Deployment:** Docker container

### How It Connects
```
Browser (ChatWidget)
  → POST /api/livekit-token  (Next.js — issues JWT)
  → connects to wss://livekit.quantumatlas.dev  (Caddy → LiveKit:7880)
  → LiveKit dispatches job to agent worker
  → LiveKit Agent (Python) joins same room
  → Audio flows: Browser mic → LiveKit → Agent STT → LLM → TTS → Browser speaker
```

### Restart
```bash
docker ps | grep livekit
docker restart <container_id>
```

---

## Service 4 — RAG API (Knowledge Base)

**Location:** RAG Server (109.205.182.9 / Tailscale: 100.87.227.72)
**Path:** `/opt/rag-saas/`
**Deployment:** Docker Compose (`docker compose -f /opt/rag-saas/docker-compose.yml`)
**Public URL:** https://api.navbharatwater.biz
**Admin UI:** https://app.navbharatwater.biz

### Stack
- FastAPI + SQLAlchemy (asyncpg)
- PostgreSQL with pgvector extension
- Hybrid retrieval: BM25 (ParadeDB) + pgvector + Apache AGE graph
- Jina v4 embeddings

### API Key Auth
Keys stored in `api_keys` table in the RAG database.
The Quantum Atlas voice agent uses API key scoped to org tenant `89c744a5-dedd-4505-8e53-89d90da924ed`.

### Restart
```bash
ssh root@100.87.227.72  # or ssh root@109.205.182.9
cd /opt/rag-saas
docker compose restart api
# If code was changed:
docker compose build api && docker compose down api && docker compose up -d api
```

### Known Fixes Applied
- `pool_pre_ping=True` added to both SQLAlchemy engines in:
  - `src/core/database.py`
  - `src/auth/tenant.py`
- `getattr(user, "user_id", None)` in `src/retrieval/router.py` — handles `ApiKeyUser` vs `AuthenticatedUser`

---

## Service 5 — MCP Gateway

**Location:** Prod Server (Tailscale: 100.67.19.14)
**Path:** `/opt/apps/mcp-gateway/`
**Process manager:** PM2 (`pm2 list` → `mcp-gateway`)
**Endpoint:** `http://100.67.19.14:8900/mcp` (Tailscale-internal only, NOT public)
**Protocol:** StreamableHTTP (requires `Accept: application/json, text/event-stream` header)
**Source:** `infra/mcp-gateway/` in this repo

### What It Does
Aggregates multiple MCP servers behind a single HTTP endpoint so Claude Code agents and other MCP clients can call tools without running multiple processes.

### Available Tools
| Tool | Server | Purpose |
|------|--------|---------|
| `postgres.query` | @modelcontextprotocol/server-postgres | Read-only SQL on `boe_customs_db` |
| `github.*` (many) | @modelcontextprotocol/server-github | GitHub repo operations |
| `filesystem.*` | @modelcontextprotocol/server-filesystem | Read/write `/opt/apps` on prodserver |
| `memory.*` | @modelcontextprotocol/server-memory | Persistent key-value memory store |

### Start / Restart
```bash
ssh root@100.67.19.14
pm2 restart mcp-gateway
# First time setup:
pm2 start /opt/apps/mcp-gateway/start.sh --name mcp-gateway --cwd /opt/apps/mcp-gateway
pm2 save
```

### Test Endpoint
```bash
curl http://100.67.19.14:8900/mcp \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

---

## Service 6 — n8n Workflow Automation

**Location:** Prod Server (Tailscale: 100.67.19.14)
**Port:** 5678 (localhost only)
**Access:** Via Tailscale — `http://100.67.19.14:5678`

### Notes
- Self-hosted n8n instance
- Used for workflow automation and AI agent orchestration
- NOT exposed publicly — accessible via Tailscale only

---

## How Everything Connects (Full Data Flow)

```
VISITOR on quantumatlas.dev
│
├── TEXT CHAT
│   └── ChatWidget (text mode)
│       └── POST /api/chat
│           └── OpenAI Assistants API
│               └── Assistant: asst_N9FHILecF68s3PLMIGIUigMA
│                   └── Returns reply → displayed in chat
│
└── VOICE CHAT
    └── ChatWidget (voice mode)
        ├── POST /api/livekit-token  → issues JWT for room
        └── WebRTC connect → wss://livekit.quantumatlas.dev (Caddy → LiveKit:7880)
            └── LiveKit dispatches job
                └── LiveKit Agent (Python, /opt/apps/livekit-agent/)
                    ├── Deepgram STT — transcribes mic audio (nova-3, 300ms endpointing)
                    ├── GPT-4o-mini — generates response
                    │   └── [if factual Q] lookup_knowledge tool
                    │       └── POST https://api.navbharatwater.biz/api/v1/search
                    │           └── RAG API (109.205.182.9) → returns relevant chunks
                    └── Deepgram TTS — synthesizes speech → plays in browser (aura-asteria-en)


CLAUDE CODE AGENTS (via Tailscale)
└── MCP Gateway: http://100.67.19.14:8900/mcp
    ├── postgres.query → boe_customs_db on prodserver
    ├── github.* → GitHub repos
    ├── filesystem.* → /opt/apps on prodserver
    └── memory.* → /opt/apps/mcp-memory on prodserver
```

---

## Caddy Configuration

**Location:** `/etc/caddy/Caddyfile` on Main VPS
Key virtual hosts:
- `quantumatlas.dev` → Next.js app (port 3000)
- `livekit.quantumatlas.dev` → LiveKit server (port 7880, WebSocket upgrade)

---

## GitHub Repository

**URL:** https://github.com/navbharatwaters/Quantum-Atlas-Dev
**Branch:** `main`
**Structure:**
```
├── src/                          Next.js + Payload CMS source
│   ├── app/
│   │   ├── api/chat/             Text chatbot (OpenAI Assistants)
│   │   ├── api/livekit-token/    LiveKit JWT issuer
│   │   └── api/contact/          Contact form email
│   └── components/
│       └── chat/ChatWidget.tsx   Floating chat widget (text + voice)
├── infra/
│   ├── livekit-agent/            Voice agent Python source + .env.example
│   └── mcp-gateway/              MCP gateway config + start script
├── CLAUDE.md                     Project context for AI agents
├── INFRA.md                      This file
└── AGENTS.md                     Cross-session agent learnings
```

---

## Reinstallation Guide

### Fresh install — LiveKit Agent
```bash
apt install python3 python3-venv -y
mkdir -p /opt/apps/livekit-agent
cd /opt/apps/livekit-agent
python3 -m venv venv
source venv/bin/activate
pip install "livekit-agents[deepgram,openai]>=1.3.5" aiohttp
# Copy agent.py and start.sh from repo infra/livekit-agent/
# Create .env from .env.example and fill in credentials
pm2 start start.sh --name livekit-agent --cwd /opt/apps/livekit-agent
pm2 save
```

### Fresh install — MCP Gateway
```bash
# Requires Node.js 18+
mkdir -p /opt/apps/mcp-gateway
# Copy start.sh and create config.json from config.example.json (fill credentials)
pm2 start /opt/apps/mcp-gateway/start.sh --name mcp-gateway --cwd /opt/apps/mcp-gateway
pm2 save
```

### Fresh install — Website
```bash
git clone https://github.com/navbharatwaters/Quantum-Atlas-Dev.git /opt/Quantum-Atlas-Dev
cd /opt/Quantum-Atlas-Dev
pnpm install
cp .env.example .env   # fill in all values
pnpm build
pm2 start ecosystem.config.js
pm2 save
```

---

## Credentials Reference

> DO NOT commit actual credentials. This section lists WHERE to find them.

| Secret | Location |
|--------|----------|
| All website env vars | `/opt/Quantum-Atlas-Dev/.env` on Main VPS |
| LiveKit agent env vars | `/opt/apps/livekit-agent/.env` on Main VPS |
| RAG API key (voice agent) | In `.env` above as `RAG_API_KEY` |
| MCP Gateway config (with creds) | `/opt/apps/mcp-gateway/config.json` on Prod Server |
| PostgreSQL (main) | `AndreW3050` — see `.env` for full URIs |
| SMTP | `contact@quantumatlas.dev` / `AndreW#3050` via Namecheap Private Email |
