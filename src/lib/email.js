import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendEmail({ to, subject, html }) {
  // If credentials aren't set, log to console for development
  if (!process.env.EMAIL_SERVER_USER || process.env.EMAIL_SERVER_USER === 'your_user') {
    console.log('--- DEVELOPMENT EMAIL LOG ---')
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${html}`)
    console.log('-----------------------------')
    return { success: true, mocked: true }
  }

  try {
    await transporter.sendMail({
      from: `"DriveNow Concierge" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Email transmission error:', error)
    return { error: 'Failed to transmit notification.' }
  }
}

export const emailTemplates = {
  reservationRequest: (user, car, reservation) => ({
    subject: `[DriveNow] Reservation Request Received: ${car.brand} ${car.model}`,
    html: `
      <div style="font-family: sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 16px;">
        <h2 style="color: #6366f1; font-style: italic; text-transform: uppercase;">Identity Verified. Request Logged.</h2>
        <p>Greetings ${user.name || user.email},</p>
        <p>Your request for the <strong>${car.brand} ${car.model}</strong> has been successfully transmitted to our concierge team.</p>
        <div style="background-color: #0a0a0a; padding: 20px; border: 1px solid #1f1f1f; margin: 20px 0;">
           <p style="margin: 0; font-size: 12px; color: #444;">CYCLE DATES</p>
           <p style="margin: 5px 0;">${new Date(reservation.startDate).toLocaleDateString()} — ${new Date(reservation.endDate).toLocaleDateString()}</p>
           <p style="margin: 15px 0 0 0; font-size: 12px; color: #444;">TOTAL AUTHORIZATION</p>
           <p style="margin: 5px 0; color: #6366f1; font-weight: bold;">$${reservation.totalPrice}</p>
        </div>
        <p style="font-size: 12px; color: #444;">Awaiting concierge finalization. You will be notified upon status update.</p>
      </div>
    `
  }),
  statusUpdate: (user, car, status) => ({
    subject: `[DriveNow] Fleet Operation Status: ${status.toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 16px;">
        <h2 style="color: ${status === 'Confirmed' ? '#22c55e' : '#ef4444'}; font-style: italic; text-transform: uppercase;">Concierge Update: ${status}</h2>
        <p>The status of your reservation for the <strong>${car.brand} ${car.model}</strong> has been modified.</p>
        <p>New Status: <span style="font-weight: bold; color: #6366f1;">${status}</span></p>
        <p>Visit your Member Command Center to view further details or finalize authorization.</p>
        <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; text-transform: uppercase; font-size: 12px;">Access Dashboard</a>
      </div>
    `
  }),
  newMessage: (sender, receiver, reservation, car, content) => ({
    subject: `[DriveNow] New Secure Message: ${car.brand} ${car.model}`,
    html: `
      <div style="font-family: sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 16px;">
        <h2 style="color: #6366f1; font-style: italic; text-transform: uppercase;">Secure Transmission Received</h2>
        <p>Greetings,</p>
        <p>You have received a new message regarding the <strong>${car.brand} ${car.model}</strong> reservation.</p>
        <div style="background-color: #0a0a0a; padding: 20px; border: 1px solid #1f1f1f; margin: 20px 0;">
           <p style="margin: 0; font-size: 10px; color: #444; font-weight: bold; text-transform: uppercase;">MESSAGE CONTENT</p>
           <p style="margin: 10px 0; font-style: italic; color: #888;">"${content}"</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/dashboard/messages/${reservation._id}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; text-transform: uppercase; font-size: 12px;">Reply to Thread</a>
      </div>
    `
  })
}
