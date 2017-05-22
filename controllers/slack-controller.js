var bodyParser = require('body-parser')
var Client = require('node-rest-client').Client
var client = new Client()
var utils = require('../utils/utils')
var fs = require('fs')

//move this to gulp file ******
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
//move this to gulp file ******

//where does this belong?  ******
var slack_token = process.env['SLACK_VERIFICATION_TOKEN']
var slack_post_token = process.env['SLACK_POST_TOKEN']

var slack_args = {
  'path': {'team_id': 'T583UKKFS','channel_id': 'B58DWJSKT','slack_post_token': slack_post_token},
  'headers': { "Content-Type": "application/json" },
  'data': {
      "text": "I am a default message"
  }
}

var fibonacci = [1, 2, 3, 5, 8, 13, 21]
 // ******

var slackController = function(app,io){

    var urlencodedParser = bodyParser.urlencoded({extended:false})
    var numPeople = 0
    var numVotes = 0
    var votingComplete = false
    // var uuid = ''
    var chart = ''
    var userArr = new Array()
    var pointArr = new Array()


    app.get('/',function(req,res){
        res.render('index')
    })

    //Add task to slack
    app.post('/addtask',urlencodedParser,function(req,res){

          numPeople = 0
          numVotes = 0
          votingComplete = false
          // uuid = ''
          chart = ''
          userArr = []
          pointArr = []

          //set the message you want to post to slack
          slack_args.data.text = req.body.task_name
          numPeople = parseInt(req.body.num_people)
          uuid = req.body.uuid

          if (!numPeople){ res.render('index') }

          //post to slack
          client.post("https://hooks.slack.com/services/${team_id}/${channel_id}/${slack_post_token}", slack_args, function (data, response) {
          });

          res.render('index',{task_to_point:req.body.task_name,uuid:uuid})

    })

    //recieve post from slack
    app.post('/',urlencodedParser,function(req,res){

        //check if slack token is valid
        if (req.body.token != slack_token && !req.body.token){
            res.send('invalid token')
            return false
        }

        //count num votes
        numVotes++

        //set message for slack response
        var msg = ''
        msg = `Thanks ${req.body.user_name} voting recorded.`

        //check over count
        if (numVotes > numPeople){
            res.send('I said voting complete! stop voting dumbass!')
            return false
        }

        //tell if vote is bad
        if (fibonacci.indexOf(parseInt(req.body.text)) === -1){
            res.send('invalid number. Number must be: 1, 2, 3, 5, 8, 13, 21')
            numVotes--
            return false
        }

        //tell if voting is done
        if (numVotes === numPeople){
            votingComplete = true
            msg += ' Voting Closed!'
        }

        //buildChart
        userArr.push(req.body.user_name + numVotes.toString()) //generate people for dev. Remove XXXXXX
        pointArr.push(req.body.text)
        chart = utils.buildChart(userArr,pointArr)

        //build message for front end
        var message = {
          'points': req.body.text,
          'userName': req.body.user_name  + numVotes.toString(),
          'channel': req.body.channel_name,
          'votingComplete':votingComplete,
          'chart':chart
        }

        io.sockets.emit('message', message)
        res.send(msg)

    })



}//controller

module.exports = slackController
