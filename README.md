##To install dependencies

```npm install```


##To test aws lambda functions locally

1. `npm install -g lambda-local`

2. `lambda-local -l index.js -h handler -e test/findEventsIntentMock.js`