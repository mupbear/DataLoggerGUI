/*
To do:
- change specific time to current time
- check frontend config, match with backend config
- average is in seconds!
*/
var windowTime = 5; //window in minutes


var graphData = [  
  {
    "value": "empty",
    "label": "None Selected",
    "data": 	{
      "datasets": 	[]
          }
   },
  {
    "value": "pressure",
    "label": "Pressure (Bar)",
    "average": 1,
    "data": 	{
      "datasets": 	[
              {
          "value": "OILP",
          "label": "OILP",
          "data": 		[]
               }
              ]
          }
  },
  {
    "value": "voltage",
    "label": "Voltage (V)",
    "average": 1,
    "data": 	{
      "datasets": 	[
               {
          "value": "AIN3",
          "label": "AIN3",
          "data": 		[]
               }
              ]
          }
  },
  {
    "value": "temperature",
    "label": "Temperature (C)",
    "average": 1,
    "data": 	{
      "datasets": 	[
              {
          "value": "OILT",
          "label": "OILT",
          "data": 		[]
              },
               {
          "value": "CLT",
          "label": "CLT",
          "data": 		[]
               },
               {
          "value": "DIFFT",
          "label": "DIFFT",
          "data": 		[]
               }
              ]
          }
  }
 ]
 
let event_source = null;

function averageData(dataValue, average){
  const averagePerInterval = [];
  let sum = 0;
  let count = 0;
  let currentInterval = Math.floor(new Date(dataValue[0].x).getTime() / 1000); // Initial interval

  for (const item of dataValue) {
    const timestampInSeconds = Math.floor(new Date(item.x).getTime() / 1000);
    
    if (timestampInSeconds - currentInterval < average) {
      sum += item.y;
      count++;
    } else {
      // Calculate average for the previous interval
      if (count > 0) {
        averagePerInterval.push({
          x: new Date(currentInterval * 1000).toISOString(),
          y: sum / count,
        });
      }

      // Reset sum and count for the new interval
      sum = item.y;
      count = 1;
      currentInterval = timestampInSeconds;
    }
  }

  // Calculate average for the last interval (if any data)
  if (count > 0) {
    averagePerInterval.push({
      x: new Date(currentInterval * 1000).toISOString(),
      y: sum / count,
    });
  }

  return averagePerInterval;
}
//T = -40 * V + 200
function combData(newData) {

  const currentTime = new Date();
  //const specificTime = new Date('2023-05-13T10:10:00.000000');
  const window = new Date(currentTime.getTime() - windowTime * 60 * 1000); // Five minutes ago as a Date object
  var dataValue;

  for (var i = 0; i < graphData.length; i++){
    var entry = graphData[i];
    try {
      var trialData = JSON.parse(newData);
      //processData(trialData);
    } catch (error) {
      console.error('Error parsing event data:', error);
    }
  
      for (var j = 0; j < entry.data.datasets.length; j++){
        var dataset = entry.data.datasets[j];
        var datasetValue = dataset.value;

        entry.data.datasets[j].data = entry.data.datasets[j].data.filter((data) => {
          const dataTimestamp = new Date(data.x);
          return dataTimestamp >= window;
        });
        
        if (trialData.hasOwnProperty(datasetValue)) {
          if(datasetValue == "AIN3")
          {

          }
          dataValue = trialData[datasetValue];
          dataValue = averageData(dataValue, entry.average);
          entry.data.datasets[j].data.push(...dataValue);
          
      }

      for (var c = 0; c < myChart.data.datasets.length; c++){
        myChart.data.datasets[c].data = myChart.data.datasets[c].data.filter((data) => {
          const dataTimestamp = new Date(data.x);
          return dataTimestamp >= window;
        });
        
        if (datasetValue === myChart.data.datasets[c].value && trialData.hasOwnProperty(datasetValue)) {
          console.log(dataValue);
          myChart.data.datasets[c].data.push(...dataValue); 
      }
    
  }
        
       
    }
  }
}

function StartRetrievingData()
{    
  console.log("Retrieving Data...");
  event_source = new EventSource('event_data');
  event_source.onmessage = (event) => {
    console.log(event.data);
    combData(event.data);
    myChart.update();
  };

  event_source.onerror = (err) => {
    console.error("EventSource failed:", err);
  };
}

function StopRetrievingData()
{
  event_source.close();
  event_source = null;
}

var dark = false;

 

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
  mode: 'x',
},
scales: {
  x: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
    position: 'top',
    type: 'time',
    time: {
      unit: 'second',
      displayFormats: {
      hour:'HH:mm:ss',
      'second': 'HH:mm:ss',
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
  mode: 'x',
},
scales: {
  x: {
    ticks: {color: 'white'},
    grid: {color: 'white'},
    position: 'top',
    type: 'time',
    time: {
      unit: 'second',
      displayFormats: {
      hour:'HH:mm:ss',
      'second': 'HH:mm:ss',
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
  console.log(selectID);
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
          myButton.onclick = function() {
            toggleData(divID.id, myButton.id, value);
          };

          myChart.data.datasets.push(newDataset);
          //console.log(myChart.data.datasets.length-1);
          /*
          if(newDataset.value === "CLT" || newDataset.value === "OILT"){
            displayMostRecentData(newDataset);
          }
          */
        }); 
           
        //document.getElementById('0').innerText = myChart.data.datasets[0].label;
       
        if(dark === false){myChart.options = chartOptions;} else{myChart.options = chartOptionsDark;}
          // Deselect all datasets
          myChart.data.datasets.forEach(function(dataset) {
              dataset.hidden = true;
          });
          myChart.update();
          console.log(myChart.data);
      }
}

};

function displayMostRecentData(newDataset) {
var mostRecent = newDataset.data[newDataset.data.length-1];

const y = mostRecent.y;
var x = mostRecent.x;
console.log(x);
    x = formatDate(x);
    
if(newDataset.value === "OILT"){
  const displayElement = document.getElementById("dataOILT"); // assuming there's an HTML element with an ID "most-recent-data"
  displayElement.innerHTML = `Time: ${x}, Value: ${y}`; // display the data in the element
}
if(newDataset.value === "CLT"){
  const displayElement = document.getElementById("dataCLT"); // assuming there's an HTML element with an ID "most-recent-data"
  displayElement.innerHTML = `Time: ${x}, Value: ${y}`; // display the data in the element
}

}

function formatDate(dateTimeStr) {
const date = new Date(dateTimeStr);
console.log(date);
const hours = String(date.getUTCHours()).padStart(2, '0');
const minutes = String(date.getUTCMinutes()).padStart(2, '0');
const seconds = String(date.getUTCSeconds()).padStart(2, '0');
const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}


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
