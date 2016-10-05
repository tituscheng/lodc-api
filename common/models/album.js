
var shortid = require('shortid32');
var logger = require('lodc-logger');
var async = require('async');
var moment = require('moment');

module.exports = function(Album) {
	Album.isExist = function(name, callback) {
		Album.findOne({where: {title: name}}, function(err, album){
			if(err) {
				console.log("Album.findOne failed in Album.isExist: ", err);
				callback(false);
			}
			if(!!album) {
				callback(true);
			} else {
				callback(false);
			}
		})
	}

	Album.createAlbum = function(title, description, callback) {
		var todayDate = new Date();
		var data = {
			id: shortid.generate(),
			title: (!!title && title.length > 0 ? title : ""),
			description: (!!description && description.length  > 0 ? description : ""),
			created: todayDate,
			updated: todayDate
		};
		Album.isExist(title, function(found){
			if(found) {
				console.log("Found album with title " + title + ", skip create, task finish");
			} else {
				Album.create(data, function(err, album){
					if(err) {
						console.log("Album.create failed in Album.createAlbum");
						callback(err);
					} else {
						console.log("Successfully created album " + album.title);
						callback(null, album);
					}
				})
			}
		})
	}

	Album.getPublicAlbums = function(callback) {
		var response = [];
		Album.find({}, function(err, albums){
			if(err) {
				logger.error("Album.find failed in Album.getPublicAlbums: ", err);
				callback(null);
			} else {
				if(!!albums && albums.length > 0) {
					var Photo = Album.app.models.photo;
					async.eachSeries(albums, function(album, album_cb){
						Photo.getAlbum(album.id, function(err, photos){
							if(err) {
								logger.error("Photo.randomPhoto failed: ", err);
							} else {
								response.push({
									album:album,
									photos:photos
								});
							}
							album_cb(null);
						});
					}, function(err, results){
						if(err) {
							logger.error("async.eachSeries failed in Album.getPublicAlbums: ", err);
							callback(err);
						} else {
							callback(null, response);
						}
					});
				}
			}
		});
	}

	Album.getAlbumByID = function(album_id, callback) {
		if(!!album_id && album_id.length > 0) {
			Album.findOne({where:{id:album_id}}, function(err, album){
				if(err) {
					logger.error("Album.findOne failed in Album.getAlbumByID: ", err);
					callback(err);
				} else {
					if(!!album) {
						var Photo = Album.app.models.photo;
						Photo.find({where: {album_id: album_id}}, function(err, photos){
							if(err) {
								logger.error("Photo.find failed in Album.getAlbumByID: ", err);
							} else {
								if(!!photos && photos.length > 0) {
									callback(null, {status: true, message: "Found photos with album", data: photos, title: album.title});
								} else {
									callback(null, {status: false, message: "Found no photos with the album_id " + album_id});
								}
							}
						})
					} else {	
						callback(null, {status: false, message: "Found no album with the id " + album_id});
					}
				}
			});
		}
	};

	Album.getAlbumsByYear = function(year, callback) {
		var Photo = Album.app.models.photo;
		var response = [];
		var albumQuery = {
			where: {
				and:[
					{created: {gte: year + "-01-01"}},
					{created: {lt: String((parseInt(year) + 1)) + "-01-01"}}
				]
			}
		}
		Album.find(albumQuery, function(err, albums){
			if(err) {
				logger.error("Album.find failed in Album.getAlbumsByYear.");
				console.log(err);
			} else {
				if(!!albums && albums.length > 0) {
					async.eachSeries(albums, function(album, album_cb){
						Photo.randomPhoto(album.id, function(err, photo){
							if(err) {
								callback(err);
							} else {
								response.push({id: album.id, title: album.title, url: photo.url});
								album_cb(null);
							}
						});
					}, function(err, results){
						if(err) {
							logger.error("async.eachSeries failed in Album.getAlbumsByYear");
							callback(err);
						} else {
							callback(null, response);
						}
					});
				}
			}
		})
	}
};
