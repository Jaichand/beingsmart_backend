var express = require('express');
var User = require('../models/user.js');
var Todos = require('../models/todo.js');
var config = require('../config');
var Router = express.Router();
var uuid = require('uuid/v1');
app = express()

Router.get('/', function(req, res) {
 console.log("cookies", req.cookies)
 if (req.cookies.user) { // user already present, find the id and create new todo
 	var id = req.cookies.user;

 	User.find({user: id}, function(err, user) {
       if (err) {
          console.log("Ye to error he", err);
       }
       if (user) {
       	  Todos.find({userId: id}, function (err, todos) {
       	  	if (err) {
       	  		// handle err
       	  		return res.status(500).send({success: false, error: err.message});
       	  	}
       	  	console.log('todos found for id', id, todos);
       	  	res.status(200).send({success: true, todos: todos});
       	  })
       }
       else {
       	 res.status(400).send({success:false, error: 'user not found. please clear the cookies'});
       }
 	})
 }
 else { // first time, create the user with uuid and set it as user cookie
 	var randomId = uuid();
 	console.log('new user creating...', randomId);
 	User.create({
 		id: randomId
 	}, function (err, user) {
 		// user is the created new user
 		res.cookie('user', randomId);
 		return res.status(200).send([]);
 	})

 }
 
});
module.exports = Router;