var dark = false;


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
        display: true,
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
        display: true,
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


function updateGraph(selectID) {
    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    
    myChart.data.datasets = myChart.data.datasets.filter(dataset => {
      return dataset.yAxisID !== selectID;
    });


    var dataLength = myChart.data.datasets.length;

    

    $.getJSON('data/fake-data.json', function(data) {
        var selectedData = data.find(function(item) {
            return item.value === selectedValue;
        });

        if (selectedData) {
          
          for(var i = 0; i<selectedData.data.datasets.length; i++){
            myChart.data.datasets[dataLength+i] = selectedData.data.datasets[i];
            myChart.data.datasets[dataLength+i].yAxisID = selectID;
            document.getElementById('0').innerText = myChart.data.datasets[i].label;
          }
         // myChart.data.datasets[4] = selectedData.data.datasets[0];
         
          if(dark === false){myChart.options = chartOptions;} else{myChart.options = chartOptionsDark;}
            // Deselect all datasets
            myChart.data.datasets.forEach(function(dataset) {
                dataset.hidden = true;
            });
            myChart.update();
        }
    })
};

// Load JSON file
$.getJSON('data/fake-data.json', function(data) {
    // Loop through each option and add it to the dropdown menu
    $.each(data, function(index, option) {
        $('#y1').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(data, function(index, option) {
        $('#y2').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(data, function(index, option) {
        $('#y3').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(data, function(index, option) {
        $('#y4').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });    

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

function toggleData(value){
  const visibilityData = myChart.isDatasetVisible(value);
  if(visibilityData === true){
    myChart.hide(value);
    document.getElementById(value).style.backgroundColor = 'black';
  }
  if(visibilityData === false){
    myChart.show(value);
    document.getElementById(value).style.backgroundColor = myChart.data.datasets[value].backgroundColor;
  }
}




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