var express = require('express');
var User = require('../models/user.js');
var Todos = require('../models/todo.js');
var config = require('../config');
var Router = express.Router();
var uuid = require('uuid/v1');
app = express()

Router.get('/', function(req, res) {
 if (req.query.user) { // user already present, find the id and create new todo
 	var id = req.query.user;

 	User.find({user: id}, function(err, user) {
       if (err) {
       	return res.status(500).send({success: false, error: err.message});
       }
       if (user) {
       	  Todos.find({userId: id}, function (err, todos) {
       	  	if (err) {
       	  		// handle err
       	  		return res.status(500).send({success: false, error: err.message});
       	  	}
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
 	User.create({
 		id: randomId
 	}, function (err, user) {
 		// user is the created new user
 		return res.status(200).send({user: randomId});
 	})

  }
});

Router.post('/addTodo', function (req, res) {
	todo = new Todos({ 
		todo: req.body.todo,
		userId: req.body.user
	});
  todo.save(function(err, todo) {
  	if (err) {
  		return res.status(500).send({success :false, error: "Failed while saving"});
  	}
  	res.status(200).send({
  		success: true,
  		todo: todo
  	});
  });
});

Router.delete('/deleteTodo', function (req, res) {
 todo = JSON.parse(req.query.todo);
 Todos.findOne({_id: todo._id}, function (err, todo) {
 		if (err) 
 			return res.status(500).send({success: false, error: err.message});
 		todo.archive = true;
 		todo.save(function (err, updatedTodo) {
 			if (err)
 				return res.status(500).send({success: false, error: err.message});
 			res.status(200).send({success: true, todo: updatedTodo});
 		})
 });
});

Router.post('/editTodo', function (req, res) {
	Todos.findOne({_id: req.body.todo._id}, function (err, updateTodo) {
		if (err)
			return res.status(500).send({success: false, error: err.message});
		updateTodo.todo = req.body.todo.todo;
		updateTodo.save(function (err, updatedTodo) {
			if (err)
				return res.status(200).send({success: false, error: err.message});
			res.status(200).send({success: true, todo: updatedTodo});
		});
	})
});
module.exports = Router;