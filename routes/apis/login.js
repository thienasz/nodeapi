module.exports = function (passport) {
    var express = require('express');
    var router  = express.Router();
    router.post('/login',
        passport.authenticate('local'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            console.error(req.user);
            console.error(req.isAuthenticated());
            res.json(req.user.username);
        });

    router.post('/logout', function(req, res){

        // Maybe this check is redundant but to be on safe side lets do it
        if ( !req.user ) {
            res.json(false);
        }

        req.logout();
        res.json(true);
    });

    return router;
};

