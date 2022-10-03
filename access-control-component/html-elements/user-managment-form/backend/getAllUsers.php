<?php

include_once "./lib/database.php";

$input = json_decode( file_get_contents('php://input') );

try
{
	$SQLStatement = $connection->prepare("CALL `usp_get_all_users`");
	$SQLStatement->execute();
    $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode( $response);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (getAllUsers.php', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>
