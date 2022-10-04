<?php

include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$id = $input->id;
$password = password_hash($input->password, PASSWORD_DEFAULT);
$username = $input->username;

try
{
    if ($username == "" || $password == "") {
        $status = array(status => "error", description => "inputs can't be empty!");
    } else {
        $SQLStatement = $connection->prepare("CALL `usp-update-user`(:id, :username, :password)");
        $SQLStatement->bindParam(':id', $id);
        $SQLStatement->bindParam(':username', $username);
        $SQLStatement->bindParam(':password', $password);
        $SQLStatement->execute();
        $status = array(status => 'ok', description => 'success');
        echo json_encode($status);
    }
} catch (PDOException $connectionException) {
    $status = array(status => 'db-error (updateUser.php', description => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
