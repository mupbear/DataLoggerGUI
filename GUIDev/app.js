



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