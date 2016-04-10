var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname +"/public"));

app.use(bodyParser.json());

app.get('/contactlist',function(req,res)
{
	console.log("I received a get request");

	db.contactlist.find(function(err,docs)
	{
		console.log(docs);
		res.json(docs);
	});

});
app.post('/contactlist',function(req,res){
	console.log(req.body);
	//if(!db.contactlist.find({name:req.body.name})
    {
		db.contactlist.insert(req.body,function(err,doc){
	    res.json(doc);
	});
	}

  /*db.contactlist.find({name: req.body.name},function(err,doc){
		console.log(doc);
		var user ={};
		user.name=doc.name;
		user.email=doc.email;
		user.number1=doc.number;
		user.number2=req.body.number;
		db.contactlist.remove({id: mongojs.doc._id},function(err,doc){
			res.json(doc);
		});
	    });*/
 });

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},update: {$set: {name: req.body.name, email:req.body.email,number: req.body.number}},
    	   new: true},function(err,doc){
		res.json(doc);
	});
});

app.listen(8080);
console.log("server running on port 8080");
