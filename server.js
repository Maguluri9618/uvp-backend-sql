const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('./config'); // Load SQL Server connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger setup for API docs
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'UVP Backend APIs', version: '1.0.0' }
  },
  apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/visa-booking', require('./routes/visaBooking'));
app.use('/api/visa-slot-alerts', require('./routes/visaSlotAlerts'));
app.use('/api/document-uploads', require('./routes/documentUploads'));
app.use('/api/cgi-creation', require('./routes/cgicreation'));
app.use('/api/reschedule-cancel', require('./routes/rescheduleCancel'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/articles', require('./routes/articles'));

// ✅ Admin Auth Route (for login)
app.use('/api/admin', require('./routes/adminAuth'));

// -------------------------
// ✅ Serve React Frontend (Fix for Express v5)
// -------------------------
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Use regex instead of wildcard string (works with Express v5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000; // Azure will use process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
