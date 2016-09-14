var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

// You're not creating another instance of mssql but using the same one
// created in app.js
//var sql = require('mssql');

var router = function(nav) {
    var bookService = require('../services/goodreadsService')();

    var bookController =
        require('../controllers/bookController')(bookService, nav);
    // bookController requires 2 parameters: bookService and nav, we pass
    // null for the book service

    //bookRouter.use(bookController.middleware);

    // Returns when '/books' is requested
    bookRouter.route('/')
        .get(bookController.getIndex);

    //'/books/id'
    bookRouter.route('/:id')
    // Apply what follows to all types of request
        .get(bookController.getById);


    /*//Using mssql
    var router = function(nav) {

    // Returns when '/books' is requested
    bookRouter.route('/')
        .get(function (req, res) {

            var request = new sql.Request();
            // SQL query
            request.query('select * from books',
                function (err, recordSet) {
                    res.render('bookList', { // Render bookList.ejs
                        title: 'Books',
                        nav: nav,
                        books: recordSet
                    });
            });
        });

    '/books/id'
    bookRouter.route('/:id')
        // Apply what follow to all types of request
        .all(function (req, res, next) {
            var id = req.params.id; // Get the value of /:id

            // SQL prepared statement
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id = @id',
                function (err) {
                    ps.execute({ id: req.params.id },
                        function (err, recordSet) {
                            if(recordSet.length === 0) {
                                res.status(404).send('Not Found');
                            } else {
                                req.book = recordSet[0];
                                // SQL doesn't know we're only returning 1 book, so
                                // it's still going to return an array, so we select
                                // the first item
                            }
                        next();
                    });
            });
        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });*/

    return bookRouter;
}

module.exports = router;