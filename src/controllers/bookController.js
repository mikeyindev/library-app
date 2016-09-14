// Using the Revealing Module Pattern

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var getIndex = function (req, res) {

        var url = 'mongodb://localhost:27017/libraryApp';
        // 27017 is the default port for MongoDB

        mongodb.connect(url, function (err, db) {

            var collection = db.collection('books');

            collection.find({}).toArray(function (err, results) {
                res.render('bookList', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    };


    var getById = function (req, res) {

        var id = new objectId(req.params.id); // Get the value of /:id

        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {

            var collection = db.collection('books');

            // find() returns the first one that matches the request id
            collection.findOne({ _id: id },
                function (err, results) {
                    if(results.bookId) {
                        bookService.getBookById(results.bookId,
                            function (err, book) {
                                results.book = book;
                            });
                    } else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    }
                });
        });
    };

    // Check if user is valid
    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    // You can see at a glance which functions are being returned
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }

}

module.exports = bookController;