var https = require('https');
var xml2js = require('xml2js'); // Converts XML to JSON
var parser = xml2js.Parser({ explicitArray: false });

var goodreadsService = function () {

    var getBookById = function (id, callback) {

        //callback(null, { description: "Our Description"} );

        var options = {
            hostname: 'www.goodreads.com',
            path: '/book/show/' + id + '.xml?key=EH9y6OSkvOj9ZvEo65xrhWv2vS82RWoj90d35N5Cq8'
        };

        var cb = function (response) {
            var str = '';

            // When data comes back, add the chunk of data to the string,
            // turning XML into a string
            response.on('data', function (chunk) {
                str += chunk;
            });

            // When data ends
            response.on('end', function () {
                console.log(str);

                // Parse the string into JSON
                parser.parseString(str, function (err, result) {
                    // Pass the resulting JSON to callback()
                    callback(null, result.GoodreadsResponse.book);
                });
            });
        };

        https.request(options, cb).end();
    };


    return {
        getBookById: getBookById
    };
};


module.exports = goodreadsService;