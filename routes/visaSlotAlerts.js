const express = require('express');
const router = express.Router();
const sql = require('mssql');

/**
 * @swagger
 * /api/visa-slot-alerts:
 *   get:
 *     summary: Get all Visa Slot Alerts
 */
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM VisaSlotAlerts`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-slot-alerts:
 *   post:
 *     summary: Create a new Visa Slot Alert
 */
router.post('/', async (req, res) => {
  const { Country, WhatsAppNumber, CGIMailID, FirstName, LastName, VisaCategory, VisaType, PreferredLocation } = req.body;
  try {
    // Auto-create table if it doesn't exist
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='VisaSlotAlerts' AND xtype='U')
      CREATE TABLE VisaSlotAlerts (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Country NVARCHAR(50),
        WhatsAppNumber NVARCHAR(20),
        CGIMailID NVARCHAR(150),
        FirstName NVARCHAR(100),
        LastName NVARCHAR(100),
        VisaCategory NVARCHAR(50),
        VisaType NVARCHAR(50),
        PreferredLocation NVARCHAR(100),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `;

    await sql.query`
      INSERT INTO VisaSlotAlerts (Country, WhatsAppNumber, CGIMailID, FirstName, LastName, VisaCategory, VisaType, PreferredLocation)
      VALUES (${Country}, ${WhatsAppNumber}, ${CGIMailID}, ${FirstName}, ${LastName}, ${VisaCategory}, ${VisaType}, ${PreferredLocation})
    `;
    res.send('✅ Visa Slot Alert added');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-slot-alerts/{id}:
 *   put:
 *     summary: Update Visa Slot Alert by ID
 */
router.put('/:id', async (req, res) => {
  const { Country, WhatsAppNumber, CGIMailID, FirstName, LastName, VisaCategory, VisaType, PreferredLocation } = req.body;
  try {
    await sql.query`
      UPDATE VisaSlotAlerts 
      SET Country=${Country}, WhatsAppNumber=${WhatsAppNumber}, CGIMailID=${CGIMailID}, FirstName=${FirstName}, LastName=${LastName},
          VisaCategory=${VisaCategory}, VisaType=${VisaType}, PreferredLocation=${PreferredLocation}
      WHERE Id=${req.params.id}
    `;
    res.send('✅ Visa Slot Alert updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/visa-slot-alerts/{id}:
 *   delete:
 *     summary: Delete Visa Slot Alert by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await sql.query`DELETE FROM VisaSlotAlerts WHERE Id=${req.params.id}`;
    res.send('✅ Visa Slot Alert deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
