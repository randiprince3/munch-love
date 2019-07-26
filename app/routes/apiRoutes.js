var db = require("../models");


module.exports = function(app, userfavorite) {

    // this is a post route that uses Sequelize to add favorites to the UserFavorites table
    // this route is used in the jQuery clickhandler in main.handlebars
    // might be cleaner if we moved this it apiRoutes
    app.post("/api/favorites", function(req, res) {
        userfavorite.create(req.body).then(function(favorite) {
            res.json(favorite);
        });
    });


};