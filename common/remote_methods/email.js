"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.sendEmail = function(to, name, contactemail, subject, message, cb) {
    Lodc.app.models.email.sendEmail(to, name, contactemail, subject, message, function(err, result){
      cb(null, result);
    });
  };

  Lodc.remoteMethod("sendEmail", {
    description: "Send an email to the recipient",
    isStatic: true,
    accepts:[{
      description:"recipient's email address",
      type:"string",
      arg:"to",
      root:true
    },{
      description:"name",
      type:"string",
      arg:"name",
      root: true,
    }, {
      description: "contact email",
      type:"string",
      arg:"contactemail"
    }, {
      description: "subject of the email",
      type:"string",
      arg:"subject"
    }, {
      description: "message of the email",
      type: "string",
      arg:"message",
      root:true
    }],
    returns: [{
      type: "object",
      arg:"result",
      root:true
    }],
    http: {verb: "post", path: "/email"}
  })

};
