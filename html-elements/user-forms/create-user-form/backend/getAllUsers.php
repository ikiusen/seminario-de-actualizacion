<?php

include_once( "./database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$password = $object->password;
$username = $object->username;

try
{
	$SQLStatement = $connection->prepare("CALL `usp_get_all_users`");
	$SQLStatement->execute();
    $result = $SQLStatement->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($result);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (getAllUsers.php', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>