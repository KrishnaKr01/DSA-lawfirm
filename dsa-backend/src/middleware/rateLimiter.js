const rateLimit = require("express-rate-limit");

// ── General API limiter ───────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Strict limiter for inquiry form ──────────────────────────────────────────
// Prevents spam — max 5 submissions per IP per hour
const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: "Too many inquiries submitted. Please try again after 1 hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, inquiryLimiter };
