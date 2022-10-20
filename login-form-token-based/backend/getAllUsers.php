<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

include_once "./database.php";
include_once "./checkSessionToken.php";

$input = json_decode(file_get_contents('php://input'));

$token = $_SERVER['HTTP_X_SESSION_KEY'];

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


