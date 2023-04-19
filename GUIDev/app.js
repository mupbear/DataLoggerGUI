var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My Dataset',
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2
    }]
  },
  options: {
    maintainAspectRatio: false,
    // Add any additional chart options here
  }
});
const graphBody = document.querySelector('.containerBody');

if(myChart.data.datasets[0].data.length > 3){
  graphBody.style.width = '5000px';
}


var dark = false;

var ctx1 = document.getElementById('myChart1').getContext('2d');
		var myChart1 = new Chart(ctx1, {
			type: 'line',
			options: chartOptions
		});

var ctx2 = document.getElementById('myChart2').getContext('2d');
		var myChart2 = new Chart(ctx2, {
			type: 'line',
			options: chartOptions
    });

 var ctx3 = document.getElementById('myChart3').getContext('2d');
		var myChart3 = new Chart(ctx3, {
			type: 'line',
			options: chartOptions
		});
    
 var ctx4 = document.getElementById('myChart4').getContext('2d');
		var myChart4 = new Chart(ctx4, {
			type: 'line',
			options: chartOptions
		});

 var ctx5 = document.getElementById('myChart5').getContext('2d');
		var myChart5 = new Chart(ctx5, {
			type: 'line',
			options: chartOptions
		});

var chartOptionsDark = {
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: '#81c8bd'
          },
          grid: {
            color: '#81c8bd'
          }
        },
        y: {
          ticks: {
            color: '#81c8bd'
          },
          grid: {
            color: '#81c8bd'
          }
        }
      },
        //maintainAspectRatio: false, // disable aspect ratio
        plugins: {
          legend:{
            labels: {
              color: 'white'
            },
          },
          zoom: {
              pan: {
                    enabled: true,
                    mode: 'x',
                    threshold: 10,
              },
           }
        },
      
    };


var chartOptions = {
   maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'white'
      }
    },
    y: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'white'
      }
    }
  },
    //maintainAspectRatio: false, // disable aspect ratio
    plugins: {
      legend:{
        labels: {
          color: 'white'
        },
      },
      zoom: {
          pan: {
                enabled: true,
                mode: 'x',
                threshold: 10,
          },
       }
    },
  
  };


function resetZoomChart(chartName){
  chartName.resetZoom();
}

function zoomInButton(chartName){
  chartName.zoom(1.1);
}
function zoomOutButton(chartName){
  chartName.zoom(0.9);
}

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
}

// Load JSON file
$.getJSON('data/fake-data.json', function(data) {
    // Loop through each option and add it to the dropdown menu
    $.each(data, function(index, option) {
        $('#select-chart1').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(data, function(index, option) {
        $('#select-chart2').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
    $.each(data, function(index, option) {
        $('#select-chart3').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    }); 
    $.each(data, function(index, option) {
        $('#select-chart4').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    }); 
    $.each(data, function(index, option) {
        $('#select-chart5').append($('<option>', {
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
    chart1Div.classList.add('chartBox-dark');
    chart2Div.classList.add('chartBox-dark');
    chart3Div.classList.add('chartBox-dark');
    chart4Div.classList.add('chartBox-dark');
    chart5Div.classList.add('chartBox-dark');

    dark = true;
    myChart1.options = chartOptionsDark;
    myChart2.options = chartOptionsDark;
    myChart3.options = chartOptionsDark;
    myChart4.options = chartOptionsDark;
    myChart5.options = chartOptionsDark;
    myChart1.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();
  } else {
    body.classList.remove('dark-mode');
    chart1Div.classList.remove('chartBox-dark');
    chart2Div.classList.remove('chartBox-dark');
    chart3Div.classList.remove('chartBox-dark');
    chart4Div.classList.remove('chartBox-dark');
    chart5Div.classList.remove('chartBox-dark');

    dark = false;
    myChart1.options = chartOptions;
    myChart2.options = chartOptions;
    myChart3.options = chartOptions;
    myChart4.options = chartOptions;
    myChart5.options = chartOptions;
    myChart1.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();
  }
});

