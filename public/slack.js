$(document).ready(function(){

  //instatntiate socket.io
  var socket = io()


  //render voting messages onto screen
  socket.on("message", function(message) {
      //append voting msg to page
      var p = $('<p />')
      p.append(message.userName + ' | ' + message.points)
      $('div#chart').append(p)

      $( "#pointingChart").remove()
      var canvas = $("<canvas />")
      canvas.attr('id','pointingChart')
      canvas.attr('width',600)
      canvas.attr('height',500)
      $('#main').append(canvas)

      var ctx = $('#pointingChart')
      var pointingChart = new Chart(ctx, message.chart)

  });

  //add task
  $('form#addTask').on('submit', function(){

      if(checkForm()){
        clearPage()
        postToSlack()
      }
      return false;
  });


});

function clearPage(){
  $( "#pointingChart").remove()
  $( "div#chart").remove()
}
//check form
function checkForm(){

    var taskName = $('#task_name').val()
    var numPeople = $('#num_people').val()
    var msg = ''

    if (taskName === '' || numPeople === ''){
        msg+= '<div class="text-danger"><br>Please fill in both fields</div>'
        $('.form-group').addClass('has-error')
        $('form').append(msg)
        return false
    }

    return true
}

//post info to slack
function postToSlack(){

  var taskName = $('#task_name').val()
  var numPeople = $('#num_people').val()
  var uuid = generateUUID()


  $.ajax({
    type: 'POST',
    url: '/addtask',
    data: {'task_name':taskName,'num_people':numPeople,'uuid':uuid},
    success: function(data){
      var div = $('<div />')
      var h3 = $('<h3 />')
      div.attr('id','chart')
      h3.append(taskName)
      div.append(h3)
      $('#main').append(div)

      // location.reload();
    }
  });
}
