var alexa = require('alexa-app');
var app = new alexa.app('ticketmaster');

var FindEventsIntent = require('./intentHandlers/findEvents');


app.pre = function(request,response,type) {
	if (request.sessionDetails.application.applicationId!="amzn1.echo-sdk-ams.app.a552d2b7-d520-4f5f-ad06-ed98d3524c45") {
		// Fail ungracefully 
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
});

// Connect to AWS Lambda
exports.handler = app.lambda();
