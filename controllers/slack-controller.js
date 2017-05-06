// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})

var slackController = function(app){
  console.log('in slack controller')


var urlencodedParser = bodyParser.urlencoded({extended:false})

    app.post('/',urlencodedParser,function(req,res){

        if (req.body.token == '0I7TFXDQawvFZC7uW4l4zxZR'){
          res.send('You pointed!')
          res.redirect('/',{'userName':req.body.user_name,'point':req.body.text})
        }else{
          res.redirect('/')
        }

    })

    app.get('/',function(req,res){
        console.log(req.body)
        console.log(res.body)
        res.render('index',{'userName':'','point':''})
    })

}//controller

module.exports = slackController
