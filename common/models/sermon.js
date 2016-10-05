"use strict"

var logger = require('lodc-logger');
var shortid = require('shortid32');

module.exports = function(Sermon) {

  Sermon.beforeCreate = function(next, sermon) {
    // Set unique ID
    if (!sermon.id) {
      sermon.id = shortid.generate();
    }
    next();
  };

  Sermon.updateSermon = function(id, title, description, scripture, speaker, date, medias, cb) {
    Sermon.findOne(id, function(err, sermon){
      if(err) {
        logger.debug("Sermon.findOne failed in Sermon.updateSermon: ", err);
        cb(err);
      } else {
        if(sermon) {
          logger.info("Found sermon with id %s", id);
          sermon.updateAttributes(data, function(err, mysermon){
            if(err) {
              logger.error("sermon failed to update attributes: ", err);
              cb(err);
            } else {
              logger.info("Successfully updated attribute for sermon with id %s",  id);
              cb(null, sermon);
            }
          });
        }
      }
    });
  }

  Sermon.mostRecent = function(cb){
    var query = {
      order:"date DESC",
      limit: 4
    };

    Sermon.find(query, function(err, results){
      if(err){
        logger.debug("Sermon.find failed in Sermon.mostRecent: ", err);
        cb(null);
      } else {
        cb(null, results);
      }
    });
  }


  Sermon.createNewSermon = function(title, description, scripture, speaker, date, media, cb) {
    logger.info("Creating a new sermon for '%s'", title);
    logger.debug("date: ", date);

    Sermon.create({
      "id":shortid.generate(),
      "title": title,
      "description": description,
      "scripture": scripture,
      "speaker": speaker,
      "date": new Date(date),
      "medias": media,
      created: Date.now(),
      updated: Date.now()
    }, function(err, sermon) {
      if (err) {
        //logger.info("Sermon.createNewSermon failed in sermon.js located in /common/models: ", err);
        console.log("Sermon.createNewSermon failed: ", err);
      } else {
        cb(null, sermon);
      }
    });
  };

  Sermon.getMonths = function(cb, callback) {
    logger.info("Getting months from database");
    Sermon.find({field:["created"]}, function(err, sermons){
      if(err) {
        logger.error("Sermon.find failed in Sermon.getMonths: ", err);
      } else {

      }
    });
  }



  Sermon.getSermons = function(cb) {
    logger.info("Getting sermons from database");
    Sermon.find({}, function(err, sermons){
      if(err) {
        logger.error("Sermon.find failed in Sermon.getSermons: ", err);
      } 
      cb(null, {sermons:sermons});
    });
  }

};
