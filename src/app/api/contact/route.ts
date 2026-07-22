import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend apenas se a chave da API existir no .env
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltam dados obrigatórios' }, { status: 400 });
    }

    if (resend) {
      // Tenta enviar o e-mail através da API da Resend
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['pvolympio@gmail.com'],
        subject: `Nova mensagem de ${name} do Portfólio`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
        replyTo: email,
      });
      
      return NextResponse.json({ success: true, message: 'E-mail enviado via Resend' });
    } else {
      // Fallback para logs de desenvolvimento se não houver Chave de API
      console.log('=== E-Mail Simulado (Log Backend) ===');
      console.log(`De: ${name} (${email})`);
      console.log(`Mensagem:\n${message}\n=====================================`);
      
      // Delay simulando request HTTP
      await new Promise(r => setTimeout(r, 1000));
      
      return NextResponse.json({ success: true, message: 'Simulação realizada com sucesso' });
    }
  } catch (error) {
    console.error('Erro na rota de envio original:', error);
    return NextResponse.json({ error: 'Erro ao processar contato' }, { status: 500 });
  }
}
