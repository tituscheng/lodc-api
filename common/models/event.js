"use strict"

var logger = require('lodc-logger');
var shortid = require('shortid32');

module.exports = function(Event) {


  Event.updateEvent = function(id, title, content, startdate, enddate, cb) {
    Event.findOne({id:id}, function(err, event){
      if(err) {
        logger.debug("Event.findOne failed in Event.updateEvent: ", err);
        cb(err);
      } else {
        if(event) {
          logger.info("Found event with id %s", id);
          var data = event;
          if(title) {
          	if(title.en){
          		data.title.en = title.en;
          	}
          	if(title.kr) {
          		data.title.kr = title.kr;
          	}
          }
          if(content) {
          	if(content.en) {
          		data.content.en = content.en;
          	}
          	if(content.kr) {
          		data.content.kr = content.kr;
          	}
          }
          if(startdate) {
          	data.startdate = new Date(startdate);
          }
          if(enddate) {
          	data.enddate = new Date(enddate);
          }
          data.updated = new Date();
          event.updateAttributes(data, function(err, myevent){
            if(err) {
              logger.error("event failed to update attributes: ", err);
              cb(err);
            } else {
              logger.info("Successfully updated attribute for event with id %s",  id);
              cb(null, event);
            }
          });
        }
      }
    });
  }


  Event.createNewEvent = function(title, content, startdate, enddate, cb) {
    logger.info("Creating a new event for '%s'", title);

    if(enddate == null || enddate.length == 0) {
    	enddate = startdate;
    }
    Event.create({
      "id": shortid.generate(),
      "title": title,
      "content": content,
      "startdate": new Date(startdate),
      "enddate": new Date(enddate),
      "created": new Date(),
      "updated": new Date()
    }, function(err, event) {
      if (err) {
        //logger.info("event.createNewevent failed in event.js located in /common/models: ", err);
        console.log("Event.createNewEvent failed: ", err);
      } else {
        cb(null, event);
      }
    });
  };



  Event.getEvents = function(cb) {
    logger.info("Getting events from database");
    Event.find({}, function(err, events){
      if(err) {
        logger.error("Event.find failed in event.getevents: ", err);
      } 
      cb(null, {events:events});
    });
  }

};
