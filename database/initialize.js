const { TABLE_NAME } = require("./config");
const pool = require("./pool")

const initializeDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
        (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        code_snippet TEXT,
        language VARCHAR(20),
        url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        expiration_time TIMESTAMP)`);
};

module.exports = initializeDB;