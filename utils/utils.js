// var utilTest = function(){
//   return 'this is from util'
// }

//generate a random id for thread
var generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


function generateColors(colorsNeeded){

    var availBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
   ]

    var availBorderColors = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ]

    bgColors = []
    borderColors = []
    ii = 0

    //iterate though available colors and add colors if needed
    for (let i = 0; i < colorsNeeded; i++){

          if (ii == availBackgroundColors.length){ ii=0 }

          bgColors.push(availBackgroundColors[ii])
          borderColors.push(availBorderColors[ii])
          ii++
    }

    return {'backgroundColors':bgColors,'borderColors':borderColors}
}


var buildChart = function(labels,points){

    //generate colors for graph
    var colors = generateColors(labels.length)

    //build chart
    var json = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Points',
                data: points,
                backgroundColor: colors.backgroundColors,
                borderColor: colors.borderColors,
                borderWidth: 1
            }]
        },
        options: {
           responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }

    return json
}//function




module.exports = {
  'generateUUID':generateUUID,
  'buildChart':buildChart
}
