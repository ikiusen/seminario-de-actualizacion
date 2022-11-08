<?php
include_once("./server.php");

$jsonBody = file_get_contents('php://input');
$object = json_decode($jsonBody);

$key = connectUsers('A', 'B');
echo json_encode($key);

?>