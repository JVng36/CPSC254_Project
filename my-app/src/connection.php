<?php
$host = "localhost";
$dbUser = "root";
$dbPass = "pass";
$dbName = "dbName";

//$conn = new mysqli ($host,$dbuser,$dbpass,$dbname);
$link = mysqli_connect($host, $dbUser, $dbPass,$dbName);
if (!$link) {
die('Could not connect: ' . mysql_error());
}else{
echo 'Connected successfully<p>';
}