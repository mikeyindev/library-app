var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function (nav) {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);

            // 27017 is the default port for MongoDB
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                // MongoDB will automatically create a users collection
                // after the first insert
                var collection = db.collection('users');

                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local',
            { failureRedirect: '/' }),
            // If authentication failed, redirect to '/'
            function (req, res) {
                res.redirect('/auth/profile');
                // If authentication succeeded, redirect to '/profile'
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {

            if(!req.user) {
                res.redirect('/');
                // If user doesn't exist, redirect to '/'
            }
            next();
            // Otherwise proceed to .get()
        })
        .get(function (req, res) {
            // Passport appends a user object to the request
            res.json(req.user);
        });


    return authRouter;
};

module.exports = router;