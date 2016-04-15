'use strict';

const _ = require('lodash');
const http = require('http');
const config = require('../config');

module.exports = {
	init: function(request,response) {
		const searchTypeSlot = request.slot('SearchType');
		const keyword = request.slot('Keyword');

		if (keyword || searchTypeSlot) {
			const apiConfig = config.api.tm;
			let url = apiConfig.baseURL
				+ apiConfig.discoveryURL
				+ apiConfig.version
				+ '/events.json?apikey='
				+ apiConfig.apiKey;

			if (keyword) {
				url += '&keyword=' + keyword;
			}

			if (searchTypeSlot === 'nearby') {
				url += '&postalCode=' & 90028;
			}

			http.get(url, function(res) {
				let data = '';

				res.on('data', function (chunk){
					data += chunk;
				});

				res.on('end',function(){
					const obj = JSON.parse(data);
					const events = _.get(obj, '._embedded.events', [])
												.map(function(event) {
													return event.name + ' at ' + _.get(event, '_embedded.venues[0].name', '');
												});

					_.forEach(events, function(event) {
						response.say(event);
					});

					response.send();
				});

			}).on('error', function(e){

				response.say('Sorry, I am unable to pull events currently.');
				response.send();
				console.log("Got an error: ", e);

			});

			return false;

		} else {

			response.say("I'm not sure what you are looking for. You can ask me to find events nearby or find events this weekend");

		}
	}
}
