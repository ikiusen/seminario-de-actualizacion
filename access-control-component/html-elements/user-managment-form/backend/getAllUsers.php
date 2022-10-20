<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

try
{
    $SQLStatement = $connection->prepare("CALL `usp-get-all-users`");
    $SQLStatement->execute();
    $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($response);
} catch (PDOException $connectionException) {
    $status = array("status" => "db-error (getAllUsers.php", "description" => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
