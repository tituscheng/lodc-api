"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.getNews = function(cb) {
    Lodc.app.models.news.getNews(function(err, news){
      cb(null, {data: news});
    });
  };

  Lodc.addNews = function(title, content, date, category, cb) {
    logger.info("Lodc.addNews started...");
    Lodc.app.models.news.createNewNews(title, content, date, category, function(err, news){
      if(err) {
        cb(err);
      } else {
        
        logger.info("Successfully added new news '%s'", title);
        cb(null, {data: "Successfully add news", news:news});
      }
      logger.info("Finished creating new news");
    });
  };

  Lodc.updateNews = function(id, title, content, date, cb) {
    logger.info("Lodc.updateNews started...");
    Lodc.app.models.news.updatenews(id, title, content, date, function(err, result) {
      if(err) {
        cb(err);
      } else {
        logger.info("Successfully updating news with id %s", id);
        cb(null, result);
      }
    });
  };


  Lodc.remoteMethod("updateNews", {
    description: "Update a news instance provided a news id",
    isStatic: true,
    accepts:[{
      description:"id of the news",
      type:"string",
      arg:"id",
      root:true
    },{
      description:"title of the news",
      type:"object",
      arg:"title",
      root: true,
    }, {
      description: "content of the news",
      type:"object",
      arg:"content",
    },{
      description: "date of the news",
      type:"date",
      arg: "date"
    }],
    returns: [{
      type: "object",
      arg:"result"
    }],
    http: {verb: "put", path: "/news/update"}
  })

  Lodc.remoteMethod('getNews', {
    description: "Retrieve a list of all the newss available",
    isStatic: true,
    returns: [{
      description: "A list of all newss",
      type: "array",
      arg: "data",
      root: true
    }],
    http: { verb: "get", path: "/news/get" }
  });

  Lodc.remoteMethod('addNews', {
    description: "Add a news to the database",
    isStatic: true,
    accepts: [{
      arg: "title",
      type: "object",
      description: '{"eng":"string", "kor":"string"}'
    }, {
      arg: "content",
      type: "object"
    }, {
      arg: "date",
      type: "string"
    }, {
      arg: "category",
      type: "string"
    }],
    returns: {
      arg:"data",
      type:"string"
    },
    http: {verb: "post", path: "/news/add"}
  });
};
