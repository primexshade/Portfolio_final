import ContactMessage from '../models/ContactMessage.js'
import { sendEmail } from '../utils/sendEmail.js'

/** POST /api/contact - persist message and send email */
export async function sendContact(req, res, next) {
  try {
    const { name, email, message } = req.body
    const saved = await ContactMessage.create({ name, email, message })

    // Send an email notification
    try {
      await sendEmail({
        to: process.env.CONTACT_TO || process.env.SMTP_FROM,
        subject: `New portfolio contact from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br/>${message}</p>`
      })
    } catch (e) {
      // Log email errors but don't fail the API request
      console.error('Email send failed:', e.message)
    }

    res.status(201).json({ message: 'Message sent successfully', id: saved._id })
  } catch (err) { next(err) }
}
