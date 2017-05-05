var express = require('express')
var app = express()
var slackController = require('./controllers/slack-controller')
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

app.set('port', (process.env.PORT || 5000));

app.set('view engine','ejs')
app.use(express.static('./public'))

//controllers
slackController(app)


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
