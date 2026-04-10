// backend/config/multer.js

const multer = require('multer');

// ── Use MEMORY storage instead of disk ──
// On cloud servers like Render, disk storage
// doesn't work reliably. Memory storage keeps
// the file in RAM temporarily — perfect for us
// since we delete it after analysis anyway!

const storage = multer.memoryStorage();
// File is stored in memory as buffer
// Available as req.file.buffer

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;