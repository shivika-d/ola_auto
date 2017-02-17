 DashboardController = {};
 
 var Rides = require("../models/rides.server.model.js");
 
 var Config = require("./../config.js");
 
 DashboardController.index = function(req,res){
	 
	 var r = Rides.find(function(err,results) {
		 
		  console.log(results);
	 
	 res.render("dashboard",{rides:results,domain:Config.base_url});
		 
	 });
	
 }
 
 
 module.exports = DashboardController;