const loadEnvConfig = () => {
    if (process.env.NODE_ENV === 'dev') {
        require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

        // test
        console.log('[ENV TEST]: ', process.env.DATABASE_NAME);
    }
};

module.exports = { loadEnvConfig };
