const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('koexercise',['tasks']);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res){
	res.send('Yay!!! It Works!');
});

app.get('/tasks', function(req, res){
	db.tasks.find(function(err, docs){
		if(err){
			res.send(err);
		} else {
			console.log('Getting Tasks...');
			res.json(docs);
		}
	});
});


app.post('/tasks', function(req, res){
	db.tasks.insert(req.body, function(err, doc){
		if(err){
			res.send(err);
		} else {
			console.log('Adding Task...');
			res.json(doc);
		}
	});
});


app.put('/tasks/:id', function(req, res){
	db.tasks.findAndModify({query:{_id: mongojs.ObjectId(req.params.id)},
	update:{ $set:{
		name: req.body.name,
		type: req.body.type,
		deadline: req.body.deadline
	}},
	new: true
	 }, function(err, doc){
		if(err){
			res.send(err);
		} else {
			console.log('Updating Task...');
			res.json(doc);
		}
	});
});

app.delete('/tasks/:id', function(req, res){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, doc){
		if(err){
			res.send(err);
		} else {
			console.log('Removing Task...');
			res.json(doc);
		}
	});
});

app.listen(8080);
console.log('Running on port 8080...');