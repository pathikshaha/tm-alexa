module.exports = {
	init: function(request,response) {
		var SearchTypeSlot = request.slot('SearchType');

		if(SearchTypeSlot) {
			response.say("Looking for events " + SearchTypeSlot);
		} else {
			response.say("I'm not sure what you are looking for. You can ask me to find events nearby or find events this weekend");
		}
	}
}