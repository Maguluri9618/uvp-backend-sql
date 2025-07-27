const express = require('express');
const router = express.Router();
const sql = require('mssql');

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedback submissions
 */
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Feedback`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit new feedback
 */
router.post('/', async (req, res) => {
  const { Name, FeedbackText } = req.body;
  try {
    // Auto-create table if not exists
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Feedback' AND xtype='U')
      CREATE TABLE Feedback (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100),
        FeedbackText NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `;

    await sql.query`
      INSERT INTO Feedback (Name, FeedbackText)
      VALUES (${Name}, ${FeedbackText})
    `;
    res.send('✅ Feedback submitted');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/feedback/{id}:
 *   delete:
 *     summary: Delete feedback by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM Feedback WHERE Id=${req.params.id}`;
    res.send('✅ Feedback deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
