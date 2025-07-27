const express = require('express');
const router = express.Router();
const sql = require('mssql');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Save in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/document-uploads:
 *   get:
 *     summary: Get all uploaded documents
 */
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM DocumentUploads`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/document-uploads:
 *   post:
 *     summary: Upload a document
 */
router.post('/', upload.single('document'), async (req, res) => {
  try {
    // Auto-create table if not exists
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentUploads' AND xtype='U')
      CREATE TABLE DocumentUploads (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FileName NVARCHAR(255),
        FilePath NVARCHAR(500),
        UploadedAt DATETIME DEFAULT GETDATE()
      )
    `;

    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;

    await sql.query`
      INSERT INTO DocumentUploads (FileName, FilePath)
      VALUES (${fileName}, ${filePath})
    `;
    res.send('✅ Document uploaded');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/document-uploads/{id}:
 *   delete:
 *     summary: Delete uploaded document by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM DocumentUploads WHERE Id=${req.params.id}`;
    res.send('✅ Document deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
