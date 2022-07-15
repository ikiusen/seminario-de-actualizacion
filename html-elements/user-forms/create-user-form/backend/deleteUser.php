<?php

include_once( "./database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$id = $object->id;

try
{
	$SQLStatement = $connection->prepare("CALL `usp_delete_user`(:id)");
	$SQLStatement->bindParam( ':id', $id );
	$SQLStatement->execute();

	$status = array( status=>'ok', description=>'success' );

    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (deleteUser.php', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>