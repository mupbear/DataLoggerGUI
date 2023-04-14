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

        const chartData = {
            labels: [""], // You can set custom labels here
            datasets: [
              {
                label: "None Selected",
                data: [],
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 1
              },
              {
                label: "Car Speed",
                data: [
                  { x: "2022-01-01T01:00:00Z", y: 60 },
                  { x: "2022-01-01T02:00:00Z", y: 55 },
                  { x: "2022-01-01T03:00:00Z", y: 65 }
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              },
              {
                label: "Bike Speed",
                data: [
                  { x: "2022-01-01T01:00:00Z", y: 15 },
                  { x: "2022-01-01T02:00:00Z", y: 20 },
                  { x: "2022-01-01T03:00:00Z", y: 25 }
                ],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
              }
            ]
          };
          

 var ctx3 = document.getElementById('myChart3').getContext('2d');
		var myChart3 = new Chart(ctx3, {
			type: 'line',
            data: chartData,
			options: {
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        parser: "YYYY-MM-DDTHH:mm:ssZ",
                        unit: "hour",
                        displayFormats: {
                          hour: "MMM D, hA"
                        }
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                      }
                    }
                  ],
                  yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Speed (km/h)"
                      }
                    }
                  ]
                }
              }
		});


var chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            gridLines: {
                color: "rgba(255, 255, 255, 1.0)" // Set grid line color to red with opacity 0.5
            }
        }],
        xAxes: [{
            gridLines: {
                color: "rgba(255, 255, 255, 1.0)" // Set grid line color to red with opacity 0.5
            },
        }]
        
    }
};



function updateChart(chartName, selectID) {
    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    $.getJSON('data/ID-data.json', function(data) {
        var selectedData = data.find(function(item) {
            return item.value === selectedValue;
        });

        if (selectedData) {
            chartName.data = selectedData.data;
            chartName.update();
        }
    })
}

// Load JSON file
$.getJSON('data/ID-data.json', function(data) {
    // Loop through each option and add it to the dropdown menu
    $.each(data, function(index, option) {
        $('#select-chart2').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });

    $.each(data, function(index, option) {
        $('#select-unit').append($('<option>', {
            value: option.value,
            text: option.label
        }));
    });
});


    function selectDataSet(selectID) {
        var selectBox = document.getElementById(selectID);
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    
        $.getJSON('data/ID-data.json', function(data) {
            var selectedData = data.find(function(item) {
                return item.value === selectedValue;
            });
    
            if (selectedData) {
                $('#select-dataset').empty(); // clear the current options
                $.each(selectedData.datasets, function(index, option) {
                    $('#select-dataset').append($('<option>', {
                        value: option.value,
                        text: option.label
                    }));
                });
            }
        });
    }
    
    


      