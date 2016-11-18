"use strict";

var server = require("./server");
var dataSource = server.dataSources.psql;

var models = [
  "sermon",
  "prayer",
  "news",
  "event",
  "email",
  "photo",
  "album",
  "special"
];

models.forEach(function(modelName) {
  dataSource.isActual(modelName, function(err, actual) {
    if (err) {
      throw err;
    }
    if (actual) {
      console.log("actual: " + modelName);
    } else {
      console.log("not actual: " + modelName);
      dataSource.autoupdate(modelName, function(er) {
        if (er) {
          throw er;
        }
        console.log("created table " + modelName);
        dataSource.disconnect();
      });
    }
  })
});
