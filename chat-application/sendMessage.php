<?php
include_once("./server.php");

$object = json_decode(file_get_contents('php://input'));

$response = $array = array('status' => 'error');
if (sendMessage($object->sender, $object->reciever, $object->message))
{
    $response = $array = array('status' => 'ok');
}

echo json_encode($response);
?>