<?php

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

