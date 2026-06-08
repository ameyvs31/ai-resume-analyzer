require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");  // ← ADDED

// ─── Connect to MongoDB FIRST ─────────────────────────────────
connectDB();                                       // ← ADDED

// ─── Route Imports ────────────────────────────────────────────
const authRoute    = require("./routes/auth");
const analyzeRoute = require("./routes/analyze");
const resumeRoute  = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────
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

app.use("/api/auth",   authRoute);
app.use("/api/resume", resumeRoute);
app.use("/api",        analyzeRoute);

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