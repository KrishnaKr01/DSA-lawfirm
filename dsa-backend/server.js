require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const { verifyEmailConnection } = require("./src/config/email");
const inquiryRoutes = require("./src/routes/inquiryRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorHandler");
const { apiLimiter } = require("./src/middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();
verifyEmailConnection();

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── Body Parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logger ────────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ── Rate Limiter ──────────────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DSA Corporate Solutions API is running 🚀",
    version: "1.0.0",
    endpoints: {
      inquiries: "/api/inquiries",
    },
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/inquiries", inquiryRoutes);

// ── 404 & Error Handlers ──────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 DSA Backend running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API: http://localhost:${PORT}/api/inquiries\n`);
});
