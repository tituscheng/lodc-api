"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {

	Lodc.addPrayerRequest = function(title, content, cb) {
		 Lodc.app.models.prayer.createPrayer(title, content, function(err, result){
		 		cb({prayer:result});
		 })
	}

	Lodc.getPrayerByID = function(id, cb) {
		Lodc.app.models.prayer.getPrayerByID(id, function(err, result){
			cb(null, {prayer:result});
		});
	}

	Lodc.getAllPrayers = function(cb) {
		Lodc.app.models.prayer.getAllPrayers(function(err, result){
			cb(null, result);
		})
	}

	Lodc.updatePrayerByID = function(id, title, content, cb) {
		Lodc.app.models.prayer.updatePrayer(id, title, content, function(err, result){
			if(err) {
				logger.error("Lodc.updatePrayerById failed:", err);
			} else {
				cb(null, result);
			}
		});	
	}

	Lodc.remoteMethod('updatePrayerByID', {
		description: "Update a prayer request by id",
		isStatic: true,
		accepts:[{
			description:"id of the prayer request",
			type:"string",
			arg:"id"
		}, {
			description:"title of the prayer request",
			type:"string",
			arg:"title"
		}, {
			description:"content of the prayer request", 
			type:"string",
			arg:'content'
		}],
		returns:[{
			description:"updated version of the prayer request",
			type:"object",
			arg:"updated"
		}],
		http: {verb: 'put', path: "/prayer/update"}
	});

	Lodc.remoteMethod('getPrayerByID', {
		description: "Retrieve a prayer request provided the id of the prayer",
		isStatic: true,
		accepts: [{
			description:'The id of the prayer request',
			type:"string",
			arg:"id"
		}],
		returns:[{
			description: "The prayer request instance",
			type:"object",
			arg:"prayer"
		}],
		http: { verb: "get", path: "/prayer/get"}
	});

	Lodc.remoteMethod("getAllPrayers", {
		description: "Retreive all records of prayer requests",
		isStatic: true,
		returns:[{
			description: "All prayer requests",
			type:"array",
			args:"prayers"
		}],
		http: {verb: 'get', path: "/prayer/getall"}
	});


  Lodc.remoteMethod('addPrayerRequest', {
    description: "Create a new prayer request",
    isStatic: true,
    accepts: [{
    	description: "",
    	type:"string",
    	arg:"title"
    }, {
    	description: "",
    	type:"string",
    	arg: "content",
    }],
    returns: [{
      description: "A list of all sermons",
      type: "object",
      arg: "prayer",
      root: true
    }],
    http: { verb: "post", path: "/prayer/add" }
  });
}
