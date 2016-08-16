"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.getSermons = function(cb) {
    Lodc.app.models.sermon.getSermons(function(err, sermons){
      cb(null, {data: sermons});
    });
  };

  Lodc.addSermon = function(title, description, scripture, speaker, date, medias, cb) {
    logger.info("Lodc.addSermon started...");
    Lodc.app.models.sermon.createNewSermon(title, description, scripture, speaker, date, medias, function(err, sermon){
      if(err) {
        cb(err);
      } else {
        
        logger.info("Successfully added new sermon '%s'", title);
        cb(null, {data: "Successfully add sermon", sermon:sermon});
      }
      logger.info("Finished creating new sermon");
    });
  };

  Lodc.updateSermon = function(id, title, description, scripture, speaker, date, medias, cb) {
    logger.info("Lodc.updateSermon started...");
    Lodc.app.models.sermon.updateSermon(id, title, description, scripture, speaker, date, medias, function(err, result) {
      if(err) {
        cb(err);
      } else {
        logger.info("Successfully updating sermon with id %s", id);
        cb(null, result);
      }
    });
  };

  Lodc.mostRecent = function(cb) {
    logger.info("Lodc.mostRecent getting the most recent sermons (1 month)");
    Lodc.app.models.sermon.mostRecent(function(err, result){
      if(err) {
        logger.debug("Lodc.mostRecent failed: ", err);
        cb(err);
      } else {
        logger.info("Successfully retreive the most recent sermons");
        cb(null, result);
      }
    });
  }

  Lodc.remoteMethod("mostRecent", {
    description: "Getting the most recent sermon (last month)",
    isStatic: true,
    returns:{
      type:"array",
      arg:"result",
      root:true
    },
    http: {verb:"get", path:"/sermon/recent"}
  });

  Lodc.remoteMethod("updateSermon", {
    description: "Update a sermon instance provided a sermon id",
    isStatic: true,
    accepts:[{
      description:"id of the sermon",
      type:"string",
      arg:"id",
      root:true
    },{
      description:"title of the sermon",
      type:"object",
      arg:"title",
      root: true,
    }, {
      description: "description of the sermon",
      type:"object",
      arg:"description",
    }, {
      description: "scripture of the sermon",
      type:"object",
      arg:"scripture",
    }, {
      description: "speaker",
      type:"object",
      arg:"speaker"
    }, {
      description: "date of the sermon",
      type:"date",
      arg: "date"
    }, {
      description: "medias",
      type:"object",
      arg:"medias"
    }],
    returns: [{
      type: "object",
      arg:"result"
    }],
    http: {verb: "put", path: "/sermon/update"}
  })

  Lodc.remoteMethod('getSermons', {
    description: "Retrieve a list of all the sermons available",
    isStatic: true,
    returns: [{
      description: "A list of all sermons",
      type: "array",
      arg: "data",
      root: true
    }],
    http: { verb: "get", path: "/sermon/get" }
  });

  Lodc.remoteMethod('addSermon', {
    description: "Add a sermon to the database",
    isStatic: true,
    accepts: [{
      arg: "title",
      type: "object",
      description: '{"eng":"string", "kor":"string"}'
    }, {
      arg: "description",
      type: "object"
    }, {
      arg: "scripture",
      type: "object"
    }, {
      arg: "speaker",
      type: "object",
    }, {
      arg: "date",
      type: "string",
    }, {
      arg: "medias",
      type:"object"
    }],
    returns: {
      arg:"data",
      type:"string"
    },
    http: {verb: "post", path: "/sermon/add"}
  });
};
