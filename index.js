var express = require("express");

var app = express();

var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://ola_auto:testing@ds153659.mlab.com:53659/ola_auto");

/*
app.listen(5000,function(err){
	
	console.log("running at port");
	
});
*/

//var io = require('socket.io')(http);


var io = require('socket.io').listen(app.listen(5000));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('request_ride', function(ride_id){
    io.emit('ride_waiting', ride_id);
    console.log('irde waiting '+ride_id);
  });
   socket.on('ride_accept', function(ride_id){
    io.emit('ride_taken', ride_id);
    console.log("ride taken"+ride_id);
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