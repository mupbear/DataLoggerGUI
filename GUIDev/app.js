var dark = false;

const data = {
  datasets: [
    {
      label: 'Y1',
      data: [{"x": "2022-01-01T01:00:00Z", "y": 30},
      {"x": "2022-01-01T02:00:00Z", "y": 45},
      {"x": "2022-01-01T03:00:00Z", "y": 55},
      {"x": "2022-01-01T04:00:00Z", "y": 50},
      {"x": "2022-01-01T05:00:00Z", "y": 60},
      {"x": "2022-01-01T06:00:00Z", "y": 65},
      {"x": "2022-01-01T07:00:00Z", "y": 70},
      {"x": "2022-01-01T08:00:00Z", "y": 60},
      {"x": "2022-01-01T09:00:00Z", "y": 50},
      {"x": "2022-01-01T10:00:00Z", "y": 55}],
      hidden: true, // this dataset is hidden by default
      
      yAxisID: 'y1'
    },
    {
      label: 'Y2',
      data: [{"x": "2022-01-01T01:00:00Z", "y": 30},
      {"x": "2022-01-01T02:00:00Z", "y": 45},
      {"x": "2022-01-01T03:00:00Z", "y": 55},
      {"x": "2022-01-01T04:00:00Z", "y": 50},
      {"x": "2022-01-01T05:00:00Z", "y": 60},
      {"x": "2022-01-01T06:00:00Z", "y": 65},
      {"x": "2022-01-01T07:00:00Z", "y": 70},
      {"x": "2022-01-01T08:00:00Z", "y": 60},
      {"x": "2022-01-01T09:00:00Z", "y": 50},
      {"x": "2022-01-01T10:00:00Z", "y": 55}],
      hidden: true, // this dataset is hidden by default
      
      yAxisID: 'y2'
    },
    {
      label: 'Y3',
      data: [{"x": "2022-01-01T01:00:00Z", "y": 30},
      {"x": "2022-01-01T02:00:00Z", "y": 45},
      {"x": "2022-01-01T03:00:00Z", "y": 55},
      {"x": "2022-01-01T04:00:00Z", "y": 50},
      {"x": "2022-01-01T05:00:00Z", "y": 60},
      {"x": "2022-01-01T06:00:00Z", "y": 65},
      {"x": "2022-01-01T07:00:00Z", "y": 70},
      {"x": "2022-01-01T08:00:00Z", "y": 60},
      {"x": "2022-01-01T09:00:00Z", "y": 50},
      {"x": "2022-01-01T10:00:00Z", "y": 55}],
      hidden: true, // this dataset is hidden by default
      
      yAxisID: 'y3'
    },
    {
      label: 'Y4',
      data: [{"x": "2022-01-01T01:00:00Z", "y": 20},
      {"x": "2022-01-01T02:00:00Z", "y": 35},
      {"x": "2022-01-01T03:00:00Z", "y": 45},
      {"x": "2022-01-01T04:00:00Z", "y": 40},
      {"x": "2022-01-01T05:00:00Z", "y": 30},
      {"x": "2022-01-01T06:00:00Z", "y": 40},
      {"x": "2022-01-01T07:00:00Z", "y": 50},
      {"x": "2022-01-01T08:00:00Z", "y": 60},
      {"x": "2022-01-01T09:00:00Z", "y": 40},
      {"x": "2022-01-01T10:00:00Z", "y": 30}],
      hidden: true, // this dataset is hidden by default
      
      yAxisID: 'y4'
    },
    {
      label: 'Y4',
      data: [{"x": "2022-01-01T01:00:00Z", "y": 20},
      {"x": "2022-01-01T02:00:00Z", "y": 35},
      {"x": "2022-01-01T03:00:00Z", "y": 45},
      {"x": "2022-01-01T04:30:00Z", "y": 40},
      {"x": "2022-01-01T05:30:00Z", "y": 30},
      {"x": "2022-01-01T06:30:00Z", "y": 40},
      {"x": "2022-01-01T07:30:00Z", "y": 50},
      {"x": "2022-01-01T08:30:00Z", "y": 60},
      {"x": "2022-01-01T09:00:00Z", "y": 40},
      {"x": "2022-01-01T10:00:00Z", "y": 30}],
      hidden: true, // this dataset is hidden by default
      
      yAxisID: 'y4'
    },
  ]
};

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
        labels: {
          color: 'white'
        },
      },
    },
  
};

var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: chartOptions

    });


function updateGraph(chartName, selectID) {
    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    $.getJSON('data/fake-data.json', function(data) {
        var selectedData = data.find(function(item) {
            return item.value === selectedValue;
        });

        if (selectedData) {

            chartName.data = selectedData.data;
          if(dark === false){chartName.options = chartOptions;} else{chartName.options = chartOptionsDark;}
            // Deselect all datasets
            chartName.data.datasets.forEach(function(dataset) {
                dataset.hidden = true;
            });
            chartName.update();
        }
    })
};

// Load JSON file
$.getJSON('data/fake-data.json', function(data) {
    // Loop through each option and add it to the dropdown menu
    $.each(data, function(index, option) {
        $('#select-chart').append($('<option>', {
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