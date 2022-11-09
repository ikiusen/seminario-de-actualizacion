<?php
include_once "./server.php";

$object = json_decode(file_get_contents('php://input'));

$message = getMessages($object->reciever);
$response = $array = array('status' => 'ok', 'message' => $message);

echo json_encode($response);
