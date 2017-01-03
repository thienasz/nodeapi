var express = require('express');
var router = express.Router();
var model      = require('../../models');
var User = model.User;
/* GET users listing. */
// IMPORT ROUTES
// =============================================================================

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

// create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

      var username = req.body.username; //bodyParser does the magic
      var password = req.body.password;

      var user = User.build({ username: username, password: password });

      user.add(function(success){
            res.json({ message: 'User created!' });
          },
          function(err) {
            res.send(err);
          });
    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
      var user = User.build();

      user.retrieveAll(function(users) {
        if (users) {
          res.json(users);
        } else {
          res.send(401, "User not found");
        }
      }, function(error) {
        res.send("User not found");
      });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

// update a user (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
      var user = User.build();

      user.username = req.body.username;
      user.password = req.body.password;

      user.updateById(req.params.user_id, function(success) {
        console.log(success);
        if (success) {
          res.json({ message: 'User updated!' });
        } else {
          res.send(401, "User not found");
        }
      }, function(error) {
        res.send("User not found");
      });
    })

    // get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      var user = User.build();

      user.retrieveById(req.params.user_id, function(users) {
        if (users) {
          res.json(users);
        } else {
          res.send(401, "User not found");
        }
      }, function(error) {
        res.send("User not found");
      });
    })

    // delete a user by id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
      var user = User.build();

      user.removeById(req.params.user_id, function(users) {
        if (users) {
          res.json({ message: 'User removed!' });
        } else {
          res.send(401, "User not found");
        }
      }, function(error) {
        res.send("User not found");
      });
    });

module.exports = router;
