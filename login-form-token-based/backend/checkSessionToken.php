<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

include_once "./database.php";

$tokenStatus = false;

function checkToken($token) {
    try
    {
        global $connection;
        $SQLStatement = $connection->prepare("CALL `usp-check-session-token`(:token)");
        $SQLStatement->bindParam(':token', $token);
        $SQLStatement->execute();
        $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
        if (sizeof($response) != 0) {
            $tokenStatus = true;
        }
        return $tokenStatus;
    } catch (PDOException $connectionException) {
        $status = array("status"=> "db-error (auth.php", "description" => $connectionException->getMessage());
        echo json_encode($status);
        die();
    }
}

