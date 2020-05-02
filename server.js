var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/eCommerce', {useMongoClient: true});
var db = mongoose.connection;
db.once('open', function () {
   console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

// API
app.use('/api/products', require('./api/products'));
app.use('/api/carts', require('./api/carts'));
app.use('/api/comments', require('./api/comments'));
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));


// Server
var port = 4000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
