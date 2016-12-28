"use strict";

var logger = require('lodc-logger');

module.exports = function(Lodc) {


  Lodc.createWebContent = function(name, content, callback) {
    Lodc.app.models.webcontent.createContent(name, content, function(err, result){
      callback(null, result);
    });
  };

  Lodc.remoteMethod("createWebContent", {
    description: "Creates the content of a web element",
    isStatic: true,
    accepts: [{
      type: "string",
      arg: "name",
      root: true
    }, {
      type: "data",
      arg: "content",
      root: true
    }],
    returns:[{
      type: "array",
      arg: "result",
      root: true
    }],
    http: {verb: "post", path: "/webcontent/create"}
  });

  Lodc.getWebContent = function(callback) {
    Lodc.app.models.webcontent.getContent(function(err, webcontents) {
      callback(null, webcontents);
    });
  }

  Lodc.remoteMethod("getWebContent", {
    description: "Get all the web contents",
    isStatic: true,
    returns:[{
      type: "object",
      arg: "result",
      root: true
    }],
    http: {verb: "get", path: "/webcontent/get"}
  });
};
