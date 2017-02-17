var express = require("express");

var app = express();

var Config = require("./config.js");

var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://"+Config.db_username+":"+Config.db_password+"@"+Config.db_url);

/*
app.listen(5000,function(err){
	
	console.log("running at port");
	
});
*/

//var io = require('socket.io')(http);

var Rides = require("./models/rides.server.model.js");
var io = require('socket.io').listen(app.listen(Config.port));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('request_ride', function(ride_id){
    io.emit('ride_waiting', ride_id);
    console.log('irde waiting '+ride_id);
  });
   socket.on('ride_accept', function(data){
    
    
    Rides.update({_id:data.id},{driverId:data.driver_id,status:1,pickupTime:Date.now()},function(err,numberAffected,rawResponse){
	    if(numberAffected){
		    console.log(" db updated");
		    io.emit('ride_taken', {ride_id:data.id,driver_id:data.driver_id});
		    
		    setTimeout(function(){
			    console.log(" time up");
			    Rides.update({_id:data.id},{driverId:data.driver_id,status:2,completionTime:Date.now()},function(err,numberAffected,rawResponse){
				    if(numberAffected){
					    console.log(" ride up");
						io.emit('ride_over', {ride_id:data.id,driver_id:data.driver_id});
				    }})
		    }, 30000);
	    }
    })
    
    console.log("ride taken"+data.id);
  });
});

app.use(express.static('public'));

app.set("views","./views");

var handlebars = require("express-handlebars");
app.engine(".hbs",handlebars({extname:".hbs"}));
app.set("view engine",".hbs");

var DashboardController = require("./controller/DashboardController");
var BookingController = require("./controller/BookingController");


app.get("/dashboard",DashboardController.index);
app.get("/customer",BookingController.customer);
app.post("/request_ride",BookingController.requestRide);
app.get("/driver/:id",BookingController.driver);
app.post("/driver/completed",BookingController.completed);
app.post("/driver/waiting",BookingController.waiting);
app.post("/driver/going",BookingController.going);
app.get("/driver",BookingController.driverlist);