const Inquiry = require("../models/Inquiry");
const { transporter } = require("../config/email");
const { notificationEmail, confirmationEmail } = require("../config/emailTemplates");
const { appendInquiryToExcel, exportAllToExcel } = require("../config/excel");

const submitInquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, practiceArea, message } = req.body;
    const inquiry = await Inquiry.create({
      firstName, lastName, email, phone, company, practiceArea, message,
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "",
    });

    await appendInquiryToExcel(inquiry);

    try {
      await transporter.sendMail(notificationEmail(inquiry));
      await transporter.sendMail(confirmationEmail(inquiry));
    } catch (emailError) {
      console.warn("⚠️  Email sending failed:", emailError.message);
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
    return res.status(500).json({ success: false, message: "Failed to submit inquiry. Please try again." });
  }
};

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
      .select("-ipAddress");
    return res.status(200).json({ success: true, count: inquiries.length, total, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch inquiries." });
  }
};

const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found." });
    return res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch inquiry." });
  }
};

const exportToExcel = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    if (inquiries.length === 0) {
      return res.status(404).json({ success: false, message: "No inquiries found." });
    }
    const buffer = await exportAllToExcel(inquiries);
    const filename = `DSA_Inquiries_${new Date().toISOString().split("T")[0]}.xlsx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", buffer.length);
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to export Excel." });
  }
};

const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["new", "read", "replied", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(", ")}` });
    }
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found." });
    return res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update status." });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found." });
    return res.status(200).json({ success: true, message: "Inquiry deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete inquiry." });
  }
};

module.exports = { submitInquiry, getAllInquiries, getInquiryById, exportToExcel, updateInquiryStatus, deleteInquiry };