"use strict";

var logger = require('lodc-logger');
var server = require("./server");
var shortid = require('shortid32');

var ds = server.datasources.psql;

//4/24/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Loving Open Door Church Sermon 4/24/16",
		kr:"사랑의 열린문 교회 일요일 예배 말씀"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Genesis",
			kr:"창세계"
		},
		"chapter": 28,
		"startverse": 10,
		"endverse": 22
	},
	date: new Date("2016-04-16"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=9_8aOVS046g"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});


//5/15/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"What is humanity?",
		kr:"인간이란 무엇인가?"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Psalms",
			kr:"시편"
		},
		"chapter": 51,
		"startverse": 10,
		"endverse": 19
	},
	date: new Date("2016-05-15"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=L6szY-0SPi0"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

//5/22/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Maturation",
		kr:"성숙"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Joshua",
			kr:"여호수아"
		},
		"chapter": 6,
		"startverse": 22,
		"endverse": 25
	},
	date: new Date("2016-05-22"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=Xgz-O0ahygE"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

//5/29/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Life's Great Turn-around",
		kr:"인생 대 역전"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Esther",
			kr:"에스더"
		},
		"chapter": 9,
		"startverse": 20,
		"endverse": 28
	},
	date: new Date("2016-05-29"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=8W4coQWgcC0"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

// 6/5/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Go to the Place of Prayer!",
		kr:"기도의 자리로 나아가라!"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Romans",
			kr:"로마서"
		},
		"chapter": 5,
		"startverse": 1,
		"endverse": 2
	},
	date: new Date("2016-06-05"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=yrgMvyzgCgM"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

// 6/12/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Salvation Through Faith",
		kr:"al"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Romans",
			kr:"로마서"
		},
		"chapter": 10,
		"startverse": 9,
		"endverse": 10
	},
	date: new Date("2016-06-12"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=04OnkrEc0EY"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

// 6/26/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Let's achieve sanctification",
		kr:"성화를 이루어 가자"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Philippians",
			kr:"빌립보서"
		},
		"chapter": 2,
		"startverse": 5,
		"endverse": 12
	},
	date: new Date("2016-06-26"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=4I6LDpvgarA"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

// 7/3/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Live with the Mentality of God's Kingdom",
		kr:"하나님 나라의 정신으로 살자"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Matthew",
			kr:"마태복음"
		},
		"chapter": 20,
		"startverse": 1,
		"endverse": 16
	},
	date: new Date("2016-07-03"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=wOp0p71s5jg"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

// 7/10/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Spiritual Landmark",
		kr:"영적 경계표"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Deuteronomy",
			kr:"신명기"
		},
		"chapter": 19,
		"startverse": 14,
		"endverse": 14
	},
	date: new Date("2016-07-10"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=TykGSfjWeGI"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});



// 7/17/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"The Most Beautiful and Good-Natured Place",
		kr:"가장 아름답고 선한 곳"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Psalms",
			kr:"시편"
		},
		"chapter": 133,
		"startverse": 1,
		"endverse": 3
	},
	date: new Date("2016-07-17"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=OwD5hbAr9zs"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});


// 7/24/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"Staff of Life",
		kr:"인생 막대기"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Exodus",
			kr:"출애굽기"
		},
		"chapter": 4,
		"startverse": 1,
		"endverse": 4
	},
	date: new Date("2016-07-24"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=ukdmDU5-SKU"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});



// 7/31/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"A Completed Temple is the Church",
		kr:"성전의 완성은 교회입니다"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Exodus",
			kr:"역대상"
		},
		"chapter": 21,
		"startverse": 18,
		"endverse": 27
	},
	date: new Date("2016-07-31"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=6av5kkwEeKM"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});


// 8/6/16
server.models.sermon.create({
	id: shortid.generate(),
	title:{
		en:"In and Out",
		kr:"In and Out"
	}, 
	description: {
		en:"",
		kr: ""
	},
	scripture: {
		"book":{
			en:"Acts",
			kr:"사도행전"
		},
		"chapter": 1,
		"startverse": 21,
		"endverse": 26
	},
	date: new Date("2016-08-06"),
	created: Date.now(),
	updated: Date.now(),
	speaker: {
		"en":"Pastor Lee",
		"kr":"이동철"
	},
	media: {
		"youtube":"https://www.youtube.com/watch?v=9zoash3FGf8"
	}

}, function(err, sermon){
	if(!err) {
		logger.info("***************  Created Sermon *****************");
		logger.info('Successfull created the following sermon');
		logger.info("id: %s", sermon.id);
		logger.info("title: ", sermon.title);
		logger.info("*************************************************");
	} else {
		logger.error("Failed to create sermon: ", err);
	}
});

