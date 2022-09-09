<?php

include_once("./database.php");

$input = json_decode(file_get_contents('php://input'));

$password = $input->password;
$username = $input->username;

try
{
	if($username == "" || $password == "")
	{
		$status = array(status=>"error", description=>"inputs can't be empty!");
	} else {
		$SQLStatement = $connection->prepare("CALL `usp_authenticate_user`(:username, :password)");
		$SQLStatement->bindParam(':username', $username);
		$SQLStatement->bindParam(':password', $password);
		$SQLStatement->execute();

		$response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
		if(sizeof($response)!=0) {
			$status = array(status => "ok", responseData => array(user_id => $response[0]["id"]));
		} else {
			$status = array(status => "exception", description => "invalid user and/or password");
		}
	}
	echo json_encode($status);
}
catch(PDOException $connectionException)
{
    $status = array(status => "db-error (authenticateUser.php", description => $connectionException->getMessage());
    echo json_encode($status);
    die();
}

?>