$(document).ready(function(){

      //instatntiate socket.io
      var socket = io();




      //render voting messages onto screen
      socket.on("message", function(message) {
          //append voting msg to page
          var p = $('<p />')
          p.append(message.userName + ' | ' + message.points)
          $('div#'+message.uuid).append(p)
          var json = message.chart

          $( "#myChart" ).remove()
          var canvas = $("<canvas />")
          canvas.attr('id','myChart')
          canvas.attr('width',300)
          canvas.attr('height',300)
          $('#main').append(canvas)

          console.log(JSON.stringify(json))
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

          //Temp
          // var canvas = $("<canvas />")
          // canvas.attr('id','myChart')
          // canvas.attr('width',300)
          // canvas.attr('height',300)
          // $('#main').append(canvas)
          //
          // var ctx = $('#myChart')
          // var myChart = new Chart(ctx,
          //   {
          //     type: 'bar',
          //     data: {
          //       labels: ["katyratkinson1", "katyratkinson2"],
          //       datasets: [{
          //           label: '# of Votes',
          //           data: [12, 19],
          //           backgroundColor: [
          //               'rgba(255, 99, 132, 0.2)',
          //               'rgba(54, 162, 235, 0.2)'
          //           ],
          //           borderColor: [
          //               'rgba(255,99,132,1)',
          //               'rgba(54, 162, 235, 1)'
          //           ],
          //           borderWidth: 1
          //       }]
          //     },
          //     options: {
          //       scales: {
          //           yAxes: [{
          //               ticks: {
          //                   beginAtZero:true
          //               }
          //           }]
          //       }
          //     }
          //     }
          //
          // )


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
