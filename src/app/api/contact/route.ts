import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/data/contactSchema';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON malformado' }, { status: 400 });
  }

  const parseResult = contactSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Dados de formulário inválidos' }, { status: 400 });
  }

  const { name, email, message, website } = parseResult.data;

  // Check anti-spam honeypot
  if (website && website.length > 0) {
    return NextResponse.json({ error: 'Spam detectado' }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const destEmail = process.env.CONTACT_DEST_EMAIL;

  // If email configuration is incomplete, return 503 Service Unavailable
  if (!resendApiKey || !fromEmail || !destEmail) {
    return NextResponse.json(
      { error: 'service_unavailable', message: 'Serviço de e-mail temporariamente indisponível' },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [destEmail],
      subject: `[Portfólio] Nova mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      reply_to: email,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Erro no serviço de e-mail' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Erro ao processar envio' }, { status: 500 });
  }
}
