// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})



var slackController = function(app,io){

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
        res.render('index',{'userName':'','point':''})
    })

    //Whenever someone connects this gets executed
    io.on('connection', function(socket){
        console.log('A user connected');

        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
          console.log('A user disconnected');
        });

    });



}//controller

module.exports = slackController
