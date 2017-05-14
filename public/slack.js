$(document).ready(function(){

      //instatntiate socket.io
      var socket = io();
      $( "#myChart" ).remove()



      //render voting messages onto screen
      socket.on("message", function(message) {
          //append voting msg to page
          var p = $('<p />')
          p.append(message.userName + ' | ' + message.points)
          $('div#'+message.uuid).append(p)
          var json = message.chart


          var canvas = $("<canvas />")
          canvas.attr('id','myChart')
          canvas.attr('width',300)
          canvas.attr('height',300)
          $('#main').append(canvas)

          console.log(json)
          // var ctx = $('#'+message.uuid)
          var ctx = $('#myChart')
          var myChart = new Chart(ctx, json)


          // console.log(buildChart(labels,points))

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

          //add chart
          // var canvas = $("<canvas />")
          // canvas.attr('id',uuid)
          // canvas.attr('width',300)
          // canvas.attr('height',300)
          // $('#main').append(canvas)


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
