"use strict"

var logger = require('lodc-logger');
var shortid = require('shortid32');

module.exports = function(News) {


  News.updatenews = function(id, title, content, date, cb) {
    News.findOne(id, function(err, news){
      if(err) {
        logger.debug("News.findOne failed in News.updateNews: ", err);
        cb(err);
      } else {
        if(news) {
          logger.info("Found news with id %s", id);
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
          if(date) {
          	data.date = new Date(date);
          }
          date.updated = new Date();
          news.updateAttributes(data, function(err, mynews){
            if(err) {
              logger.error("news failed to update attributes: ", err);
              cb(err);
            } else {
              logger.info("Successfully updated attribute for news with id %s",  id);
              cb(null, mynews);
            }
          });
        }
      }
    });
  }


  News.createNewNews = function(title, content, date, cb) {
    logger.info("Creating a new news for '%s'", title);
    logger.debug("date: ", date);
    News.create({
    	"id":shortid.generate(),
      "title": title,
      "content": content,
      "date": new Date(date),
      "created": new Date(),
      "updated": new Date()
    }, function(err, news) {
      if (err) {
        //logger.info("news.createNewnews failed in news.js located in /common/models: ", err);
        console.log("news.createNewnews failed: ", err);
      } else {
        cb(null, news);
      }
    });
  };



  News.getNews = function(cb) {
    logger.info("Getting newss from database");
    News.find({}, function(err, news){
      if(err) {
        logger.error("news.find failed in news.getnewss: ", err);
      } 
      cb(null, news);
    });
  }

};
