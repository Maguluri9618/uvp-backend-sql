const express = require('express');
const router = express.Router();
const sql = require('mssql');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Save in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM ProfileCreation`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create new profile
router.post('/', upload.single('passport'), async (req, res) => {
  const { Gmail, PhoneNumber } = req.body;
  if (!req.file) {
    return res.status(400).send("No passport uploaded");
  }

  try {
    // Auto-create table if not exists
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ProfileCreation' AND xtype='U')
      CREATE TABLE ProfileCreation (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Gmail NVARCHAR(150),
        PhoneNumber NVARCHAR(20),
        PassportFileName NVARCHAR(255),
        PassportFilePath NVARCHAR(500),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `);

    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;

    await sql.query`
      INSERT INTO ProfileCreation (Gmail, PhoneNumber, PassportFileName, PassportFilePath)
      VALUES (${Gmail}, ${PhoneNumber}, ${fileName}, ${filePath})
    `;
    res.send('✅ Profile created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Delete profile
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM ProfileCreation WHERE Id=${req.params.id}`;
    res.send('✅ Profile deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
