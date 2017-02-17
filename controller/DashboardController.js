 DashboardController = {};
 
 var Rides = require("../models/rides.server.model.js");
 
 DashboardController.index = function(req,res){
	 
	 var r = Rides.find(function(err,results) {
		 
		  console.log(results);
	 
	 res.render("dashboard",{rides:results});
		 
	 });
	
 }
 
 
 module.exports = DashboardController;