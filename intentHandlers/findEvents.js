var _ = require('lodash');
var http = require('http');

const rootUrl = 'http://app.ticketmaster.com/';
const apiKey = 'kQ988HL4LyHGGJiY89BHZNPNDlXfPKYy';

module.exports = {
	init: function(request,response) {
		var SearchTypeSlot = request.slot('SearchType');

		if(SearchTypeSlot) {
			var url = rootUrl + 'discovery/v1/events.json?apikey=' + apiKey;

			http.get(url, function(res) {
				var data = '';

				res.on('data', function (chunk){
			        data += chunk;
			    });

			    res.on('end',function(){
			        var obj = JSON.parse(data);
			        console.log(obj);
			        var sayResp = _.chain(obj._embedded.events)
									.map(function(event) {
										return event.name + ' at ' + event._embedded.venue[0].name;
									})
									.value()
									.toString();

					response.say(sayResp);
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
