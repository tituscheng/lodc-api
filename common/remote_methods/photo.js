"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.getPhotoFolder = function(callback) {
    Lodc.app.models.photo.getPhotoFolder(function(err, result){
      callback(null, result);
    });
  };

  Lodc.remoteMethod("getPhotoFolder", {
    description: "Get all the folder names and a random photo in each folder",
    isStatic: true,
    returns:[{
      type: "array",
      arg: "result",
      root: true
    }],
    http: {verb: "get", path: "/photo/getfolders"}
  });


};
