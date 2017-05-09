// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})



var slackController = function(app,io){

    var urlencodedParser = bodyParser.urlencoded({extended:false})


    app.get('/',function(req,res){
        res.render('index')
    })


    app.post('/',urlencodedParser,function(req,res){

        if (req.body.token == '0I7TFXDQawvFZC7uW4l4zxZR'){

          var message = {
            'points': req.body.text,
            'userName': req.body.user_name,
            'channel': req.body.channel_name
          }
          io.sockets.emit('message', message);
          res.send('You pointed!')

        }else{
          res.redirect('/')
        }

    })



}//controller

module.exports = slackController
