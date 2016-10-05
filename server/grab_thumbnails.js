"use strict";

var Dropbox = require('dropbox');
var async = require('async');
var dbx = new Dropbox({ accessToken: '2c7Bc1GGsYAAAAAAAAAAneOg2YsIrnb8x8PD_zYojhxPm-OR8r_Bsn2k5PU_QA_J' });

var logger = require('lodc-logger');
var server = require("./server");
var shortid = require('shortid32');

var fs = require("fs");

var ds = server.datasources.psql;

var Album = server.models.album;
var Photo = server.models.photo;

var path = "";

var MAIN_FOLDER = "/lodc_gallery/2016 Jesus Prayer Center Retreat";

function getEntries(response) {
  return response.hasOwnProperty('entries') ? response.entries : [];
}

function DropBoxPhotoPublicLink(DropBoxEntry, callback) {
  dbx.sharingCreateSharedLink({ path: DropBoxEntry.path_display }).then(function(response) {
    callback(null, response.url.replace("https://www.dropbox.com", "https://dl.dropboxusercontent.com").replace("?dl=0", ""));
  }).catch(function(err) {
    console.log(err);
    callback(err);
  });
}

logger.info("Starting to grab thumbnails");

dbx.filesListFolder({ path: MAIN_FOLDER }).then(function(response) {
  var photos = getEntries(response);
  if(photos.length > 1) {
    logger.info("Found ", photos.length, " photos");
    async.eachSeries(photos, function(photo, photo_cb) {
      dbx.filesGetThumbnail({ path: photo.path_display, size: "w64h64" }).then(function(response) {
        //	console.log(response.name);
        var filePath = "/Users/tituscheng/Desktop/lodc-images/thumbnail/" + response.name;
        fs.exists(filePath, (exists) => {
          if(exists) {
            console.error(response.name + " already exists");
            photo_cb(null);
          } else {
            fs.writeFile(filePath, response.fileBinary, "binary", function(err) {
              if(err) {
                console.log(err);
                photo_cb(null);
              } else {
                console.log(response.name + " was saved!");
                photo_cb(null);
              }
            });
          }
        });
      }).catch(function(err) {
        console.log("error in dbx.filesGetThumbnail: ", err);
        photo_cb(null);
      });
    }, function(err, results) {
      if(err) {
        console.log("async.eachSeries failed in Photo.getPhotoFolder: " + err);
      } else {
        console.log("Finished downloading all thumbnails");
      }
    });
  } else if(folders.length == 1) {

  }
}).catch(function(err) {
  console.log(err);
});
