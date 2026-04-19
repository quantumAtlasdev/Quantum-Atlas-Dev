import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
})

const SERVICE_LABELS: Record<string, string> = {
  'voice-ai': 'AI Voice Agents',
  'idp': 'Document Intelligence',
  'rag': 'Enterprise RAG',
  'saas': 'Custom SaaS Development',
  'automation': 'AI Automation',
  'content': 'Content & Video',
  'unsure': 'Not sure — tell us more',
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'mail.privateemail.com',
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const serviceLabel = SERVICE_LABELS[data.service] ?? data.service
    const toEmail = process.env.CONTACT_EMAIL ?? 'contact@quantumatlas.dev'

    // Send email via Namecheap SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransport()
      await transporter.sendMail({
        from: `"Quantum Atlas Website" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: `"${data.name}" <${data.email}>`,
        subject: `New enquiry: ${data.name} at ${data.company} — ${serviceLabel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #FFBF00; margin-top: 0;">New Discovery Call Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; font-weight: bold;">${data.company}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #FFBF00;">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${data.phone ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Service</td><td style="padding: 8px 0;">${serviceLabel}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #333; margin: 16px 0;" />
            <p style="color: #888; margin-bottom: 4px;">Message</p>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${data.message}</p>
            <p style="color: #aaa; font-size: 12px; margin-top: 24px;">Submitted via quantumatlas.dev/contact · Reply to this email to respond directly to ${data.name}.</p>
          </div>
        `,
        text: `New Discovery Call Request\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone ?? '—'}\nService: ${serviceLabel}\n\nMessage:\n${data.message}`,
      })
    } else {
      console.warn('SMTP credentials not set — email not sent')
    }

    // Also save to Payload CMS if available
    try {
      const payloadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`, {
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
      if (!payloadRes.ok) console.error('Payload save failed:', await payloadRes.text())
    } catch (e) {
      console.error('Payload unavailable:', e)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 })
    }
    console.error('Contact API error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
