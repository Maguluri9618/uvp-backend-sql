const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Articles ORDER BY CreatedAt DESC`;
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).send('Server error');
  }
});

// POST add a new article
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content are required');

  try {
    await sql.query`
      INSERT INTO Articles (Title, Content) VALUES (${title}, ${content})
    `;
    res.send('✅ Article added successfully!');
  } catch (err) {
    console.error('Error inserting article:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
