<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$id = $input->id;
$description = $input->description;
$name = $input->name;

try
{
    if ($name == "" || $description == "") {
        $status = array("status" => "error", "description" => "inputs can't be empty!");
    } else {
        $SQLStatement = $connection->prepare("CALL `usp-update-group`(:id, :name, :description)");
        $SQLStatement->bindParam(':id', $id);
        $SQLStatement->bindParam(':name', $name);
        $SQLStatement->bindParam(':description', $description);
        $SQLStatement->execute();
        $status = array("status" => "ok", "description" => "success");
        echo json_encode($status);
    }
} catch (PDOException $connectionException) {
    $status = array("status" => "db-error (updateGroup.php", "description" => $connectionException->getMessage());
    echo json_encode($status);
    die();
}
