const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name too long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    practiceArea: {
      type: String,
      enum: [
        "Corporate Law",
        "Mergers & Acquisitions",
        "Intellectual Property",
        "Compliance & Regulatory",
        "Corporate Litigation",
        "Employment Law",
        "Other",
        "",
      ],
      default: "",
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message too long"],
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Virtual for full name
inquirySchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("Inquiry", inquirySchema);
