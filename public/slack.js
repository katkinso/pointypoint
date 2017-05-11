$(document).ready(function(){


  var socket = io();
// socket.on('point', function(data){document.write(data.point)});
// socket.on("foo", function(message) { console.log("foo: ", message) });

    socket.on("message", function(message) {

      console.log("message: ", message)
      $('#messages').append(message.uuid + ' | ' + message.userName + ' | ' + message.points + ' | ' + message.voting_complete)
      $('#messages').append('<br />')
    });


  $('form#addTask').on('submit', function(){

      var taskName = $('#task_name').val()
      var numPeople = $('#num_people').val()
      console.log('front: = ' + numPeople)


      $.ajax({
        type: 'POST',
        url: '/',
        data: {'task_name':taskName,'num_people':numPeople},
        success: function(data){
          //do something with the data via front-end framework
          var h3 = $('<h3>')

          $('#messages').append(h3)
          h3.append(taskName)

          // location.reload();
        }
      });

      return false;

  });

  $('a.film-list').on('click', function(){
      var imdbId = $(this)[0].id
      console.log($(this))
      //select the film
      $('a.film-list').attr('class', 'list-group-item film-list')
      $(this).addClass('active')
  });

});
