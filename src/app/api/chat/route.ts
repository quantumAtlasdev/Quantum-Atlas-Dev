import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID ?? 'asst_N9FHILecF68s3PLMIGIUigMA'

function getClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set')
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = await req.json()
    if (!message?.trim()) return NextResponse.json({ error: 'No message' }, { status: 400 })

    const client = getClient()

    // Create thread on first message, reuse on subsequent
    const thread = threadId
      ? { id: threadId }
      : await client.beta.threads.create()

    // Add user message
    await client.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message.trim(),
    })

    // Run assistant and poll until complete
    const run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: ASSISTANT_ID,
    })

    if (run.status !== 'completed') {
      return NextResponse.json({ error: 'Assistant did not complete' }, { status: 500 })
    }

    // Get latest assistant message
    const messages = await client.beta.threads.messages.list(thread.id, { limit: 1 })
    const latest = messages.data[0]
    const text = latest?.content
      .filter((c) => c.type === 'text')
      .map((c) => (c.type === 'text' ? c.text.value : ''))
      .join('')

    return NextResponse.json({ reply: text, threadId: thread.id })
  } catch (e) {
    console.error('Chat API error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
