"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.getPublicAlbums = function(callback) {
    Lodc.app.models.album.getPublicAlbums(function(err, result){
      callback(null, result);
    });
  };

  Lodc.remoteMethod("getPublicAlbums", {
    description: "Get all the albums for loving open door church",
    isStatic: true,
    returns:[{
      type: "array",
      arg: "result",
      root: true
    }],
    http: {verb: "get", path: "/album/public_albums"}
  });

  Lodc.getAlbumsViaYear = function(year, callback) {
    Lodc.app.models.album.getAlbumsByYear(year, function(err, result){
      callback(null, result);
    });
  }


  Lodc.remoteMethod("getAlbumsViaYear", {
    description: "Get all the albums in a particular year",
    isStatic: true,
    accepts:[{
      type: "string",
      arg: "year",
      root: true
    }],
    returns:[{
      type: "array",
      arg: "result",
      root: true
    }],
    http: {verb: "get", path: "/albums/year"}
  });

  Lodc.getAlbumViaID = function(album_id, callback) {
    Lodc.app.models.album.getAlbumByID(album_id, function(err, result){
      callback(null, result);
    });
  }

  Lodc.remoteMethod("getAlbumViaID", {
    description: "Get all the url of an album from an album id",
    isStatic: true,
    accepts:[{
      type: "string",
      arg: "album_id",
      root: true
    }],
    returns: [{
      type: "array",
      arg: "result",
      root: true
    }],
    http: {verb: "get", path: "/album/id"}
  });


};
