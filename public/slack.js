$(document).ready(function(){

      //instatntiate socket.io
      var socket = io();

    //   var backgroundColorSet = [
    //   'rgba(255, 99, 132, 0.2)',
    //   'rgba(54, 162, 235, 0.2)'
    //  ]
     //
    //  var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
    //  var citrus = backgroundColorSet.slice(0, 1)
     //
    //  console.log(citrus)



      //render voting messages onto screen
      socket.on("message", function(message) {
          //append voting msg to page
          var p = $('<p />')
          p.append(message.userName + ' | ' + message.points)
          $('div#'+message.uuid).append(p)

          $( "#myChart" ).remove()
          var canvas = $("<canvas />")
          canvas.attr('id','myChart')
          canvas.attr('width',500)
          canvas.attr('height',500)
          $('#main').append(canvas)

          var ctx = $('#myChart')
          var myChart = new Chart(ctx, message.chart)

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

        //   var ctx = $('#myChart')
        //   var myChart = new Chart(ctx,
        //
        //   {
        //      "type":"bar",
        //      "data":{
        //         "labels":[
        //            "katyratkinson1",
        //            "katyratkinson0"
        //         ],
        //         "datasets":[
        //            {
        //               "label":"# of Votes",
        //               "data":[
        //                  "3",
        //                  "4"
        //               ],
        //               "backgroundColor":[
        //
        //                     "rgba(255, 99, 132, 0.2)",
        //                     "rgba(54, 162, 235, 0.2)",
        //                     "rgba(255, 206, 86, 0.2)",
        //                     "rgba(75, 192, 192, 0.2)",
        //                     "rgba(153, 102, 255, 0.2)",
        //                     "rgba(255, 159, 64, 0.2)"
        //
        //               ],
        //               "borderColor":[
        //
        //                     "rgba(255,99,132,1)",
        //                     "rgba(54, 162, 235, 1)",
        //                     "rgba(255, 206, 86, 1)",
        //                     "rgba(75, 192, 192, 1)",
        //                     "rgba(153, 102, 255, 1)",
        //                     "rgba(255, 159, 64, 1)"
        //
        //               ],
        //               "borderWidth":1
        //            }
        //         ]
        //      },
        //      "options":{
        //         "responsive":false,
        //         "scales":{
        //            "yAxes":[
        //               {
        //                  "ticks":{
        //                     "beginAtZero":true
        //                  }
        //               }
        //            ]
        //         }
        //      }
        //   }
        // )//chart

          // location.reload();
        }
      });

      return false;

  });



});
