const pool = require('./pool');
const { TABLE_NAME } = require('./config');

const savePaste = async (codeSnippet, language, url, createdAt, expirationTime) => {
    await pool.query(`
        INSERT INTO ${TABLE_NAME} (code_snippet, language, url, created_at, expiration_time) VALUES($1, $2, $3, $4, $5)
        `, [codeSnippet, language, url, createdAt, expirationTime]);
}

const getPaste = async (pasteID) => {
    const { rows } = await pool.query(`
        SELECT * FROM ${TABLE_NAME}
        WHERE url = '${pasteID}'
        `);

    return rows;
}

module.exports = { savePaste, getPaste };