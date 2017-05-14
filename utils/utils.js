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

    var backgroundColorSet = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)'
    // 'rgba(255, 206, 86, 0.2)',
    // 'rgba(75, 192, 192, 0.2)',
    // 'rgba(153, 102, 255, 0.2)',
    // 'rgba(255, 159, 64, 0.2)'
   ]

    var borderColorSet = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)'
      // 'rgba(255, 206, 86, 1)',
      // 'rgba(75, 192, 192, 1)',
      // 'rgba(153, 102, 255, 1)',
      // 'rgba(255, 159, 64, 1)'
    ]

    console.log('colorsNeeded= ' + colorsNeeded)

    if (colorsNeeded <= backgroundColors.length){
      return {'backgroundColors':backgroundColorSet,'borderColors':borderColorSet}
    }

    // if (totalColors > backgroundColors.length){
    //
    //     var colorsNeeded = totalColors - backgroundColors.length
    //
    //     if (colorsNeeded < backgroundColors.length){
    //         backgroundColors.push(backgroundColors.slice(0, colorsNeeded - 1))
    //         borderColors.push(borderColors.slice(0, colorsNeeded - 1))
    //     }else{
    //         var backgroundColors2 = []
    //         var i = 0
    //
    //         backgroundColors2.push(backgroundColors)
    //
    //         while (backgroundColors2.length < totalColors) {
    //
    //               if(backgroundColors.length == i){
    //                 i=0
    //               }
    //               backgroundColors2.push(backgroundColors[i])
    //               i++
    //         }
    //
    //     }
    //
    // }
    //
    //
    //
    // return {'backgroundColors':backgroundColors,'borderColors':borderColors}
}


var buildChart = function(labels,points){

    var colors = generateColors(labels.length)

    console.log(colors.borderColors)

    var json = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
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

    console.log('json: ' + JSON.stringify(json))

    return json
}//function




module.exports = {
  'generateUUID':generateUUID,
  'buildChart':buildChart
}
