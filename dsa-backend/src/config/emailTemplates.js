// ── Email sent to DSA team when new inquiry arrives ──────────────────────────
const notificationEmail = (inquiry) => ({
  from: `"DSA Website" <${process.env.EMAIL_USER}>`,
  to: process.env.NOTIFY_EMAIL,
  subject: `🔔 New Inquiry: ${inquiry.firstName} ${inquiry.lastName} — ${inquiry.practiceArea || "General"}`,
  html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background:#0D1B3E; padding:24px 32px;">
          <h1 style="color:#C9A84C; margin:0; font-size:22px; letter-spacing:2px;">DSA CORPORATE SOLUTIONS</h1>
          <p style="color:rgba(255,255,255,0.6); margin:4px 0 0; font-size:12px; letter-spacing:1px;">NEW CONSULTATION REQUEST</p>
        </div>

        <!-- Body -->
        <div style="padding:32px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#666; font-size:13px; width:140px;">Full Name</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#111; font-size:13px; font-weight:600;">${inquiry.firstName} ${inquiry.lastName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#666; font-size:13px;">Email</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#111; font-size:13px;">
                <a href="mailto:${inquiry.email}" style="color:#1B3A6B;">${inquiry.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#666; font-size:13px;">Phone</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#111; font-size:13px;">${inquiry.phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#666; font-size:13px;">Company</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#111; font-size:13px;">${inquiry.company || "—"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#666; font-size:13px;">Practice Area</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee;">
                <span style="background:#C9A84C; color:#0D1B3E; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600;">
                  ${inquiry.practiceArea || "Not specified"}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#666; font-size:13px; vertical-align:top; padding-top:16px;">Message</td>
              <td style="padding:10px 0; color:#111; font-size:13px; padding-top:16px; line-height:1.6;">${inquiry.message || "—"}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background:#f9f9f9; padding:16px 32px; border-top:1px solid #eee;">
          <p style="color:#999; font-size:11px; margin:0;">
            Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kathmandu" })} (NPT) &nbsp;|&nbsp;
            IP: ${inquiry.ipAddress || "Unknown"}
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
});

// ── Confirmation email sent to the client ──────────────────────────────────────
const confirmationEmail = (inquiry) => ({
  from: `"DSA Corporate Solutions" <${process.env.EMAIL_USER}>`,
  to: inquiry.email,
  subject: `We received your inquiry — DSA Corporate Solutions`,
  html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background:#0D1B3E; padding:32px; text-align:center;">
          <h1 style="color:#C9A84C; margin:0; font-size:26px; letter-spacing:3px;">DSA</h1>
          <p style="color:rgba(255,255,255,0.7); margin:6px 0 0; font-size:12px; letter-spacing:2px;">CORPORATE SOLUTIONS LAW FIRM</p>
        </div>

        <!-- Body -->
        <div style="padding:40px 32px;">
          <h2 style="color:#0D1B3E; font-size:20px; margin:0 0 16px;">Dear ${inquiry.firstName},</h2>
          <p style="color:#444; line-height:1.8; margin:0 0 16px;">
            Thank you for reaching out to <strong>DSA Corporate Solutions</strong>. We have received your consultation request and a member of our legal team will contact you within <strong>24 business hours</strong>.
          </p>
          <p style="color:#444; line-height:1.8; margin:0 0 24px;">
            In the meantime, if you have any urgent matters, please call us directly at <strong>+977 9700227418</strong>.
          </p>

          <!-- Summary Box -->
          <div style="background:#f9f6ef; border-left:4px solid #C9A84C; padding:20px 24px; margin-bottom:24px;">
            <p style="color:#666; font-size:12px; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">Your Request Summary</p>
            <p style="color:#111; font-size:14px; margin:4px 0;"><strong>Practice Area:</strong> ${inquiry.practiceArea || "General Inquiry"}</p>
            ${inquiry.company ? `<p style="color:#111; font-size:14px; margin:4px 0;"><strong>Company:</strong> ${inquiry.company}</p>` : ""}
            <p style="color:#111; font-size:14px; margin:4px 0;"><strong>Reference ID:</strong> #${Date.now().toString().slice(-6)}</p>
          </div>

          <p style="color:#444; line-height:1.8; margin:0;">
            We look forward to serving you.
          </p>
          <p style="color:#0D1B3E; font-weight:bold; margin:24px 0 0;">
            DSA Corporate Solutions
          </p>
          <p style="color:#C9A84C; font-size:12px; margin:4px 0;">Justice. Integrity. Results.</p>
        </div>

        <!-- Footer -->
        <div style="background:#0D1B3E; padding:20px 32px; text-align:center;">
          <p style="color:rgba(255,255,255,0.5); font-size:11px; margin:0;">
            © 2025 DSA Corporate Solutions · Kathmandu, Nepal<br/>
            This is an automated confirmation email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
});

module.exports = { notificationEmail, confirmationEmail };
