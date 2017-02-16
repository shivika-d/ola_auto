var express = require("express");

var app = express();


app.listen(5000,function(err){
	
	console.log("running at port");
	
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