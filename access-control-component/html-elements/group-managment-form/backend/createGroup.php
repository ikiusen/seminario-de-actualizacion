<?php

include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$description = $input->description;
$name = $input->name;

try
{
    if ($name == "" || $description == "") {
        $status = array(status => "error", description => "inputs can't be empty!");
    } else {
        $SQLStatement = $connection->prepare("CALL `usp-create-group`(:name, :description)");
        $SQLStatement->bindParam(':name', $name);
        $SQLStatement->bindParam(':description', $description);
        $SQLStatement->execute();

        $status = array(status => "ok", description => "success");
    }
    echo json_encode($status);
} catch (PDOException $connectionException) {
    $status = array(status => "db-error (createGroup.php", description => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
