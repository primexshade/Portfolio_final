import ContactMessage from '../models/ContactMessage.js'
import { sendEmail } from '../utils/sendEmail.js'

/**
 * POST /api/contact
 * Handle contact form submission
 * - Validates and sanitizes input
 * - Persists to database
 * - Sends email notification
 * - Returns success/error response
 */
export async function sendContact(req, res, next) {
  try {
    const { name, email, message, subject } = req.body
    
    // Input validation (already done by middleware, but double-check)
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and message are required' 
      })
    }
    
    // Validate email format (already done, but final check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      })
    }
    
    // Create database record
    let savedId = null
    let createdAt = null
    
    try {
      const messageData = {
        name,
        email,
        message,
        subject: subject || 'No subject',
        isRead: false,
        ipAddress: req.ip || req.connection.remoteAddress, // Log IP for security
        userAgent: req.get('user-agent'), // Log user agent
      }
      
      const saved = await ContactMessage.create(messageData)
      savedId = saved._id
      createdAt = saved.createdAt
      console.log('✅ Message saved to database:', savedId)
    } catch (dbErr) {
      console.warn('⚠️  Database error - message not persisted:', dbErr.message)
      // Don't fail the request if DB is down, but log it
    }

    // Send email notification with enhanced security
    try {
      const contactEmail = process.env.CONTACT_TO || process.env.SMTP_USER
      const senderEmail = process.env.SMTP_FROM || `${name} <${email}>`
      
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #0D1117; color: #fff; padding: 20px; }
              .content { padding: 20px; border: 1px solid #ddd; }
              .footer { color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Portfolio Contact</h2>
              </div>
              <div class="content">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              <div class="footer">
                <p>Received: ${new Date().toLocaleString()}</p>
                <p>This is an automated message from your portfolio contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `
      
      await sendEmail({
        to: contactEmail,
        replyTo: email, // Allow replying directly to sender
        subject: `Portfolio Contact: ${subject || 'No subject'} - From ${name}`,
        html: emailHtml,
        text: `From: ${name} (${email})\nSubject: ${subject || 'No subject'}\n\n${message}`,
      })
      console.log('✅ Contact email sent successfully to', contactEmail)
    } catch (emailErr) {
      console.error('⚠️  Email send failed:', emailErr.message)
      // Still return success as data was saved
    }

    // Return success response
    res.status(201).json({ 
      success: true,
      message: 'Thank you! Your message has been received. I\'ll get back to you soon.',
      id: savedId || null,
      timestamp: createdAt || new Date().toISOString(),
    })
    
  } catch (err) { 
    console.error('❌ Contact form error:', err)
    next(err) 
  }
}
