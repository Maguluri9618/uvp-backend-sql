const express = require('express');
const router = express.Router();
const sql = require('mssql');

/**
 * @swagger
 * /api/reschedule-cancel:
 *   get:
 *     summary: Get all Reschedule/Cancel requests
 */
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM RescheduleCancel`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/reschedule-cancel:
 *   post:
 *     summary: Submit a new Reschedule/Cancel request
 */
router.post('/', async (req, res) => {
  const { Name, WhatsAppNumber, IssueDescription } = req.body;
  try {
    // Auto-create table if not exists
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RescheduleCancel' AND xtype='U')
      CREATE TABLE RescheduleCancel (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100),
        WhatsAppNumber NVARCHAR(20),
        IssueDescription NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `;

    await sql.query`
      INSERT INTO RescheduleCancel (Name, WhatsAppNumber, IssueDescription)
      VALUES (${Name}, ${WhatsAppNumber}, ${IssueDescription})
    `;
    res.send('✅ Reschedule/Cancel request added');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/reschedule-cancel/{id}:
 *   delete:
 *     summary: Delete request by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM RescheduleCancel WHERE Id=${req.params.id}`;
    res.send('✅ Reschedule/Cancel request deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
