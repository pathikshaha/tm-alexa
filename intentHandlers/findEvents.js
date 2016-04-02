var _ = require('lodash');
var http = require('http');
var config = require('../config');

module.exports = {
	init: function(request,response) {
		var searchTypeSlot = request.slot('SearchType');
		var keyword = request.slot('Keyword');

		if (keyword || searchTypeSlot) {
			var apiConfig = config.api.tm;
			var url = apiConfig.baseURL 
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
				var data = '';

				res.on('data', function (chunk){
					data += chunk;
				});

				res.on('end',function(){
					var obj = JSON.parse(data);
					var events = _.get(obj, '._embedded.events', [])
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
