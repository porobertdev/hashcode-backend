const { format, isAfter } = require('date-fns');
const { encrypt, decrypt } = require("../authentication/encrypt");
const hash = require("../authentication/hash");
const { savePaste, getPaste } = require("../database/queries");

module.exports = {
    get: async (req, res) => {
        const { pasteID } = req.params;

        const dbResults = await getPaste(pasteID);

        try {
            expiration_time = dbResults[0].expiration_time;
            const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');

            if (dbResults.length !== 0) {
                if (isAfter(new Date(currentDate), expiration_time)) {
                    throw new Error();
                } else {      
                    // decrypt
                    dbResults.code_snippet = decrypt(dbResults.code_snippet);
                    res.json(dbResults[0]);
                }
            }
        } catch(err) {
            res.json({code_snippet: 'Not found: either expired or never existed 😢'})
        }
    },
    post: async (req, res) => {
        console.log("🚀 ~ post: ~ req.body:", req.body);
        // extract payload
        const {code_snippet, language, expiration_time} = req.body;

        // replace '/' because they mess up with the endpoint
        const hashedUrl = hash(code_snippet).replaceAll('/', '');

        // encrypt the code snippet
        const encryptedText = encrypt(code_snippet);

        // save it into database
        await savePaste(code_snippet, language, hashedUrl, expiration_time);

        // send JSON to client
        res.json({
            message: 'The code snippet was saved successfully!',
            url: hashedUrl,
        });
    },
};
