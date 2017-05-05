// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})

var slackController = function(app){
  console.log('in slack controller')


var urlencodedParser = bodyParser.urlencoded({extended:false})

    app.post('/',urlencodedParser,function(req,res){

        if (req.body.token == '0I7TFXDQawvFZC7uW4l4zxZR'){
          console.log(req.body)
          res.render('index',{'userName':req.body.user_name,'point':req.body.text})
        }else{
          res.render('index')
        }

    })

    app.get('/',function(req,res){
        res.render('index',{'userName':'','point':''})
    })

}//controller

module.exports = slackController
