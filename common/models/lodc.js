"use strict";

module.exports = function(Lodc) {
	require("../remote_methods/sermon")(Lodc);	
	require("../remote_methods/prayer")(Lodc);
	require("../remote_methods/event")(Lodc);
	require("../remote_methods/news")(Lodc);
};