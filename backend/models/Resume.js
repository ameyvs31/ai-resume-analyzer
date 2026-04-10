const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    strengths: {
      type: [String],
      default: []
    },
    weaknesses: {
      type: [String],
      default: []
    },
    suggestions: {
      type: [String],
      default: []
    },
    missingKeywords: {
      type: [String],
      default: []
    },
    summary: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;