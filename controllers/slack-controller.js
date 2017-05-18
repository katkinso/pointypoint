var bodyParser = require('body-parser')
var Client = require('node-rest-client').Client
var client = new Client()
var utils = require('../utils/utils')
var fs = require('fs')

if (fsExistsSync('config/local.js')) {
  var token = require('../config/local')
  token.setEnv()
}

function fsExistsSync(myDir) {
  try {
    fs.accessSync(myDir);
    return true;
  } catch (e) {
    return false;
  }
}

var slack_token = process.env['SLACK_VERIFICATION_TOKEN']
var slack_post_token = process.env['SLACK_POST_TOKEN']


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
    var numPeople
    var numVotes = 0
    var votingComplete = false
    var uuid = ''
    var chart = ''
    var userArr = new Array()
    var pointArr = new Array()

    app.get('/',function(req,res){
        res.render('index')
    })


    app.post('/',urlencodedParser,function(req,res){


        if (req.body.token == slack_token && req.body.token){


          //count num votes
          numVotes++

          //set message for slack response
          var msg = ''
          msg = `Thanks ${req.body.user_name} voting recorded.`

          //tell if voting is done
          if (numVotes == numPeople){
              votingComplete = true
              numVotes = 0
              msg += ' Voting Closed!'
          }

          //buildChart
          userArr.push(req.body.user_name + numVotes.toString())
          pointArr.push(req.body.text)
          chart = utils.buildChart(userArr,pointArr)


          //build message for front end
          var message = {
            'points': req.body.text,
            'userName': req.body.user_name  + numVotes.toString(),
            'channel': req.body.channel_name,
            'uuid':uuid,
            'votingComplete':votingComplete,
            'chart':chart
          }

          //return data
          // reset everything
          if (votingComplete){
            message = ''
            userArr = []
            pointArr = []
            votingComplete = false
            res.send('I said voting complete! stop voting dumbass!')
          }else{
            io.sockets.emit('message', message);
            res.send(msg)
          }






        }else{


            //set the message you want to post to slack
            slack_args.data.text = req.body.task_name
            numPeople = req.body.num_people
            uuid = req.body.uuid

            console.log('slack_token' + slack_token)

            if (!numPeople){ res.render('index') }

            client.post("https://hooks.slack.com/services/${team_id}/${channel_id}/${slack_post_token}", slack_args, function (data, response) {
            // parsed response body as js object
            // console.log(data);
            // raw response
            //console.log(response);
            });

          // res.redirect('/')

            res.render('index',{task_to_point:req.body.task_name,uuid:uuid})
        }
    })



}//controller

module.exports = slackController
