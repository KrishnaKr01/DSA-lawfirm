const Inquiry = require("../models/Inquiry");
const { transporter } = require("../config/email");
const { notificationEmail, confirmationEmail } = require("../config/emailTemplates");

// ── POST /api/inquiries ────────────────────────────────────────────────────────
// Submit a new consultation inquiry from the contact form
const submitInquiry = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      practiceArea,
      message,
    } = req.body;

    // Save to MongoDB
    const inquiry = await Inquiry.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      practiceArea,
      message,
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "",
    });

    // Send emails (don't block response if email fails)
    try {
      // 1. Notify DSA team
      await transporter.sendMail(notificationEmail(inquiry));
      // 2. Confirm to client
      await transporter.sendMail(confirmationEmail(inquiry));
    } catch (emailError) {
      console.warn("⚠️  Email sending failed:", emailError.message);
      // We still return success — inquiry was saved to DB
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully. We will contact you within 24 hours.",
      data: {
        id: inquiry._id,
        name: `${inquiry.firstName} ${inquiry.lastName}`,
        email: inquiry.email,
        practiceArea: inquiry.practiceArea,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Submit inquiry error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit inquiry. Please try again.",
    });
  }
};

// ── GET /api/inquiries ─────────────────────────────────────────────────────────
// Get all inquiries (for future admin dashboard use)
const getAllInquiries = async (req, res) => {
  try {
    const { status, practiceArea, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (practiceArea) filter.practiceArea = practiceArea;

    const total = await Inquiry.countDocuments(filter);
    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-ipAddress"); // hide IP from response

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: inquiries,
    });
  } catch (error) {
    console.error("Get inquiries error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries.",
    });
  }
};

// ── GET /api/inquiries/:id ─────────────────────────────────────────────────────
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiry.",
    });
  }
};

// ── PATCH /api/inquiries/:id/status ───────────────────────────────────────────
// Update inquiry status (new → read → replied → closed)
const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["new", "read", "replied", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    return res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update status." });
  }
};

// ── DELETE /api/inquiries/:id ──────────────────────────────────────────────────
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    return res.status(200).json({ success: true, message: "Inquiry deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete inquiry." });
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
