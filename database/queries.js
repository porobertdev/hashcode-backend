const pool = require('./pool');
const { TABLE_NAME } = require('./config');

const savePaste = async (codeSnippet, language, url, expirationTime) => {
    // Timestamp - As seen here: https://stackoverflow.com/questions/26046816/is-there-a-way-to-set-an-expiry-time-after-which-a-data-entry-is-automaticall
    await pool.query(`
        INSERT INTO ${TABLE_NAME} (code_snippet, language, url, expiration_time) VALUES($1, $2, $3, NOW() + INTERVAL '${expirationTime} days')
        `, [codeSnippet, language, url]);
}

const getPaste = async (pasteID) => {
    const { rows } = await pool.query(`
        SELECT * FROM ${TABLE_NAME}
        WHERE url = '${pasteID}'
        `);

    return rows;
}

const deletePaste = async (pasteID) => {
    await pool.query(`DELETE FROM ${TABLE_NAME} WHERE url='${pasteID}'`);
};

module.exports = { savePaste, getPaste, deletePaste };