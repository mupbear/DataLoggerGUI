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


var chartOptions = {
    animation: false,
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



function updateGraph(chartName, selectID) {
    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    $.getJSON('data/fake-data.json', function(data) {
        var selectedData = data.find(function(item) {
            return item.value === selectedValue;
        });

        if (selectedData) {

            chartName.data = selectedData.data;
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

    

});



function updateType(chartName, selectID) {

    //Empty the dropdown menus
    var dropdown = document.getElementById("select1");
    while (dropdown.firstChild) {dropdown.removeChild(dropdown.firstChild);}


    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    $.getJSON('data/fake-data.json', function(data) {
        var selectedData = data.find(function(item) {
            return item.value === selectedValue;
        });

        if (selectedData) {
            chartName.data.datasets[0] = selectedData.data.datasets[0];
            chartName.update();
        }
        $.each(selectedData.data.datasets, function(index, option) {
            $('#select1').append($('<option>', {
                value: option.value,
                text: option.label
            }));
        });
    })
}
  

function updateSensor(chartName, selectID) {

    var selectBox = document.getElementById(selectID);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    $.getJSON('data/fake-data.json', function(datasets) {
        var selectedData = datasets.find(function(item) {
            
            return "LFW" === selectedValue;
        });

        if (selectedData) {
            chartName.data.datasets[0] = {        
                "label": "Left Front Wheel",        
                "value": "LFW",        
                "data": [          
                    {"x": "2022-01-01T01:00:00Z", "y": 60},         
                    {"x": "2022-01-01T02:00:00Z", "y": 55},          
                    {"x": "2022-01-01T03:00:00Z", "y": 65},
                    {"x": "2022-01-01T04:00:00Z", "y": 70},
                    {"x": "2022-01-01T05:00:00Z", "y": 80},
                    {"x": "2022-01-01T06:00:00Z", "y": 90},
                    {"x": "2022-01-01T07:00:00Z", "y": 70},
                    {"x": "2022-01-01T08:00:00Z", "y": 60},
                    {"x": "2022-01-01T09:00:00Z", "y": 50},
                    {"x": "2022-01-01T10:00:00Z", "y": 40}              
                    ],
            "backgroundColor": "rgba(255, 99, 132, 0.2)",
            "borderColor": "rgba(255, 99, 132, 1)",
            "borderWidth": 1
          };
            chartName.update();
        }

    })
}