import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(5).max(2000),
  website: z.string().optional() // Honeypot field for anti-spam
});

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check honeypot field
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const { name, email, message } = parseResult.data;

    if (!resend) {
      // Return 503 Service Unavailable when email sending is not configured
      return NextResponse.json(
        { error: 'service_unavailable', message: 'Serviço de e-mail temporariamente indisponível' },
        { status: 503 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const destEmail = process.env.CONTACT_DEST_EMAIL || 'pvolympio@gmail.com';

    await resend.emails.send({
      from: fromEmail,
      to: [destEmail],
      subject: `[Portfólio] Nova mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      reply_to: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar mensagem' }, { status: 500 });
  }
}
