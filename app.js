var express = require('express')
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)

// var bodyParser = require('body-parser')
// create application/json parser
// var jsonParser = bodyParser.json()
var slackController = require('./controllers/slack-controller')




app.set('port', (process.env.PORT || 5000));
app.set('view engine','ejs')
app.use(express.static('./public'))

//controllers
slackController(app,io)

//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

server.listen(app.get('port'));
console.log('Node app is running on port', app.get('port'));
