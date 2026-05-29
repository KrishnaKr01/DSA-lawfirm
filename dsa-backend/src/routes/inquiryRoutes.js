const express = require("express");
const router = express.Router();
const { submitInquiry, getAllInquiries, getInquiryById, exportToExcel, updateInquiryStatus, deleteInquiry } = require("../controllers/inquiryController");
const { validateInquiry } = require("../middleware/validate");
const { inquiryLimiter } = require("../middleware/rateLimiter");

router.post("/", inquiryLimiter, validateInquiry, submitInquiry);
router.get("/export/excel", exportToExcel);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.patch("/:id/status", updateInquiryStatus);
router.delete("/:id", deleteInquiry);

module.exports = router;