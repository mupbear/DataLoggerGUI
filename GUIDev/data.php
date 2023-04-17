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
	<!--<link rel="stylesheet" type="text/css" href="dark-mode.css">-->

</head>
<body>

<br>
	<form method="POST" action="gps.php">   
     <button> Map </button>
    </form><br>
	<button id="addChart">Add Graph</button><br><br>
	
	<!-- First chart -->
	<label for="select-chart1">Select Data Type:</label> 
	<select id="select-chart1" onchange="updateType(myChart1, 'select-chart1')"></select> <label for="select1">Select Sensor:</label>
    		<select id="select1" onchange="updateSensor(myChart1, 'select1')">
	<div id="dropdowns">
  		<div class="dropdown">
    		<label for="select1">Select Sensor:</label>
    		<select id="select1">
    		</select>
  		</div>
	</div>
	<br><button onclick="addDropdown()">Add Sensor</button>
	<canvas id="myChart1" style="height: 50px; width: 400px;"></canvas>

	<!-- Second chart -->
	<label for="select-chart2">Select Data:</label>
	<select id="select-chart2" onchange="updateGraph(myChart2, 'select-chart2')"></select>
	<canvas id="myChart2" style="height: 50px; width: 400px;"></canvas>

	<!-- Third chart -->
	<label for="select-chart3">Select Data:</label>
	<select id="select-chart3" onchange="updateGraph(myChart3, 'select-chart3')"></select>
	<canvas id="myChart3" style="height: 50px; width: 400px;"></canvas>

	<!-- The script for updating the charts and checking json file. -->
	<script src="app.js"></script>
	<script>
	</script>
</body>
</html>


<?php 

}else{

     header("Location: index.php");

     exit();

}

 ?>