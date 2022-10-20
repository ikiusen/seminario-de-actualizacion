<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

include_once "./database.php";

$input = json_decode(file_get_contents('php://input'));

$password = $input->password;
$username = $input->username;

try
{
    if ($username == "" || $password == "") {
        $status = array("status" => "error", "description" => "inputs can't be empty!");
    } else {
        //Validate user existence
        $SQLAuthStatement = $connection->prepare("CALL `usp-authenticate-user`(:username)");
        $SQLAuthStatement->bindParam(':username', $username);
        $SQLAuthStatement->execute();
        $response = $SQLAuthStatement->fetchAll(PDO::FETCH_ASSOC);
        $SQLAuthStatement->closeCursor();
        if (sizeof($response) != 0) {
            if (password_verify($password, $response[0]["password"])) {
                $id_user = $response[0]["id"];
                $token = hash("sha256", $username . $response[0]["password"]);
                //If valid, create token and establish session
                //toDo: take into account possible errors
                $SQLSessionStatement = $connection->prepare("CALL `usp-create-user-session`(:id_user, :token)");
                $SQLSessionStatement->bindParam(':id_user', $id_user);
                $SQLSessionStatement->bindParam(':token', $token);
                $SQLSessionStatement->execute();
                $SQLSessionStatement->closeCursor();
                $status = array("status" => "ok", "responseData" => array("token" => $token));
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
