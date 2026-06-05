// ============================================================
// server.js — Entry point for the AI Resume Analyzer backend
// ============================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────
// Read allowed origins from .env (comma-separated) or fallback to localhost
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: [
      "https://ai-resume-analyzer-khaki-tau.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Resume Analyzer API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", analyzeRoute);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});
