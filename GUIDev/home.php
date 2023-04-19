<?php 

session_start();

if (isset($_SESSION['id']) && isset($_SESSION['username'])) {

 ?>


<!DOCTYPE html>
<html>
<head>

    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <style>

        </style>

</head>
<body>

     <h1>Hello, <?php echo $_SESSION['username']; ?></h1>
     
     <form method="POST" action="backend/logout.php">   
     <button> Logout </button>
    </form>

    <form method="POST" action="admin/admin.php">   
     <button> Admin </button>
    </form>

     
     <form method="POST" action="data.php">
     <p class="center">Please select data event:</p>
        <select name="event">
            <option value="event1">Event 1</option>
            <option value="event2">Event 2</option>
            <option value="event3">Event 3</option>
        </select>
        <br>
        <input type="submit" value="Submit">
    </form>

    


</body>
</html>

<?php 
}else{

     header("Location: index.php");
     exit();
}
 ?>