var express = require('express');

// Middleware that parses the response body
var bodyParser = require('body-parser');

// Middlewares for required by Passport
var session = require('express-session');


var app = express();
//var sql = require('mssql');

/*// A MS SQL database created on Azure
var config = {
    user: 'myin',
    password: 'TytXnSC2#NQvNQ&*CI8n',
    server: 'nodeazuredemo.database.windows.net',
    database: 'Books',

    options: {
        encrypt: true
    }
};

// Connect to database on Azure
sql.connect(config, function (err) {
   console.log(err);
});*/

// Pull the PORT object in the environment, defined in gulpfile.js serve task
var port = process.env.PORT || 5000;

// Navigation bar
var nav = [{
    Link:'/Books',
    Text: 'Book'
}, {
    Link:'/Authors',
    Text: 'Author'
}];

// Pass navigation to bookRoutes
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


app.set('views', './src/views'); // Set 'views" to that path
//app.set('view engine', 'jade'); // Jade is a Node template engine
app.set('view engine', 'ejs');

// Whatever's in app.use() is going to be used by Express first before anything else
// express.static() sets the directory for serving static files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
require('./src/config/passport')(app);

/*var handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({ extname: '.hbs' }));
.hbs files will be handled by handlebars
app.set('view engine', '.hbs'); // Use handlebars as the view engine*/
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render("index", // Render index
        {
            title: 'Hello from render',
            nav: [{
                Link:'/Books',
                Text: 'Books'
            }, {
                Link:'/Authors',
                Text: 'Authors'
            }]
        });
});

app.listen(port, function(err) {
    console.log("Server running on port: " + port);
});