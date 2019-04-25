/** Root route and API routes go here */


module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        const currentUser = req.user;
        res.render('index', { currentUser });
    });
}