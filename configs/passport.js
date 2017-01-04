module.exports = function(){
    var model = require('../models');
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    // console.log(model);
    passport.use(new LocalStrategy(
        function(username, password, done) {
            var User = model.users.build();
            User.getByUsername( username, function(user){

                // Case when no user for provided user
                if ( ! user ) {
                    console.error(
                        'At login: failed to find user with provided user '+username
                    );

                    return done(null, false);
                }

                // Provided password is correct
                if (User.validPassword(password, user)) {

                    // In case if user is successfully logged in, make sure it is
                    // activated
                    // user.maybe_activate()
                    //   .then(function(){
                    //     return done(null, user);
                    //   });
                    return done(null, user);
                // User exists but provided password does not match
                } else {
                    console.error(
                        'When login user entered existsing email ' +username+
                        ' but incorrect password'
                    );
                    return done(null, false);
                }
            }, function(error){
                console.error(
                    'At login: unknown error when trying to login in as '+username+
                    '. Error: ' + error
                );

                return done(null, false);
            });
        }
    ));

    // Define how user object is going to be flattered into session
    // after request is processed.
    // In session store we save only user ID
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Defines how the user object is restored based on data saved
    // in session storage.
    // Fetch user data from DB based on ID.
    passport.deserializeUser(function(id, done) {

        model.users.find({where : {id : id}}).then(function(user){
            done(null, user);
        })
        .catch(function(error){
            console.error('Failed to fetch session user '+id+' with error: '+error);

            done(null, false, { message : 'Failed to fetch session user' });
        });
    });

    return passport;
};
