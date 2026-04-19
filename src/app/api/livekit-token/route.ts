import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

const LK_API_KEY = process.env.LIVEKIT_API_KEY ?? 'mykey'
const LK_API_SECRET = process.env.LIVEKIT_API_SECRET ?? ''
// Always return the public WSS URL so browsers on HTTPS don't hit mixed-content blocks
const LK_PUBLIC_URL = process.env.LIVEKIT_PUBLIC_URL ?? 'wss://livekit.quantumatlas.dev'

export async function POST(req: NextRequest) {
  try {
    const { roomName, participantName } = await req.json()
    if (!roomName || !participantName) {
      return NextResponse.json({ error: 'roomName and participantName required' }, { status: 400 })
    }

    if (!LK_API_SECRET) {
      return NextResponse.json({ error: 'LIVEKIT_API_SECRET not configured' }, { status: 500 })
    }

    const token = new AccessToken(LK_API_KEY, LK_API_SECRET, {
      identity: participantName,
      ttl: '1h',
    })
    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    })

    const jwt = await token.toJwt()
    return NextResponse.json({ token: jwt, url: LK_PUBLIC_URL })
  } catch (e) {
    console.error('LiveKit token error:', e)
    return NextResponse.json({ error: 'Token generation failed' }, { status: 500 })
  }
}
