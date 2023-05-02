var dark = false;

var graphData = [  
  {    "value": "Empty",    "label": "None Selected"},
  {
   "value": "percentage",
   "label": "Percentage (%)",
   "data": 	{
     "datasets": 	[
             {
         "value": "TPS",
         "label": "TPS",
         "data": 		[
           {"x": "2022-01-01T00:00:00Z", "y": 20},
           {"x": "2022-01-01T01:00:00Z", "y": 20},
           {"x": "2022-01-01T02:00:00Z", "y": 35},
           {"x": "2022-01-01T03:00:00Z", "y": 45},
           {"x": "2022-01-01T04:00:00Z", "y": 40},
           {"x": "2022-01-01T05:00:00Z", "y": 30},
           {"x": "2022-01-01T06:00:00Z", "y": 40},
           {"x": "2022-01-01T07:00:00Z", "y": 50},
           {"x": "2022-01-01T08:00:00Z", "y": 60},
           {"x": "2022-01-01T09:00:00Z", "y": 40},
           {"x": "2022-01-01T10:00:00Z", "y": 30},
           {"x": "2022-01-01T11:00:00Z", "y": 35},
           {"x": "2022-01-01T12:00:00Z", "y": 25},
           {"x": "2022-01-01T13:00:00Z", "y": 20},
           {"x": "2022-01-01T14:00:00Z", "y": 35},
           {"x": "2022-01-01T15:00:00Z", "y": 40},
           {"x": "2022-01-01T16:00:00Z", "y": 50},
           {"x": "2022-01-01T17:00:00Z", "y": 55},
           {"x": "2022-01-01T18:00:00Z", "y": 45},
           {"x": "2022-01-01T19:00:00Z", "y": 30},
           {"x": "2022-01-01T20:00:00Z", "y": 35},
           {"x": "2022-01-01T21:00:00Z", "y": 40},
           {"x": "2022-01-01T22:00:00Z", "y": 45},
           {"x": "2022-01-01T23:00:00Z", "y": 55},
           {"x": "2022-01-01T24:00:00Z", "y": 50},
           {"x": "2022-01-01T25:00:00Z", "y": 60},
           {"x": "2022-01-01T26:00:00Z", "y": 70},
           {"x": "2022-01-01T27:00:00Z", "y": 80},
           {"x": "2022-01-01T28:00:00Z", "y": 60},
           {"x": "2022-01-01T29:00:00Z", "y": 40},
           {"x": "2022-01-01T30:00:00Z", "y": 30},
           {"x": "2022-01-01T31:00:00Z", "y": 35},
           {"x": "2022-01-01T32:00:00Z", "y": 25},
           {"x": "2022-01-01T33:00:00Z", "y": 20},
           {"x": "2022-01-01T34:00:00Z", "y": 15},
           {"x": "2022-01-01T35:00:00Z", "y": 10},
           {"x": "2022-01-01T36:00:00Z", "y": 20},
           {"x": "2022-01-01T37:00:00Z", "y": 25},
           {"x": "2022-01-01T38:00:00Z", "y": 35},
           {"x": "2022-01-01T39:00:00Z", "y": 30},
           {"x": "2022-01-01T40:00:00Z", "y": 45},
           {"x": "2022-01-01T41:00:00Z", "y": 40},
           {"x": "2022-01-01T42:00:00Z", "y": 55},
           {"x": "2022-01-01T43:00:00Z", "y": 65},
           {"x": "2022-01-01T44:00:00Z", "y": 70},
           {"x": "2022-01-01T45:00:00Z", "y": 70},
           {"x": "2022-01-01T46:00:00Z", "y": 80},
           {"x": "2022-01-01T47:00:00Z", "y": 50},
           {"x": "2022-01-01T48:00:00Z", "y": 40},
           {"x": "2022-01-01T49:00:00Z", "y": 30},
           {"x": "2022-01-01T50:00:00Z", "y": 10}
 
       ]
                 }
             ]
         }
 },
   {
     "value": "temperature",
     "label": "Temperature (C)",
     "data": 	{
       "datasets": 	[
               {
           "value": "OILT",
           "label": "OILT",
           "data": 		[
             {"x": "2022-01-01T01:00:00Z", "y": 60},
             {"x": "2022-01-01T02:00:00Z", "y": 55},
             {"x": "2022-01-01T03:00:00Z", "y": 65},
             {"x": "2022-01-01T04:00:00Z", "y": 70},
             {"x": "2022-01-01T05:00:00Z", "y": 80},
             {"x": "2022-01-01T06:00:00Z", "y": 90},
             {"x": "2022-01-01T07:00:00Z", "y": 70},
             {"x": "2022-01-01T08:00:00Z", "y": 60},
             {"x": "2022-01-01T09:00:00Z", "y": 50},
             {"x": "2022-01-01T10:00:00Z", "y": 40},
             {"x": "2022-01-01T11:00:00Z", "y": 55},
             {"x": "2022-01-01T12:00:00Z", "y": 45},
             {"x": "2022-01-01T13:00:00Z", "y": 60},
             {"x": "2022-01-01T14:00:00Z", "y": 75},
             {"x": "2022-01-01T15:00:00Z", "y": 80},
             {"x": "2022-01-01T16:00:00Z", "y": 70},
             {"x": "2022-01-01T17:00:00Z", "y": 65},
             {"x": "2022-01-01T18:00:00Z", "y": 55},
             {"x": "2022-01-01T19:00:00Z", "y": 50},
             {"x": "2022-01-01T20:00:00Z", "y": 45},
             {"x": "2022-01-01T21:00:00Z", "y": 60},
             {"x": "2022-01-01T22:00:00Z", "y": 55},
             {"x": "2022-01-01T23:00:00Z", "y": 65},
             {"x": "2022-01-01T24:00:00Z", "y": 70},
             {"x": "2022-01-01T25:00:00Z", "y": 80},
             {"x": "2022-01-01T26:00:00Z", "y": 90},
             {"x": "2022-01-01T27:00:00Z", "y": 70},
             {"x": "2022-01-01T28:00:00Z", "y": 60},
             {"x": "2022-01-01T29:00:00Z", "y": 50},
             {"x": "2022-01-01T30:00:00Z", "y": 40},
             {"x": "2022-01-01T31:00:00Z", "y": 55},
             {"x": "2022-01-01T32:00:00Z", "y": 45},
             {"x": "2022-01-01T33:00:00Z", "y": 60},
             {"x": "2022-01-01T34:00:00Z", "y": 75},
             {"x": "2022-01-01T35:00:00Z", "y": 80},
             {"x": "2022-01-01T36:00:00Z", "y": 70},
             {"x": "2022-01-01T37:00:00Z", "y": 65},
             {"x": "2022-01-01T38:00:00Z", "y": 55},
             {"x": "2022-01-01T39:00:00Z", "y": 50},
             {"x": "2022-01-01T40:00:00Z", "y": 45},
             {"x": "2022-01-01T41:00:00Z", "y": 60},
             {"x": "2022-01-01T42:00:00Z", "y": 55},
             {"x": "2022-01-01T43:00:00Z", "y": 65},
             {"x": "2022-01-01T44:00:00Z", "y": 70},
             {"x": "2022-01-01T45:00:00Z", "y": 80},
             {"x": "2022-01-01T46:00:00Z", "y": 90},
             {"x": "2022-01-01T47:00:00Z", "y": 70},
             {"x": "2022-01-01T48:00:00Z", "y": 60},
             {"x": "2022-01-01T49:00:00Z", "y": 50},
             {"x": "2022-01-01T50:00:00Z", "y": 40},
             {"x": "2022-01-01T51:00:00Z", "y": 55},
             {"x": "2022-01-01T52:00:00Z", "y": 45},
             {"x": "2022-01-01T53:00:00Z", "y": 60},
             {"x": "2022-01-01T54:00:00Z", "y": 75},
             {"x": "2022-01-01T55:00:00Z", "y": 80},
             {"x": "2022-01-01T56:00:00Z", "y": 70},
             {"x": "2022-01-01T57:00:00Z", "y": 65},
             {"x": "2022-01-01T58:00:00Z", "y": 55},
             {"x": "2022-01-01T59:00:00Z", "y": 50},
             {"x": "2022-01-01T60:00:00Z", "y": 45},
             {"x": "2022-01-01T61:00:00Z", "y": 60},
             {"x": "2022-01-01T62:00:00Z", "y": 55},
             {"x": "2022-01-01T63:00:00Z", "y": 65},
             {"x": "2022-01-01T64:00:00Z", "y": 70},
             {"x": "2022-01-01T65:00:00Z", "y": 80},
             {"x": "2022-01-01T66:00:00Z", "y": 90},
             {"x": "2022-01-01T67:00:00Z", "y": 70},
             {"x": "2022-01-01T68:00:00Z", "y": 60},
             {"x": "2022-01-01T69:00:00Z", "y": 50},
             {"x": "2022-01-01T70:00:00Z", "y": 40},
             {"x": "2022-01-01T71:00:00Z", "y": 55},
             {"x": "2022-01-01T72:00:00Z", "y": 45},
             {"x": "2022-01-01T73:00:00Z", "y": 60},
             {"x": "2022-01-01T74:00:00Z", "y": 75},
             {"x": "2022-01-01T75:00:00Z", "y": 80},
             {"x": "2022-01-01T76:00:00Z", "y": 70},
             {"x": "2022-01-01T77:00:00Z", "y": 65},
             {"x": "2022-01-01T78:00:00Z", "y": 55},
             {"x": "2022-01-01T79:00:00Z", "y": 50},
             {"x": "2022-01-01T80:00:00Z", "y": 45},
             {"x": "2022-01-01T81:00:00Z", "y": 60},
             {"x": "2022-01-01T82:00:00Z", "y": 55},
             {"x": "2022-01-01T83:00:00Z", "y": 65},
             {"x": "2022-01-01T84:00:00Z", "y": 70},
             {"x": "2022-01-01T85:00:00Z", "y": 80},
             {"x": "2022-01-01T86:00:00Z", "y": 90},
             {"x": "2022-01-01T87:00:00Z", "y": 70},
             {"x": "2022-01-01T88:00:00Z", "y": 60},
             {"x": "2022-01-01T89:00:00Z", "y": 50},
             {"x": "2022-01-01T90:00:00Z", "y": 40},
             {"x": "2022-01-01T91:00:00Z", "y": 55},
             {"x": "2022-01-01T92:00:00Z", "y": 45},
             {"x": "2022-01-01T93:00:00Z", "y": 60},
             {"x": "2022-01-01T94:00:00Z", "y": 75},
             {"x": "2022-01-01T95:00:00Z", "y": 80},
             {"x": "2022-01-01T96:00:00Z", "y": 70},
             {"x": "2022-01-01T97:00:00Z", "y": 65},
             {"x": "2022-01-01T98:00:00Z", "y": 55},
             {"x": "2022-01-01T99:00:00Z", "y": 50},
             {"x": "2022-01-01T100:00:00Z", "y": 45}
         ]
                   },
         {
           "value": "CLT",
           "label": "CLT",
           "data": 		[
             {"x": "2022-01-01T01:00:00Z", "y": 50},
             {"x": "2022-01-01T02:30:00Z", "y": 55},
             {"x": "2022-01-01T03:30:00Z", "y": 55},
             {"x": "2022-01-01T04:30:00Z", "y": 60},
             {"x": "2022-01-01T05:30:00Z", "y": 70},
             {"x": "2022-01-01T06:30:00Z", "y": 80},
             {"x": "2022-01-01T07:00:00Z", "y": 60},
             {"x": "2022-01-01T08:00:00Z", "y": 55},
             {"x": "2022-01-01T09:00:00Z", "y": 45},
             {"x": "2022-01-01T10:00:00Z", "y": 40},
             {"x": "2022-01-01T11:00:00Z", "y": 45},
             {"x": "2022-01-01T12:00:00Z", "y": 60},
             {"x": "2022-01-01T13:00:00Z", "y": 65},
             {"x": "2022-01-01T14:00:00Z", "y": 80},
             {"x": "2022-01-01T15:00:00Z", "y": 85},
             {"x": "2022-01-01T16:00:00Z", "y": 80},
             {"x": "2022-01-01T17:00:00Z", "y": 65},
             {"x": "2022-01-01T18:00:00Z", "y": 55},
             {"x": "2022-01-01T19:00:00Z", "y": 40},
             {"x": "2022-01-01T20:00:00Z", "y": 35},
             {"x": "2022-01-01T21:00:00Z", "y": 40},
             {"x": "2022-01-01T22:00:00Z", "y": 55},
             {"x": "2022-01-01T23:00:00Z", "y": 65},
             {"x": "2022-01-01T24:00:00Z", "y": 70},
             {"x": "2022-01-01T25:00:00Z", "y": 75},
             {"x": "2022-01-01T26:00:00Z", "y": 80},
             {"x": "2022-01-01T27:00:00Z", "y": 75},
             {"x": "2022-01-01T28:00:00Z", "y": 65},
             {"x": "2022-01-01T29:00:00Z", "y": 55},
             {"x": "2022-01-01T30:00:00Z", "y": 45},
             {"x": "2022-01-01T31:00:00Z", "y": 50},
             {"x": "2022-01-01T32:00:00Z", "y": 40},
             {"x": "2022-01-01T33:00:00Z", "y": 65},
             {"x": "2022-01-01T34:00:00Z", "y": 75},
             {"x": "2022-01-01T35:00:00Z", "y": 85},
             {"x": "2022-01-01T36:00:00Z", "y": 75},
             {"x": "2022-01-01T37:00:00Z", "y": 60},
             {"x": "2022-01-01T38:00:00Z", "y": 50},
             {"x": "2022-01-01T39:00:00Z", "y": 55},
             {"x": "2022-01-01T40:00:00Z", "y": 40},
             {"x": "2022-01-01T41:00:00Z", "y": 65},
             {"x": "2022-01-01T42:00:00Z", "y": 50},
             {"x": "2022-01-01T43:00:00Z", "y": 60},
             {"x": "2022-01-01T44:00:00Z", "y": 75},
             {"x": "2022-01-01T45:00:00Z", "y": 85},
             {"x": "2022-01-01T46:00:00Z", "y": 95},
             {"x": "2022-01-01T47:00:00Z", "y": 75},
             {"x": "2022-01-01T48:00:00Z", "y": 65},
             {"x": "2022-01-01T49:00:00Z", "y": 55},
             {"x": "2022-01-01T50:00:00Z", "y": 45}
         ]
                   },
         {
           "value": "IAT",
           "label": "IAT",
           "data": 		[
                     {
               "x": "2022-01-01T100:00:00Z",
               "y": 45
           }
         ]
                   }
               ]
           }
   }
 ]
 
 function toggleData(divID, button, value){
  const visibilityData = myChart.isDatasetVisible(value);
  if(visibilityData === true){
    myChart.hide(value);
    document.querySelector(`#${divID} #${button}`).style.backgroundColor = 'black';
  }
  if(visibilityData === false){
    myChart.show(value);
    document.querySelector(`#${divID} #${button}`).style.backgroundColor = myChart.data.datasets[value].backgroundColor;
  }
}


var chartOptionsDark = {
  pointRadius: 0,
  interaction: {
    intersect: false,
    mode: 'nearest',
},
scales: {
  x: {
    ticks: {color: '#81C8BD'},
    grid: {color: '#81C8BD'},
    position: 'top',
    type: 'time',
time: {
unit: 'hour',
displayFormats: {
  hour:'HH:mm:ss.SSS',
},}
  },
  y1: {
    ticks: {color: '#81C8BD'},
    grid: {color: '#81C8BD'},
      stack: 'demo'
  },
  y2: {
    ticks: {color: '#81C8BD'},
    grid: {color: '#81C8BD'},
      stack: 'demo'
  },
  y3: {
    ticks: {color: '#81C8BD'},
    grid: {color: '#81C8BD'},
      stack: 'demo'
  },
  y4: {
    ticks: {color: '#81C8BD'},
    grid: {color: '#81C8BD'},
      stack: 'demo'
  },
},
    maintainAspectRatio: false, // disable aspect ratio
    plugins: {
      legend:{
        display: false,
        position: 'left',
        labels: {
          color: 'white'
        },
      },
    },
  
};

var chartOptions = {
  pointRadius: 0,
  interaction: {
    intersect: false,
    mode: 'nearest',
},
scales: {
  x: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
    position: 'top',
    type: 'time',
time: {
unit: 'hour',
displayFormats: {
  hour:'HH:mm:ss.SSS',
},}
  },
  y1: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
      stack: 'demo'
  },
  y2: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
      stack: 'demo'
  },
  y3: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
      stack: 'demo'
  },
  y4: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
      stack: 'demo'
  },
},
    maintainAspectRatio: false, // disable aspect ratio
    plugins: {
      legend:{
        display: false,
        position: 'left',
        labels: {
          color: 'white'
        },
      },
    },
  
};

var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
      type: 'line',
      options: chartOptions

    });


    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    

function checkID(selectID){
  if(selectID === 'y1'){return document.getElementById("y1Legend");}
  if(selectID === 'y2'){return document.getElementById("y2Legend");}
  if(selectID === 'y3'){return document.getElementById("y3Legend");}
  if(selectID === 'y4'){return document.getElementById("y4Legend");}
}

function updateGraph(selectID) {
    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var divID = checkID(selectID);
    var buttonCount = 0;


    if(selectedValue === 'Empty'){
    myChart.data.datasets = myChart.data.datasets.filter(dataset => {
      return dataset.yAxisID !== selectID;
    });
    
      while (divID.firstChild) {
        divID.removeChild(divID.firstChild);
      }
    
    myChart.update();
  }else{

   
    
      while (divID.firstChild) {
        divID.removeChild(divID.firstChild);
      }
    
    

    myChart.data.datasets = myChart.data.datasets.filter(dataset => {
      return dataset.yAxisID !== selectID;
    });
    
    
        var selectedData = graphData.find(function(item) {
            return item.value === selectedValue;
        });
        
        if (selectedData) {
            
          selectedData.data.datasets.forEach(function(dataset) {
            var color = getRandomColor();
            var newDataset = Object.assign({}, dataset); // Create a new object to avoid modifying the original
            newDataset.yAxisID = selectID;
            newDataset.backgroundColor = color;
            newDataset.borderColor = color;

            var myButton = document.createElement("button");
            myButton.id = "myButton" + buttonCount; // Add the current buttonCount to the ID
            buttonCount++; // Increment the buttonCount for the next button
            myButton.style.backgroundColor = 'black';
            myButton.style.color = 'white';
            
            myButton.innerHTML = newDataset.label;
            divID.appendChild(myButton);

            var value = myChart.data.datasets.length;
            console.log(divID.id);
            myButton.onclick = function() {
              toggleData(divID.id, myButton.id, value);
            };

            myChart.data.datasets.push(newDataset);
            //console.log(myChart.data.datasets.length-1);

            var mostRecent = newDataset.data[newDataset.data.length-1];
            console.log(mostRecent);
            
          }); 
             
          //document.getElementById('0').innerText = myChart.data.datasets[0].label;
         
          if(dark === false){myChart.options = chartOptions;} else{myChart.options = chartOptionsDark;}
            // Deselect all datasets
            myChart.data.datasets.forEach(function(dataset) {
                dataset.hidden = true;
            });
            console.log(myChart.data);
            myChart.update();
        }
  }

};


    // Loop through each option and add it to the dropdown menu
    $.each(graphData, function(index, option) {
        $('#y1').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(graphData, function(index, option) {
        $('#y2').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(graphData, function(index, option) {
        $('#y3').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(graphData, function(index, option) {
        $('#y4').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });

const checkbox = document.getElementById('dark-mode-checkbox');
const body = document.body;

checkbox.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
    chartDiv.classList.add('dataGraph-dark');

    dark = true;
    myChart.options = chartOptionsDark;
    myChart.update();
  } else {
    body.classList.remove('dark-mode');
    chartDiv.classList.remove('dataGraph-dark');

    dark = false;
    myChart.options = chartOptions;
    myChart.update();
  }
});





/*
document.getElementById('0').style.backgroundColor = 'black';
document.getElementById('0').innerText = myChart.data.datasets[0].label;

document.getElementById('1').style.backgroundColor = 'black';
document.getElementById('1').innerText = myChart.data.datasets[1].label;

document.getElementById('2').style.backgroundColor = 'black';
document.getElementById('2').innerText = myChart.data.datasets[2].label;

document.getElementById('3').style.backgroundColor = 'black';
document.getElementById('3').innerText = myChart.data.datasets[3].label;

document.getElementById('4').style.backgroundColor = 'black';
document.getElementById('4').innerText = myChart.data.datasets[4].label;
*/