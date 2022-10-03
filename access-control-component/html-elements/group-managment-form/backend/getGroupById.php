<?php

include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$id = $input->id;

try
{
    $SQLStatement = $connection->prepare("CALL `usp_get_group_by_id`(:id)");
    $SQLStatement->bindParam(':id', $id);
    $SQLStatement->execute();
    $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($response);
} catch (PDOException $connectionException) {
    $status = array(status => 'db-error (getGroupById.php', description => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
