var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/user.js');
var port = process.env.PORT || 8080;
var routes = require('./routes/routes.js')
var cors = require('cors');
var mongoUrl = config.mongo.url + config.mongo.dbName;
console.log("mongoUrl", mongoUrl);
mongoose.connect(mongoUrl);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser())

app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api', req.cookies);
});
app.use('/api', routes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
