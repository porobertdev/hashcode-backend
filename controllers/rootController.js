const title = 'Homepage';

module.exports = {
    get(req, res) {
        res.render('index', { title });
    },
    post(req, res) {},
};
