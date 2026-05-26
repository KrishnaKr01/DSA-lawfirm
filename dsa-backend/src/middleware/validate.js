const { body, validationResult } = require("express-validator");

// ── Validation rules for inquiry form ─────────────────────────────────────────
const validateInquiry = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ max: 50 }).withMessage("First name too long"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ max: 50 }).withMessage("Last name too long"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage("Phone number too long"),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage("Company name too long"),

  body("practiceArea")
    .optional({ checkFalsy: true })
    .isIn([
      "Corporate Law",
      "Mergers & Acquisitions",
      "Intellectual Property",
      "Compliance & Regulatory",
      "Corporate Litigation",
      "Employment Law",
      "Other",
      "",
    ])
    .withMessage("Invalid practice area"),

  body("message")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 }).withMessage("Message too long (max 2000 characters)"),

  // ── Check result and return errors ──────────────────────────────────────────
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({
          field: e.path,
          message: e.msg,
        })),
      });
    }
    next();
  },
];

module.exports = { validateInquiry };
