<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

include_once "./database.php";

$input = json_decode(file_get_contents('php://input'));

$username = $input->username;
$password = $input->password;

try
{
    if ($username == "" || $password == "") {
        $status = array("status" => "error", "description" => "inputs can't be empty!");
    } else {
        $SQLStatement = $connection->prepare("CALL `usp-authenticate-user`(:username)");
        $SQLStatement->bindParam(':username', $username);
        $SQLStatement->execute();

        $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
        if (sizeof($response) != 0) {
            if (password_verify($password, $response[0]["password"])) {
                $status = array("status" => "ok", "responseData" => array("user_id" => $response[0]["id"]));
            } else {
                $status = array("status" => "exception", "description" => "Invalid user and/or password");
            }
        } else {
            $status = array("status" => "exception", "description" => "Invalid user and/or password");
        }
    }
    echo json_encode($status);
} catch (PDOException $connectionException) {
    $status = array("status" => "db-error (authenticateUser.php", "description" => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
