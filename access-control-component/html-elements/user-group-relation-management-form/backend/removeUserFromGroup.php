<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/
include_once "./lib/database.php";

$input = json_decode(file_get_contents('php://input'));

$userId = $input->userId;
$groupId = $input->groupId;

try
{
	if($groupId == "" || $userId == "")
	{
		$status = array("status"=>"error", "description"=>"inputs can't be empty!");
	} else {
		$SQLStatement = $connection->prepare("CALL `usp-remove-user-from-group`(:userId, :groupId)");
		$SQLStatement->bindParam(':userId', $userId);
		$SQLStatement->bindParam(':groupId', $groupId);
		$SQLStatement->execute();

		$status = array( "status"=>"ok", "description"=>"success" );
	}
	echo json_encode($status);
}
catch(PDOException $connectionException)
{
    $status = array("status"=>"db-error (removeUserFromGroup.php", "description"=>$connectionException->getMessage());
    echo json_encode($status);
    die();
}

?>