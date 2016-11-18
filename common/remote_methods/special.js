"user strict"

var logger = require('lodc-logger');

module.exports = function(Lodc) {
	Lodc.getSpecials = function(cb) {
		Lodc.app.models.special.getSpecials(function(err, specials){
			cb(null, {data: specials});
		});
	};

	Lodc.remoteMethod("getSpecials", {
		description: "Retrieve a list of video of special events",
		isStatic: true,
		returns: [{
			description: "A list of all video in special events",
			type: "array",
			arg: "data",
			root: true
		}],
		http: {verb: "get", path: "/special/get"}
	})

	Lodc.addSpecial = function(title, description, event_date, link, category, cb) {
		logger.info("Lodc.addSpecial started...");
		Lodc.app.models.special.createSpecial(title, description, event_date, link, category, function(err, special){
			if(err) {
				cb(err);
			} else {
				logger.info("Successfully added new special '%s'", title);
				cb(null, {data: "Successfully added new special", special:special});
			}
			logger.info("Finished creating new special");
		});
	}

	Lodc.remoteMethod("addSpecial", {
		description: "Add a video to the special events collection",
		isStatic: true,
		accepts: [{
			arg: "title",
			type: "object"
		}, {
			arg: "description",
			type: "object"
		}, {
			arg: "event_date",
			type: "string"
		}, {
			arg: "link",
			type: "string"
		}, {
			arg: "category",
			type: "number",
			description: "1: testamony, 2: baptism"
		}],
		returns : [{
			arg: "data",
			type: "string"
		}],
		http: {verb: "post", path: "/special/add"}
	});
}