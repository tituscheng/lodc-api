var Dropbox = require('dropbox');
var logger = require('lodc-logger');
var async = require('async');
var dbx = new Dropbox({ accessToken: '2c7Bc1GGsYAAAAAAAAAAneOg2YsIrnb8x8PD_zYojhxPm-OR8r_Bsn2k5PU_QA_J' });
var shortid = require('shortid32');

module.exports = function(Photo) {


	Photo.createPhoto = function(name, purl, album_id, photo_type, callback) {
		var photoQuery = {
			where: {
				url:purl
			}
		};
		Photo.findOne(photoQuery, function(err, photo){
			if(err) {
				callback(err);
			}
			if(!!photo) {
				callback(null, photo);
			} else {
				var todayDate = new Date();
				var newPhoto = {
					id:shortid.generate(),
					name: name,
					created: todayDate,
					updated: todayDate,
					location: "",
					album_id: album_id
				}
				if(photo_type == "thumbnail") {
					newPhoto.thumbnail_url = purl;
				} else {
					newPhoto.url = purl;
				}
				Photo.create(newPhoto, function(err, newphoto){
					if(err) {
						callback(err);
					} else {
						callback(null, newphoto);
					}
				})
			}
		})
	}

	Photo.findPhotoByName = function(name, callback) {
		Photo.findOne({where:{name:name}}, function(err, photo){
			if(err) {
				callback(err);
			} else {
				callback(null, photo);
			}
		})
	}

	Photo.randomPhoto = function(album_id, callback) {
		Photo.find({where:{album_id:album_id}}, function(err, photos){
			if(err) {
				logger.error("Photo.find failed in Photo.randomPhoto");
				callback(err);
			} 
			if(!!photos && photos.length > 0) {
				var x = 0;
				var y = photos.length - 1;
				callback(null, photos[Math.floor(Math.random() * ((y-x)+1) + x)]);
			}
		});
	}

	Photo.getAlbum = function(album_id, callback) {
		Photo.find({where:{album_id:album_id}, limit:30}, function(err, photos){
			if(err) {
				logger.error("Photo.find failed in Photo.getAlbum");
				callback(err);
			} 
			if(!!photos && photos.length > 0) {
				callback(null, photos);
			}
		});
	}

	Photo.getPhotoFolder = function(cb) {
		function extractFolderName(response) {
			var entry_holders = response.entries;
			var photo_folders = [];
			entry_holders.forEach(function(entry){
				photo_folders.push({
					name:entry.name,
					path:entry.path_display
				});
			});
			return photo_folders;
		}
		function getEntries(response) {
			return response.entries;
		}

		function getPublicLink(DropBoxEntry, callback) {
			dbx.sharingCreateSharedLink({path:DropBoxEntry.path_display}).then(function(response){
				console.log("public link: " + getPublicLink(response));
				callback(null, response.url.replace("https://www.dropbox.com", "https://dl.dropboxusercontent.com"));
			}).catch(function(err) {
				console.log(err);
				callback(err);
			});
		}

		function getSharedLink(entry, next) {
			var sharedlinkpath = entry.path_display;
			dbx.sharingCreateSharedLink({path:sharedlinkpath}).then(function(response){
				console.log("public link: " + getPublicLink(response));
				next();
			}).catch(function(err) {
				console.log(err);
			});
		}
		function pickRandomPhoto(fpath, next) {
			dbx.filesListFolder({path:fpath}).then(function(response){
				var entries = getEntries(response);
				console.log(entries.length);
				async.eachSeries(entries, function(entry, entry_cb){
					getSharedLink(entry, function() {
						entry_cb(null);
					})
				}, function(err, results) {
					if(err) {
						console.log("async.eachSeries failed in pickRandomPhoto");
					} else {
						console.log("Finished getting all shared links");
					}
					next();
				});
			}).catch(function(err){
				console.log(err);
			});
		}
		dbx.filesListFolder({path: '/lodc_images'}).then(function(response){
			var folders = extractFolderName(response);
			var photos = [];
			async.eachSeries(folders, function(folder, folder_cb){
				pickRandomPhoto(folder.path, function(){
					folder_cb(null);
				});
			}, function(err, results){
				if(err) {
					console.log("async.eachSeries failed in Photo.getPhotoFolder: " + err);
				} else {

				}
			});
		}).catch(function(err){
			console.log(err);
		});
	}
};
