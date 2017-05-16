$(document).ready(function(){

      //instatntiate socket.io
      var socket = io();


      //render voting messages onto screen
      socket.on("message", function(message) {
          //append voting msg to page
          var p = $('<p />')
          p.append(message.userName + ' | ' + message.points)
          $('div#'+message.uuid).append(p)

          $( "#myChart" ).remove()
          var canvas = $("<canvas />")
          canvas.attr('id','pointingChart')
          canvas.attr('width',600)
          canvas.attr('height',500)
          $('#main').append(canvas)

          var ctx = $('#pointingChart')
          var pointingChart = new Chart(ctx, message.chart)

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
          var h3 = $('<h3 />')

          div.attr('id',uuid)
          h3.append(taskName)
          div.append(h3)
          $('#main').append(div)

          // location.reload();
        }
      });

      return false;

  });



});
