// var request = require('request')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require("request"), {multiArgs: true})



var slackController = function(app,io){

    var urlencodedParser = bodyParser.urlencoded({extended:false})


      //
      // io.on('connection', function(socket){
      //   console.log('A user connected');
      //
      //     //Sending an object when emmiting an event
      //   socket.emit('point', { point: body})
      //   socket.on('disconnect', function () {
      //     console.log('A user disconnected');
      //   });
      // });



    // app.post('/',urlencodedParser,function(req,res){
    //
    //     if (req.body.token == '0I7TFXDQawvFZC7uW4l4zxZR'){
    //       res.send('You pointed!')
    //       res.redirect('/',{'userName':req.body.user_name,'point':req.body.text})
    //     }else{
    //       res.redirect('/')
    //     }
    //
    // })

    app.get('/',function(req,res){
        res.render('index')
    })


    app.post('/',urlencodedParser,function(req,res){

        if (req.body.token == '0I7TFXDQawvFZC7uW4l4zxZR'){
          res.send('You pointed!')

          var message = {
            'points': req.body.text,
            'userName': req.body.user_name,
            'channel': req.body.channel_name
          }

          io.sockets.emit('message', message);
          // res.redirect('/',{'userName':req.body.user_name,'point':req.body.text})
        }else{
          res.redirect('/')
        }

    })






}//controller

module.exports = slackController
