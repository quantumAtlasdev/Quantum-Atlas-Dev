import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Save to Payload CMS via internal API
    // In dev, this will fail gracefully if DB not connected
    try {
      const payloadRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'discovery-call',
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          service: data.service,
          message: data.message,
          source: '/contact',
        }),
      })
      if (!payloadRes.ok) {
        console.error('Payload save failed:', await payloadRes.text())
      }
    } catch (e) {
      console.error('Payload unavailable:', e)
    }

    // Resend email notification (graceful failure if key is placeholder)
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'noreply@quantumatlas.ai',
          to: 'hello@quantumatlas.ai',
          subject: `New discovery call request from ${data.name} at ${data.company}`,
          text: `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nService: ${data.service}\nMessage: ${data.message}`,
        })
      } catch (e) {
        console.error('Resend failed:', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
