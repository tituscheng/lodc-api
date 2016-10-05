var api_key = "key-47145d445212cfa2bc84da6cf3621068";
var domain = "lovingopendoorchurch.com";
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var logger = require('lodc-logger');
var shortid = require('shortid32');

module.exports = function(Email) {

	Email.sendEmail = function(to, name, contactemail, subject, message, cb) {
		
		var html = "You've got a message<br>From  " + name + "<br>subject: " + subject + "<br>contact email: " + contactemail + "<br>message: " + message;

		to = "baptist146@gmail.com";
		var data = {
			from: "LODC Media <lodcmedia@gmail.com>",
			to: to,
			subject: "You've got a new message from LovingOpenDoorChurch website!",
			html: html
		};

		Email.create({
			id: shortid.generate(),
			to:to,
			name:name,
			contactemail:contactemail,
			message: message,
			received_date: new Date()
		}, function(err, email){
			if(err) {
				console.log(err);
			} else {
				console.log("Successfully save message!");
			}
		});
		
		mailgun.messages().send(data, function(err, body){
			if(err) {
				console.log(err);
				cb(err);
			} else {
				var response = {
					success:false,
					message:""
				}
				if(body.message === "Queued. Thank you.") {
					response.success = true,
					response.message = "Successfully sent";
				}
				cb(null, response);
			}
		});


	}

};
