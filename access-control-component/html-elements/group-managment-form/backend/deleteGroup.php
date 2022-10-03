<?php

include_once "./database.php";

$input = json_decode(file_get_contents('php://input'));

$id = $input->id;

try
{
    $SQLStatement = $connection->prepare("CALL `usp_delete_group`(:id)");
    $SQLStatement->bindParam(':id', $id);
    $SQLStatement->execute();

    $status = array(status => 'ok', description => 'success');

    echo json_encode($status);
} catch (PDOException $connectionException) {
    $status = array(status => 'db-error (deleteGroup.php', description => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
