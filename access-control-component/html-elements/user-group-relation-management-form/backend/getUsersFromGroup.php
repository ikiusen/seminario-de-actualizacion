<?php

include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$id = $input->groupId;

try
{
    $SQLStatement = $connection->prepare("CALL `usp-get-users-by-group`(:id)");
    $SQLStatement->bindParam(':id', $id);
    $SQLStatement->execute();
    $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($response);
} catch (PDOException $connectionException) {
    $status = array("status" => "db-error (getUsersFromGroup.php", "description" => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
