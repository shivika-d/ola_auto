 BookingController = {};


 
 BookingController.customer = function(req,res){
	 
	 res.render("customer");
 }
 
 
BookingController.driver = function(req,res){
	 
	 res.render("driver");
 }
 
 BookingController.requestRide = function(req,res){
	 
	
	 
	res.send("requestRide");
 }
 
 
 
 
 module.exports = BookingController;