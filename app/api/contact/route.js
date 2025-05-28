import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, lastname, email, phone, subject, message, honeypot } = await request.json();
    
    // Check honeypot - if filled, it's likely spam
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }
    
    // Validate required fields
    if (!subject || (!email && !phone)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create transporter for one.com email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'send.one.com', // one.com SMTP server
      port: parseInt(process.env.EMAIL_PORT) || 587, // Use 587 for TLS or 465 for SSL
      secure: process.env.EMAIL_SECURE === 'true' ? true : false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // Your one.com email
        pass: process.env.EMAIL_PASS, // Your one.com email password
      },
      // Add these options for better compatibility
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Email content
    const fullName = [name, lastname].filter(Boolean).join(' ') || 'Ej tillhandahålls';
    const contactInfo = [];
    if (email) contactInfo.push(`Epost: ${email}`);
    if (phone) contactInfo.push(`Telefon: ${phone}`);
    
    const emailContent = `
Lead från esimplee.se

Namn: ${fullName}
${contactInfo.join('\n')}
Ämne: ${subject}

${message ? `Meddelande:\n${message}` : 'Inget meddelande tillhandahålls'}

---
Skickat den: ${new Date().toLocaleString()}
    `.trim();
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: subject, // Use the subject from the form
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 