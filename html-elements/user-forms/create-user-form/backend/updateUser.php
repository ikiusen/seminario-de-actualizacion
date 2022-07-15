<?php

include_once( "./database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$id = $object->id;
$password = $object->password;
$username = $object->username;


try
{
	$SQLStatement = $connection->prepare("CALL `usp_update_user`(:id, :username, :password)");
    $SQLStatement->bindParam( ':id', $id );
	$SQLStatement->bindParam( ':username', $username );
	$SQLStatement->bindParam( ':password', $password );
	$SQLStatement->execute();

	$status = array( status=>'ok', description=>'success' );

    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (updateUser.php', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>