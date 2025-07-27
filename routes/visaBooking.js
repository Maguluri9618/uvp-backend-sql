const express = require('express');
const router = express.Router();
const sql = require('mssql');

/**
 * @swagger
 * /api/visa-booking:
 *   get:
 *     summary: Get all Visa Bookings
 */
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM VisaBooking`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-booking:
 *   post:
 *     summary: Create a new Visa Booking
 */
router.post('/', async (req, res) => {
  const { FullName, Email, WhatsAppNumber, VisaType } = req.body;
  try {
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='VisaBooking' AND xtype='U')
      CREATE TABLE VisaBooking (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(100),
        Email NVARCHAR(150),
        WhatsAppNumber NVARCHAR(20),
        VisaType NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `;

    await sql.query`
      INSERT INTO VisaBooking (FullName, Email, WhatsAppNumber, VisaType)
      VALUES (${FullName}, ${Email}, ${WhatsAppNumber}, ${VisaType})
    `;
    res.send('✅ Visa Booking added');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-booking/{id}:
 *   put:
 *     summary: Update Visa Booking by ID
 */
router.put('/:id', async (req, res) => {
  const { FullName, Email, WhatsAppNumber, VisaType } = req.body;
  try {
    await sql.query`
      UPDATE VisaBooking 
      SET FullName=${FullName}, Email=${Email}, WhatsAppNumber=${WhatsAppNumber}, VisaType=${VisaType}
      WHERE Id=${req.params.id}
    `;
    res.send('✅ Visa Booking updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-booking/{id}:
 *   delete:
 *     summary: Delete Visa Booking by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM VisaBooking WHERE Id=${req.params.id}`;
    res.send('✅ Visa Booking deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
