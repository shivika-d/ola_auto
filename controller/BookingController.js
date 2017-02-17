 BookingController = {};

var Rides = require("../models/rides.server.model.js");



 
 BookingController.customer = function(req,res){
	 
	 res.render("customer");
 }
 
 
BookingController.driver = function(req,res){
	 var r = Rides.find({driverId:req.params.id},function(err,results) {
		 
		  console.log(results);
	 
	 res.render("driver",{rides:results});
		 
	 });
	 
 }
 
 BookingController.requestRide = function(req,res){
	 
	console.log(req.body);
	
	var entry = new Rides({
		 
	 	customerId : req.body.customer_id,
		status : 0,
		location_x : 0,
		location_y : 0,
		driverId : 0
	});
	
	entry.save();

	 
	res.send("requestRide by customer : "+req.body.customer_id);
 }
 
 
 
 
 module.exports = BookingController;