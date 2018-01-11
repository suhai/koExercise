/**
 * Set up a simple server to serve the pages. For this I used express.
 * Set up an easy database to store and retrieve data. For this I used mongoDB.
 * Set up a few basic routes. For this I started with the CRUD routes, and will update the routes as needed.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('koexercise',['tasks']);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

/** Root of app. */
app.get('/', function(req, res){
	res.send('Yay!!! It Works!');
});

/** See all Tasks. */
app.get('/tasks', function(req, res){
	db.tasks.find((err, docs) => {
		if(err){
			res.send(err);
		} else {
			console.log('Getting Tasks...');
			res.json(docs);
		}
	});
});

/** Add a task */
app.post('/tasks', function(req, res){
	db.tasks.insert(req.body, (err, doc) => {
		if(err){
			res.send(err);
		} else {
			console.log('Adding Task...');
			res.json(doc);
		}
	});
});

/** Update a task.. */
app.put('/tasks/:id', function(req, res){
	db.tasks.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
	update:{ $set:{
		name: req.body.name,
		type: req.body.type,
		deadline: req.body.deadline
	}},
	new: true
	 }, (err, doc) => {
		if(err){
			res.send(err);
		} else {
			console.log('Updating Task...');
			res.json(doc);
		}
	});
});

/** Delete a task. */
app.delete('/tasks/:id', function(req, res){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
		if(err){
			res.send(err);
		} else {
			console.log('Removing Task...');
			res.json(doc);
		}
	});
});

/** Fire up the app to listen on port 8080. */
app.listen(8080);
console.log('Running on port 8080...');