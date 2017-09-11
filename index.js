var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var port = process.env.PORT || 8081;
var routes = require('./routes/routes.js')
var cors = require('cors');
var mongoUrl = config.mongo.url + config.mongo.dbName;
var multer  = require('multer')

console.log("mongoUrl", mongoUrl);
mongoose.connect(mongoUrl);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser())

app.get('/', function(req, res) {
  console.log("Hey, I am here", req.cookies);
});
app.use('/api', routes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
