import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import process from 'node:process';
 
const app = express();
 
app.use(express.json({ limit: '100kb' }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : true,
    methods: ['POST', 'OPTIONS'],
  })
);
 
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});
 
app.post('/api/quote', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
      selectedProducts,
      selectedWeights,
      qtyDetails,
      deliveryPlace,
      preferredDate,
      timeSlot,
      lang,
    } = req.body ?? {};
 
    const safeFirstName = String(firstName ?? '').trim();
    const safeLastName = String(lastName ?? '').trim();
    const safeEmail = String(email ?? '').trim();
    const safePhone = String(phone ?? '').trim();
    const safeService = String(service ?? '').trim();
    const safeMessage = String(message ?? '').trim();
 
    if (!safeFirstName || !safeLastName || !safeEmail || !safePhone) {
      return res.status(400).json({ ok: false, error: 'Missing required fields.' });
    }
 
    const to = process.env.MAIL_TO ?? 'info@mazzucotelli.it';
    const from = process.env.MAIL_FROM;
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const secure = process.env.SMTP_SECURE === 'true';
 
    if (!from || !host || !user || !pass || !port) {
      return res.status(500).json({
        ok: false,
        error:
          'Server email is not configured. Set MAIL_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.',
      });
    }
 
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
 
    const lines = [
      'Richiesta Preventivo',
      '',
      `Nome: ${safeFirstName}`,
      `Cognome: ${safeLastName}`,
      `Email: ${safeEmail}`,
      `Telefono: ${safePhone}`,
      safeService ? `Servizio: ${safeService}` : null,
      Array.isArray(selectedProducts) && selectedProducts.length
        ? `Prodotti: ${selectedProducts.map(String).join(', ')}`
        : null,
      Array.isArray(selectedWeights) && selectedWeights.length
        ? `Peso Bombole: ${selectedWeights.map(String).join(', ')}`
        : null,
      qtyDetails ? `Quantità / Dettagli: ${String(qtyDetails).trim()}` : null,
      deliveryPlace ? `Luogo Consegna: ${String(deliveryPlace).trim()}` : null,
      preferredDate ? `Data Preferita: ${String(preferredDate).trim()}` : null,
      timeSlot ? `Fascia Oraria: ${String(timeSlot).trim()}` : null,
      safeMessage ? `Messaggio: ${safeMessage}` : null,
      '',
      lang ? `Lingua sito: ${String(lang).toUpperCase()}` : null,
    ].filter(Boolean);
 
    const subject = `Richiesta Preventivo - ${safeService || 'Mazzucotelli Petroli'}`;
    await transporter.sendMail({
      from,
      to,
      replyTo: safeEmail,
      subject,
      text: lines.join('\n'),
    });
 
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
});
 
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  process.stdout.write(`API listening on http://localhost:${port}\n`);
});
