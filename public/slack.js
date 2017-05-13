$(document).ready(function(){

    //instatntiate socket.io
    var socket = io();

    //render voting messages onto screen
    socket.on("message", function(message) {

      $('<h3 />').attr('id',message.uuid)

      var div = $('<div />')
      $(div).attr('id',message.uuid)
      $(div).append(message.uuid + ' | ' + message.userName + ' | ' + message.points + ' | ' + message.voting_complete + '<br />')
      $('#main').append(div)

      console.log("message: ", message)
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
          $('#main').append(h3)
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
