<!DOCTYPE html>

<html>

<head>

    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="app.css">

</head>

<body>
    <h1>Login</h1>
     <form action="backend/login.php" method="post">

        <?php if (isset($_GET['error'])) { ?>

            <p class="error"><?php echo $_GET['error']; ?></p>

        <?php } ?>

        <label>User Name</label>

        <input type="text" name="uname" placeholder="User Name"><br>

        <label>Password</label>

        <input type="password" name="password" placeholder="Password"><br> 

        <button type="submit">Login</button>

     </form>

</body>

</html>