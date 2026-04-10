// backend/routes/resume.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const analyzeResume = require('../services/resumeAnalyzer');
const fs = require('fs');

router.post('/upload', protect, (req, res) => {
  upload.single('resume')(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'Please upload a PDF file' });
    }

    try {
      console.log('📄 PDF received:', req.file.originalname);
      console.log('🤖 Analyzing with AI...');

      // Pass buffer directly — no file path needed!
      const result = await analyzeResume(req.file.buffer);

      // No need to delete file — memory storage auto-clears ✅

      const savedResume = await Resume.create({
        fileName:        req.file.originalname,
        score:           result.analysis.score,
        strengths:       result.analysis.strengths,
        weaknesses:      result.analysis.weaknesses,
        suggestions:     result.analysis.suggestions,
        missingKeywords: result.analysis.missingKeywords,
        summary:         result.analysis.summary
      });

      console.log('💾 Saved to MongoDB!');

      res.json({
        status:   'success',
        message:  'Resume analyzed and saved!',
        id:       savedResume._id,
        fileName: savedResume.fileName,
        analysis: result.analysis,
        savedAt:  savedResume.createdAt
      });

    } catch (error) {
      console.error('❌ Error:', error.message);
      res.status(500).json({
        status:  'error',
        message: 'Something went wrong.',
        detail:  error.message
      });
    }
  });
});