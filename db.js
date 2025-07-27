const sql = require("mssql");

const config = {
    server: "localhost",   // SQL Server host
    database: "uvpDB",     // Your database name
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Windows Authentication (use domain\username)
config.authentication = {
    type: "ntlm",
    options: {
        domain: "pavanmaguluri",
        userName: "dell",
        password: "" // leave empty for Windows Auth
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("✅ DB Connected Successfully!");
    } catch (err) {
        console.error("❌ DB Connection Failed:", err);
    }
}

module.exports = { sql, connectDB };
