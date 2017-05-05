// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})

var slackController = function(app){
  console.log('in slack controller')


var urlencodedParser = bodyParser.urlencoded({extended:false})

    app.post('/',urlencodedParser,function(req,res){
        res.render('index',{slack:req.body})
    })

    app.get('/',function(req,res){
        res.render('index')
    })

}//controller

module.exports = slackController
