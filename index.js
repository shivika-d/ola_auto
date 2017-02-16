var express = require("express");

var app = express();

app.listen(5000,function(err){
	
	console.log("running at port");
	
});

app.use(express.static('public'));