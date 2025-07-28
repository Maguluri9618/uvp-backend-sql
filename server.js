const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('./config'); // Load SQL Server connection

const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json());

// Debug: Log every incoming request
app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------------
// Swagger setup for API docs
// -------------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'UVP Backend APIs', version: '1.0.0' }
  },
  apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// -------------------------
// API Routes
// -------------------------
app.use('/api/visa-booking', require('./routes/visaBooking'));
app.use('/api/visa-slot-alerts', require('./routes/visaSlotAlerts'));
app.use('/api/document-uploads', require('./routes/documentUploads'));
app.use('/api/cgi-creation', require('./routes/cgiCreation'));
app.use('/api/reschedule-cancel', require('./routes/rescheduleCancel'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/admin', require('./routes/adminAuth')); // Admin Auth Route

// -------------------------
// Serve React Frontend
// -------------------------
const frontendPath = path.join(__dirname, 'client', 'dist');
console.log("📂 Serving static files from:", frontendPath);
app.use(express.static(frontendPath));

// Catch-all route: serve index.html for React Router
app.get('*', (req, res) => {
  console.log("⚡ Fallback route triggered. Serving index.html");
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// -------------------------
// Start the server
// -------------------------
const PORT = process.env.PORT || 5000; // Azure will assign the port
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
