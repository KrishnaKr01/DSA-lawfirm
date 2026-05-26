const express = require("express");
const router = express.Router();

const {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const { validateInquiry } = require("../middleware/validate");
const { inquiryLimiter } = require("../middleware/rateLimiter");

// ── Public Routes ─────────────────────────────────────────────────────────────

// POST /api/inquiries  →  Submit contact form
router.post("/", inquiryLimiter, validateInquiry, submitInquiry);

// ── Internal / Admin Routes ───────────────────────────────────────────────────
// These are unprotected for now — add auth middleware here later
// Example: router.get("/", authMiddleware, getAllInquiries)

// GET /api/inquiries              →  Get all (with optional ?status=new&page=1)
router.get("/", getAllInquiries);

// GET /api/inquiries/:id          →  Get single inquiry
router.get("/:id", getInquiryById);

// PATCH /api/inquiries/:id/status →  Update status
router.patch("/:id/status", updateInquiryStatus);

// DELETE /api/inquiries/:id       →  Delete inquiry
router.delete("/:id", deleteInquiry);

module.exports = router;
