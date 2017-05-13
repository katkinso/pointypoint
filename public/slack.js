$(document).ready(function(){

    //instatntiate socket.io
    var socket = io();

    //render voting messages onto screen
    socket.on("message", function(message) {

      var p = $('<p />')
      p.append(message.userName + ' | ' + message.points)
      $('div#'+message.uuid).append(p)

      console.log("message: ", message)
    });


  $('form#addTask').on('submit', function(){

      var taskName = $('#task_name').val()
      var numPeople = $('#num_people').val()
      var uuid = generateUUID()


      $.ajax({
        type: 'POST',
        url: '/',
        data: {'task_name':taskName,'num_people':numPeople,'uuid':uuid},
        success: function(data){
          //do something with the data via front-end framework
          var div = $('<div />')
          var h3 = $('<h3>')

          div.attr('id',uuid)
          h3.append(taskName)
          div.append(h3)
          $('#main').append(div)


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
