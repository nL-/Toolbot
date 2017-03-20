"use strict"
process.stdin.setEncoding('utf8');
const util = require('util');
const EngineBuilder = require('adaptjs').EngineBuilder;

let builder = new EngineBuilder();
builder.entity('WeatherKeyword', ['weather']);
builder.entity('WeatherType', ['snow', 'rain', 'wind', 'sleet', 'sunny']);
builder.intent('WeatherIntent')
	.require('WeatherKeyword', 'WeatherKey')
	.optionally('WeatherType');

let engine = builder.build();

process.stdin.on('data', (text)=>{
	if(text == 'close\n'){

		engine.stop();
		close();
	}
	console.log(text);
	engine.query(text)
		.then(intents=>{
			console.log(intents);
		});
});