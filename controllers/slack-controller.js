// var request = require('request')
var bodyParser = require('body-parser')
// var Promise = require('bluebird')
var Client = require('node-rest-client').Client
var client = new Client()
// var request = Promise.promisifyAll(require("request"), {multiArgs: true})

//slack toke for getting messages

//LOCAL ONLY

var slack_token = process.env['SLACK_TOKEN']
var slack_post_token = process.env['SLACK_POST_TOKEN']
console.log(slack_post_token)
//
var slack_args = {
  'path': {'team_id': 'T583UKKFS','channel_id': 'B58DWJSKT','slack_post_token': slack_post_token},
  'headers': { "Content-Type": "application/json" },
  'data': {
      "text": "I am a test message x http://slack.com"
  }
}



// https://hooks.slack.com/services/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



var slackController = function(app,io){

    var urlencodedParser = bodyParser.urlencoded({extended:false})



    app.get('/',function(req,res){
        res.render('index')
    })


    app.post('/',urlencodedParser,function(req,res){


        // console.log('retrun=' +  JSON.stringify(req.body))

        if (req.body.token == slack_token){

          console.log(req.body)

          var message = {
            'points': req.body.text,
            'userName': req.body.user_name,
            'channel': req.body.channel_name
          }


          io.sockets.emit('message', message);
          res.send('You pointed!')

        }else{

            //set the message you want to post to slack
            slack_args.data.text = req.body.task_name


            client.post("https://hooks.slack.com/services/${team_id}/${channel_id}/${slack_post_token}", slack_args, function (data, response) {
            // parsed response body as js object
            // console.log(data);
            // raw response
            console.log(response);

            });

          // res.redirect('/')

            res.render('index',{task_to_point : req.body.task_name})
        }
    })



}//controller

module.exports = slackController
