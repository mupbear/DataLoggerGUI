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
	<script src="https://unpkg.com/chart.js-plugin-labels-dv/dist/chartjs-plugin-labels.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>


	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/dark-mode.css" media="(prefers-color-scheme: dark)">

</head>
<body>


<div class="topButtons">
	<input type="checkbox" id="dark-mode-checkbox" style="position: fixed; top: 20px; right: 20px; z-index: 1;"><label for="dark-mode-checkbox" style="position: fixed; top: 20px; right: 40px;">Dark mode:</label>
	<form method="POST" action="home.php"><button> Home </button></form> 
	<form method="POST" action="admin/admin.php"><button> Admin </button></form>
	<form method="POST" action="gps.php"><button> Map </button></form>
</div>

<div class="liveDataTop">
	<label>Live Data</label><br>
	<label>FuelLevel,OilT,OilP,CLT,"DiffOil"</label>
</div>	
<br>
<div class="userContainer">
	<label>Select Data</label><br>
	<div class="userSelect">
		<label for="select-chart">Select Y1:</label>
		<select id="select-chart" onchange="updateGraph(myChart, 'select-chart')"></select>
		<div class="userLive">
			<button id="0" onclick="toggleData(0)" class="legendButton"></button>
		</div>	
	</div>
	<div class="userSelect">
		<label for="select-chart">Select Y2:</label>
		<select id="select-chart" onchange="updateGraph(myChart, 'select-chart')"></select>
		<div class="userLive">
			<button id="1" onclick="toggleData(1)" class="legendButton"></button>
		</div>	
	</div>
	<div class="userSelect">
		<label for="select-chart">Select Y3:</label>
		<select id="select-chart" onchange="updateGraph(myChart, 'select-chart')"></select>
		<div class="userLive">
			<button id="2" onclick="toggleData(2)" class="legendButton"></button>
		</div>	
	</div>
	<div class="userSelect">
		<label for="select-chart">Select Y4:</label>
		<select id="select-chart" onchange="updateGraph(myChart, 'select-chart')"></select>
		<div class="userLive">
			<button id="3" onclick="toggleData(3)" class="legendButton"></button>
			<button id="4" onclick="toggleData(4)" class="legendButton"></button>
		</div>	
	</div>
</div>
<br>
<div id="chartDiv" class="dataContainer">
	<div class="dataRecent">
		<label>Live data</label>
	</div>	
	<div class="dataGraph">
		<canvas id="myChart" ></canvas>
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