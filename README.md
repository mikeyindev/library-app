# Library

This project uses Node.js, Express, EJS, MongoDB, and the Goodreads API to create a web application for displaying books the user has read or is planning to read.

The application does not currently work as intended however due to issues with Goodreads' API.
  
# Dependencies
## Bower (`bower.json`)

Installed in `public/lib`
* Bootstrap
* Font Awesome
* jQuery

## NPM (`package.json`)

* `body-parser` [link](https://github.com/expressjs/body-parser) - Node.js body parsing middleware. It parses incoming request bodies
* `cookie-parser` [link](https://www.npmjs.com/package/cookie-parser) - Node.js middleware for parsing `Cookie` header.
* `express` - Node.js server framework
* `express-handlebars` [link](https://www.npmjs.com/package/express-handlebars) - Handlebars view engine for Express so layouts can be injected using Handlebars, i.e. {{{body}}}
* `express-session` [link](https://www.npmjs.com/package/express-session) - Session middleware for Express
* `ejs` [link](https://www.npmjs.com/package/ejs) - Embedded JavaScript template used as the view engine for our Express app
* `https`
* `mongodb`
* `passport` [link](https://www.npmjs.com/package/passport) - Express-compatible authentication middleware for Node.js that uses plugins called _strategies_. Check out all the strategies at http://passportjs.org
* `passport-local` [link](https://www.npmjs.com/package/passport-local) - Passport strategy for authenticating with a username and password
* `xml2js` [link](https://www.npmjs.com/package/xml2js) - XML to JSON converter

### Dev Dependencies

* `gulp`
* `gulp-inject` [link](https://www.npmjs.com/package/gulp-inject) - Gulp plugin that injects file references into index.html
* `gulp-jshint`
* `gulp-nodemon` [link](https://www.npmjs.com/package/gulp-nodemon) - Gulp plugin that watches for file changes and automatically restart node.js application 
* `wiredep` [link](https://www.npmjs.com/package/wiredep) - Wires Bower dependencies to source code

# Gulp

It uses `gulp-inject` and `wiredep` to automatically add stylesheets from `bower.json` and script files in `public/js` directory to HTML during the build process. 

`gulp-nodemon` is used to automatically restart the app after changes.

See `gulpfile.js`.

# Goodreads API

The Goodreads `book.show` API ([see documentation](https://www.goodreads.com/api/index#book.show)) returns in XML format. NPM module `xml2js` is used to convert it to JSON to store in MongoDB. See `goodreadsService.js`.


# Passport (`src/config/`)