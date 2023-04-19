<?php 

session_start();

if (isset($_SESSION['id']) && isset($_SESSION['username'])) {

?>

<!DOCTYPE html>
<html>
<head>
	<title>Data</title>

	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js" integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js" integrity="sha512-wUYbRPLV5zs6IqvWd88HIqZU/b8TBx+I8LEioQ/UC0t5EMCLApqhIAnUg7EsAzdbhhdgW07TqYDdH3QEXRcPOQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://unpkg.com/chart.js-plugin-labels-dv/dist/chartjs-plugin-labels.min.js"></script>

	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/dark-mode.css" media="(prefers-color-scheme: dark)">

</head>
<body>

<input type="checkbox" id="dark-mode-checkbox" style="position: fixed; top: 20px; right: 20px; z-index: 1;"><label for="dark-mode-checkbox" style="position: fixed; top: 20px; right: 40px;">Dark mode:</label>
  
<br>
	<form method="POST" action="home.php"><button> Home </button></form> 
	<form method="POST" action="admin/admin.php"><button> Admin </button></form>
	<form method="POST" action="gps.php"><button> Map </button></form>
  
	<!-- Test Chart -->
		<div class="container">
			<div class="containerBody">
  			<canvas id="myChart"></canvas>
			</div>
		</div>


	<!-- First chart -->
	<div class="container">
		<div id= "chart1Div" class="chartBox">
			<div class="containerBody">
	<label for="select-chart1">Select Data:</label> 
	<select id="select-chart1" onchange="updateGraph(myChart1, 'select-chart1')"></select><button onclick="resetZoomChart(myChart1)">Reset Zoom</button><button onclick="zoomInButton(myChart1)">+</button><button onclick="zoomOutButton(myChart1)">-</button>
	<canvas id="myChart1"></canvas>
			</div>
		</div>
	</div>


	<!-- Second chart -->
	<div class="container">
		<div id="chart2Div" class="chartBox">
	<label for="select-chart2">Select Data:</label>
	<select id="select-chart2" onchange="updateGraph(myChart2, 'select-chart2')"></select><button onclick="resetZoomChart(myChart2)">Reset Zoom</button>
	<canvas id="myChart2" style="height: 250px; width: 100%;"></canvas>
		</div>
	</div>

	<!-- Third chart -->
	<div class="container">
		<div id="chart3Div" class="chartBox">
	<label for="select-chart3">Select Data:</label>
	<select id="select-chart3" onchange="updateGraph(myChart3, 'select-chart3')"></select><button onclick="resetZoomChart(myChart3)">Reset Zoom</button>
	<canvas id="myChart3" style="height: 250px; width: 100%;"></canvas>
		</div>
	</div>

	<!-- Fourth chart -->
	<div class="container">
		<div id="chart4Div" class="chartBox">
	<label for="select-chart4">Select Data:</label>
	<select id="select-chart4" onchange="updateGraph(myChart4, 'select-chart4')"></select><button onclick="resetZoomChart(myChart4)">Reset Zoom</button>
	<canvas id="myChart4" style="height: 250px; width: 100%;"></canvas>
		</div>
	</div>

	<!-- Fifth chart -->
	<div class="container">
		<div id="chart5Div" class="chartBox">
	<label for="select-chart5">Select Data:</label>
	<select id="select-chart5" onchange="updateGraph(myChart5, 'select-chart5')"></select><button onclick="resetZoomChart(myChart5)">Reset Zoom</button>
	<canvas id="myChart5" style="height: 250px; width: 100%;"></canvas>
		</div>
	</div>
	
	<!-- The script for updating the charts and checking json file. -->
	<script src="app.js"></script>
</body>
</html>


<?php 

}else{

     header("Location: index.php");

     exit();

}

 ?>