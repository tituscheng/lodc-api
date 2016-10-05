"use strict";

var Dropbox = require('dropbox');
var async = require('async');
var dbx = new Dropbox({ accessToken: '2c7Bc1GGsYAAAAAAAAAAneOg2YsIrnb8x8PD_zYojhxPm-OR8r_Bsn2k5PU_QA_J' });

var logger = require('lodc-logger');
var server = require("./server");
var shortid = require('shortid32');

var ds = server.datasources.psql;

var Album = server.models.album;
var Photo = server.models.photo;

var path = "";

var MAIN_FOLDER = "/lodc_gallery";

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

dbx.filesListFolder({ path: MAIN_FOLDER }).then(function(response) {
  var photo_albums = getEntries(response);
  async.eachSeries(photo_albums, function(photo_album, photo_album_cb) {
    if(photo_album['.tag'] == 'folder') {
      logger.info("Found album ", photo_album.name, " in dropbox");
      Album.isExist(photo_album.name, function(exists) {
        if(exists) {
          logger.info("Album ", photo_album.name, " already exists in our database!");
        } else {
          Album.createAlbum(photo_album.name, "", function(err, album) {
            if(err) {
              logger.error(err);
            } else {
              logger.info("Album with title " + album.title + " created!");
              dbx.filesListFolder({ path: photo_album.path_display }).then(function(response) {
                var photos = getEntries(response);
                async.eachSeries(photos, function(photo, photo_cb) {
                  if(photo['.tag'] == "folder" && photo['name'] == "thumbnail") {
                    dbx.filesListFolder({ path: photo.path_display }).then(function(response) {
                      var thumbnails = getEntries(response);
                      async.eachSeries(thumbnails, function(thumbnail, thumbnail_cb) {
                      	logger.info("Found thumbnail ", thumbnail.name);
                        DropBoxPhotoPublicLink(thumbnail, function(err, link) {
                          if(err) {
                            logger.error(err);
                          } else {
                            Photo.createPhoto(thumbnail.name, link, album.id, "thumbnail", function(err, photo) {
                              if(err) {
                                logger.error(err);
                              } else {
                                if(!!photo) {
                                	logger.info("Created thumbnail ", thumbnail.name);
                                  thumbnail_cb(null);
                                }
                              }
                            })
                          }
                        })
                      }, function(err, results) {
                        if(err) {
                          logger.error(err);
                        } else {
                          logger.info("Finished processing all thumbnails");
                          photo_cb(null);
                        }
                      });
                    });
                  } else if(photo['.tag'] == "file") {
                  	logger.info("Found photo ", photo.name);
                    DropBoxPhotoPublicLink(photo, function(err, link) {
                      if(err) {
                        logger.error(err);
                      } else {
                      	Photo.findPhotoByName(photo.name, function(err, photo){
                      		if(err) {
                      			logger.error(err);
                      		} else {
                      			photo.updateAttribute("url", link, function(err, photo){
                      				if(err) {
                      					logger.error(err);
                      				} else {
                      					if(!!photo) {
                      						logger.info("Updated photo ", photo.name);
                      						photo_cb(null);
                      					}
                      				}
                      			})
                      		}
                      	});
                        // Photo.createPhoto(photo.name, link, album.id, "full", function(err, photo) {
                        //   if(err) {
                        //     logger.error(err);
                        //   } else {
                        //     if(!!photo) {
                        //     	logger.info("Created photo ", photo.name);
                        //       photo_cb(null);
                        //     }
                        //   }
                        // })
                      }
                    })
                  } else {
                  	logger.info("Found neither folder nor file, moving on");
                  	photo_cb(null);
                  }
                }, function(err, results) {
                  if(err) {
                    logger.error(err);
                  } else {
                    logger.info("Finished processing all photos in album ", photo_album.name)
                  }
                });
              }).catch(function(err){
              	console.log(err);
              });
            }
          });
        }
        photo_album_cb(null);
      })
    }
  }, function(err, results) {
    if(err) {
      logger.error(err);
    } else {
      logger.info("Finished processing all albums");
    }
  });
  // var folders = getEntries(response);
  // if(folders.length > 1) {
  // 	var photos = [];
  // 	async.eachSeries(folders, function(folder, folder_cb){
  // 		pickRandomPhoto(folder.path, function(){
  // 			folder_cb(null);
  // 		});
  // 	}, function(err, results){
  // 		if(err) {
  // 			console.log("async.eachSeries failed in Photo.getPhotoFolder: " + err);
  // 		} else {

  // 		}
  // 	});
  // } else if(folders.length == 1) {
  // 	Album.createAlbum(folders[0].name, "", function(err, album){
  // 		if(err) {
  // 			console.log("Album.createAlbum failed in dbx.fileslistFolder(): " + err);
  // 		} else {
  // 			logger.info("Album with title " + album.title + " created!");
  // 			dbx.filesListFolder({path:folders[0].path_display}).then(function(response){
  // 				var photo_entries = getEntries(response);
  // 				async.eachSeries(photo_entries, function(photo_entry, photo_entry_cb){
  // 					DropBoxPhotoPublicLink(photo_entry, function(err, publiclink){
  // 						if(err) {
  // 							logger.info("DropBoxPhotoPublicLink failed: " + err);
  // 						} else {
  // 							Photo.createPhoto(publiclink, album.id, "full", function(err, photo){
  // 								if(err) {
  // 									logger.info("Photo.createPhoto failed: " + err);
  // 								} else {
  // 									logger.info("Photo with url " + photo.url + " created!");
  // 								}
  // 								photo_entry_cb(null);
  // 							});
  // 						}
  // 					});
  // 				}, function(err, results){
  // 					if(err) {
  // 						logger.info("async.eachSeries failed in iterating photo_entries: ", err);
  // 					} else {	
  // 						logger.info("Successfully created all photos for album '" + album.title + "'");
  // 					}
  // 				});

  // 			}).catch(function(err){
  // 				console.log(err);
  // 			})
  // 		}
  // 	});
  // }
}).catch(function(err) {
  console.log(err);
});
