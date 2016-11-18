"use strict"

var logger = require("lodc-logger");
var shortid = require('shortid32');

module.exports = function(Special) {
	Special.createSpecial = function(title, description, event_date, link, category, cb) {
		logger.info("Creating a new special event for '%s'", title);
		logger.info("Title: " + title);
		logger.info("Description: "  + description);
		logger.info("Event_date: " + event_date);
		logger.info("Link: " + link);
		logger.info("Category: " + category);
		Special.create({
			"id": shortid.generate(),
			"title": title,
			"description": description,
			"event_date": new Date(event_date),
			"created": new Date(),
			"updated": new Date(),
			"link": link,
			"category": category
		}, function(err, special){
			if(err) {
				console.log("Special.creatSpecial failed: ", err);
			} else {
				cb(null, special);
			}
		})
	}

	Special.getSpecials = function(cb) {
		logger.info("Getting all special events")
		var query = {
			order: "event_date DESC"
		}
		Special.find(query, function(err, specials) {
			if(err) {
				cb(err);
			} else {
				cb(null, specials);
			}
		});
	}
};
