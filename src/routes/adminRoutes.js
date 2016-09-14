var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var books = [
    {
        title: "Ender's Game",
        genre: 'Science Fiction',
        author: 'Orson Scott Card',
        bookId: 375802,
        read: true
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        bookId: 656,
        read: false
    }
];


var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            // 27017 is the default port for MongoDB. Set database name to
            // libraryApp

            mongodb.connect(url, function (err, db) {
                // Create a 'books' collection. A collection is like a table
                var collection = db.collection('books');

                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;