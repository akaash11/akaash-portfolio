import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Honeypot check - silently reject bots
    if (body.honeypot) {
      console.log('Bot detected via honeypot');
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Validation
    const errors: string[] = [];

    // Name validation
    if (!body.name || typeof body.name !== 'string') {
      errors.push('Name is required');
    } else if (body.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    } else if (body.name.length > 80) {
      errors.push('Name is too long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || typeof body.email !== 'string') {
      errors.push('Email is required');
    } else if (!emailRegex.test(body.email)) {
      errors.push('Invalid email format');
    } else if (body.email.length > 120) {
      errors.push('Email is too long');
    }

    // Message validation
    if (!body.message || typeof body.message !== 'string') {
      errors.push('Message is required');
    } else if (body.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    } else if (body.message.length > 3000) {
      errors.push('Message is too long');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: errors[0] },
        { status: 400 }
      );
    }

    // Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !contactToEmail || !contactFromEmail) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { ok: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: contactToEmail,
        reply_to: body.email,
        subject: `Portfolio Contact: ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData);

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
