// routes/analyze.js
const express = require("express");
const router = express.Router();

router.post("/analyze", (req, res) => {
  res.json({ message: "Analyze route working!" });
});

module.exports = router;