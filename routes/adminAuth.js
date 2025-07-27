const express = require('express');
const router = express.Router();

// Hardcoded admin credentials (you can change these later)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request:", username, password);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: "admin-token-123" // You can replace with JWT later
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }
});

module.exports = router;
