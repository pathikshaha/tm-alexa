var alexa = require('alexa-app');
var app = new alexa.app('ticketmaster');
var config = require('./config');

var FindEventsIntent = require('./intentHandlers/findEvents');


app.pre = function(request,response,type) {
	if (request.sessionDetails.application.applicationId != config.app.id) {
		response.fail("Invalid applicationId");
	}
};

app.launch(function(request,response) {
  response.say("Welcome");
  response.card("Welcome", "Please tell me what you are looking for by saying, find events nearby or find events this weekend");
});

// FindEventsIntent
app.intent('FindEventsIntent', function(request,response) {
	FindEventsIntent.init(request,response);
	
  return false;
});

// Connect to AWS Lambda
exports.handler = app.lambda();
