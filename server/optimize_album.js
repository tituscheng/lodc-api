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

var MAIN_FOLDER = "/lodc_images/2016 Jesus Prayer Center Retreat Photos";

function getEntries(response) {
	return response.hasOwnProperty('entries') ? response.entries : [];
}

function DropBoxPhotoPublicLink(DropBoxEntry, callback) {
	dbx.sharingCreateSharedLink({path:DropBoxEntry.path_display}).then(function(response){
		callback(null, response.url.replace("https://www.dropbox.com", "https://dl.dropboxusercontent.com").replace("?dl=0", ""));
	}).catch(function(err) {
		console.log(err);
		callback(err);
	});
}

dbx.filesListFolder({path: MAIN_FOLDER}).then(function(response){
	var files = getEntries(response);
	var thumbnailFolder = MAIN_FOLDER + "/thumbnail";
	dbx.filesGetThumbnail({path:files[0].path_display, size:"w32h32"}).then(function(data){
		// DropBoxPhotoPublicLink(response, function(err, url){
			// var fs = require('fs');
			// fs.writeFile('test.jpg', response.fileBinary, 'binary', function(err){
			// 	console.log("DOne");
			// })
			var bytes = new Uint8Array(data.fileBinary.length);
			for (var i=0; i<data.fileBinary.length; i++) {
			    bytes[i] = data.fileBinary.charCodeAt(i);
			}
			dbx.filesCreateFolder({path:thumbnailFolder}).then(function(folderResponse){
				logger.info(folderResponse);
				dbx.filesUpload({contents:new Blob([folderResponse.fileBinary], {type:"image/jpeg"}), path:folderReponse.path_display, autorename: false}).then(function(response){
					console.log("Done");
				}).catch(function(err){
					logger.error("filesUpload: ", err);
				});
			}).catch(function(err){
				logger.error("fileCreateFolder: ", err);
			});
		// })
	});
	// dbx.filesCreateFolder({path:thumbnailFolder}).then(function(response){
	// 	logger.debug("Successfully create a new folder!");
	// 	filesGetThumbnail
	// 	// dbx.filesDownload({path:files[0].path_display}).then(function(response){

	// 	// });
	// });

	// async.eachSeries(files, function(file, file_cb){
	// 	dbx.filesDownload({path:file.path_display}).then(function(response){
	// 		logger.debug(response.path_display);
	// 		file_cb(null);
	// 	}).catch(function(err){
	// 		logger.error("dbx.filesDownload failed: ", err);
	// 	});
	// }, function(err, result){

	// });
	
}).catch(function(err){
	console.log(err);
});





