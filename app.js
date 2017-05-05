var express = require('express')
var app = express()
var slackController = require('./controllers/slack-controller')

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

app.set('view engine','ejs')
app.use(express.static('./public'))

//controllers
slackController(app)


app.listen(3000)
console.log('server started on port 3000...')
