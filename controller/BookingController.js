 BookingController = {};

var Rides = require("../models/rides.server.model.js");
var Config = require("./../config.js");


BookingController.driverlist = function(req,res){
	 
	 res.render("driverlist",{domain:Config.base_url});
 }
 
 BookingController.customer = function(req,res){
	 
	 res.render("customer",{domain:Config.base_url});
 }
 
 
BookingController.driver = function(req,res){
	 var r = Rides.find({driverId:req.params.id});
	 r.exec(function(err,results) {
		 
		  console.log(results);
	 
	 res.render("driver",{driver_id:req.params.id,domain:Config.base_url});
		 
	 });
	 
 }
 
 BookingController.completed = function(req,res){
	 var r = Rides.find({driverId:req.body.driver_id,status:2});
	 r.exec(function(err,results) {
		 
		  console.log(results);
	 
	 res.send({rides:results});
		 
	 });
	 
 }
 
 BookingController.waiting = function(req,res){
	 var r = Rides.find({status:0});
	 r.exec(function(err,results) {
		 
		  console.log(results);
	 
	 res.send({rides:results});
		 
	 });
	 
 }
 
 BookingController.going = function(req,res){
	 var r = Rides.find({driverId:req.body.driver_id,status:1});
	 r.exec(function(err,results) {
		 
		  console.log(results);
	 
	 res.send({rides:results});
		 
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