var dark = false;

const data = {
  datasets: [
    {
      label: 'Sales',
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
      borderWidth: 1,
      yAxisID: 'y1'
    },
    {
      label: 'Expenses',
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
      borderWidth: 1,
      yAxisID: 'y1'
    },
    {
      label: 'Profit',
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
      borderWidth: 1,
      yAxisID: 'y2'
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
},
    //maintainAspectRatio: false, // disable aspect ratio
    plugins: {
      legend:{
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
},
    //maintainAspectRatio: false, // disable aspect ratio
    plugins: {
      legend:{
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
    chartDiv.classList.add('chartBox-dark');

    dark = true;
    myChart.options = chartOptionsDark;
    myChart.update();
  } else {
    body.classList.remove('dark-mode');
    chartDiv.classList.remove('chartBox-dark');

    dark = false;
    myChart.options = chartOptions;
    myChart.update();
  }
});

