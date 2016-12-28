var logger = require('lodc-logger');
var shortid = require('shortid32');

module.exports = function(Webcontent) {
	Webcontent.createContent = function(title, content, callback) {
		logger.info("Webcontent.createContent called");
		Webcontent.create({
			id: shortid.generate(),
			name: title,
			content: content,
			updated: new Date()
		}, function(err, webcontent) {
			if(err) {
				callback(err);
				logger.error(err);
			} else {
				logger.info("Successfully created webcontent");
				callback(null, webcontent);
			}
		})
	};

	Webcontent.getContent = function(callback) {
		logger.info("Webcontent.getContent called");
		Webcontent.find({}, function(err, webcontents){
			if(err) {
				callback(err);
			} else {
				callback(null, webcontents);
			}
		});
	};
};

