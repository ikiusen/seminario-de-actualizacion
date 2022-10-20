<?php

include_once "./database.php";
include_once "./checkSessionToken.php";

$input = json_decode(file_get_contents('php://input'));

$token = $input->token;

try
{
    if(checkToken($token)) {
        $SQLStatement = $connection->prepare("CALL `usp-get-all-users`");
        $SQLStatement->execute();
        $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
    } else {
        $status = array("status" => "db-error (getAllUsers.php", "description" => "Invalid session");
        echo json_encode($status);
    }
} catch (PDOException $connectionException) {
    $status = array("status" => "db-error (getAllUsers.php", "description" => $connectionException->getMessage());
    echo json_encode($status);
    die();
}


