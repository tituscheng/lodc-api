"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.getEvents = function(cb) {
    Lodc.app.models.event.getEvents(function(err, events){
      cb(null, {data: events});
    });
  };

  Lodc.addEvent = function(title, content, startdate, enddate, cb) {
    logger.info("Lodc.addEvent started...");
    Lodc.app.models.event.createNewEvent(title, content, startdate, enddate, function(err, event){
      if(err) {
        cb(err);
      } else {
        
        logger.info("Successfully added new event '%s'", title);
        cb(null, {message: "Successfully add event", event:event});
      }
      logger.info("Finished creating new event");
    });
  };

  Lodc.updateEvent = function(id, title, content, startdate, enddate, cb) {
    logger.info("Lodc.updateEvent started...");
    Lodc.app.models.event.updateEvent(id, title, content, startdate, enddate, function(err, result) {
      if(err) {
        cb(err);
      } else {
        logger.info("Successfully updating event with id %s", id);
        cb(null, result);
      }
    });
  };


  Lodc.remoteMethod("updateEvent", {
    description: "Update an event instance provided an event id",
    isStatic: true,
    accepts:[{
      description:"id of the event",
      type:"string",
      arg:"id",
      root:true
    },{
      description:"title of the event",
      type:"object",
      arg:"title",
      root: true,
    }, {
      description: "content of the event",
      type:"object",
      arg:"content",
      root: true
    }, {
      description: "start date of the event",
      type:"date",
      arg:"startdate",
      root:true
    }, {
      description: "end date of the event",
      type:"date",
      arg:"enddate",
      root:true
    }],
    returns: [{
      type: "object",
      arg:"result"
    }],
    http: {verb: "put", path: "/event/update"}
  })

  Lodc.remoteMethod('getEvents', {
    description: "Retrieve a list of all the events available",
    isStatic: true,
    returns: [{
      description: "A list of all events",
      type: "array",
      arg: "data",
      root: true
    }],
    http: { verb: "get", path: "/event/get" }
  });

  Lodc.remoteMethod('addEvent', {
    description: "Add an event to the database",
    isStatic: true,
    accepts: [{
      arg: "title",
      type: "object",
      description: '{"eng":"string", "kor":"string"}'
    }, {
      arg: "content",
      type: "object"
    }, {
      arg: "startdate",
      type: "string",
    }, {
      arg: "enddate",
      type: "string"
    }],
    returns: {
      arg:"data",
      type:"string"
    },
    http: {verb: "post", path: "/event/add"}
  });
};
