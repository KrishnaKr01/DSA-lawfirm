const nodemailer = require("nodemailer");

// Create reusable transporter//
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection on startup
const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email service ready");
  } catch (error) {
    console.warn("⚠️  Email service not configured:", error.message);
  }
};

module.exports = { transporter, verifyEmailConnection };
