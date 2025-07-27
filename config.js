const sql = require('mssql');

const config = {
  user: 'adminuvp', // User ID from the connection string
  password: 'Pavan@007', // Replace with your actual password
  server: 'uvp-server.database.windows.net', 
  database: 'UVP_Data',
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false,
  },
};

sql.connect(config)
  .then(() => console.log('✅ Connected to Azure SQL Database'))
  .catch((err) => console.error('❌ Database connection failed:', err));

module.exports = sql;
