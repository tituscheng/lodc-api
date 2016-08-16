var logger = require("lodc-logger");

var shortid = require('shortid32');

module.exports = function(Prayer) {

	Prayer.beforeCreate = function(next, prayer) {
		if(!prayer.date) {
			prayer.date = new Date();
		}
		if(!prayer.id) {
			prayer.id = shortid.generate();
		}
		next();
	}

	Prayer.getPrayerByID = function(id, cb) {
		Prayer.findById(id, function(err, prayer){
			if(err) {
				logger.error("Prayer.getPrayerByID failed: ", err);
			}
			cb(null, prayer);
		});
	}

	Prayer.getAllPrayers = function(cb) {
		Prayer.find({}, function(err, prayers){
			if(err) throw err;
			cb(null, prayers);
		})
	}

	Prayer.updatePrayer = function(id, title, content, cb) {
		Prayer.findById(id, function(err, prayer){
			if(err) {
				logger.error("Error updating prayer: ", err);
			}
			if(prayer) {
				var updatedTitle = (title?title:"");
				var updatedContent = (content?content:"");
				prayer.updateAttributes({title:updatedTitle, content:updatedContent}, function(err, prayer){
					if(err) throw err;
					cb(null, prayer);
				})
			} else {
				cb(null, []);
			}
		})
	}

	Prayer.createPrayer = function(title, content, cb){
		Prayer.create({
			title: title,
			content: content
		}, function(err, prayer){
			if(err) {
				logger.error("Prayer.createPrayer failed: ", err);
				console.log(err);				
				cb(err);
			} else {
				cb(null, prayer);
			}
		});
	};

};
