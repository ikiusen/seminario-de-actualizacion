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
		//Validate user existence
		$SQLAuthStatement = $connection->prepare("CALL `authenticate_user`(:username, :password)");
		$SQLAuthStatement->bindParam(':username', $username);
		$SQLAuthStatement->bindParam(':password', $password);
		$SQLAuthStatement->execute();
		$response = $SQLAuthStatement->fetchAll(PDO::FETCH_ASSOC);
		$SQLAuthStatement->closeCursor();
		if(sizeof($response)!=0) {
			$id_user = $response[0]["id"];
			$token = hash('sha256', $username.$password);
			//If valid, create token and establish session
			//toDo: take into account possible errors
			$SQLSessionStatement = $connection->prepare("CALL `create_user_session`(:id_user, :token)");
			$SQLSessionStatement->bindParam(':id_user', $id_user);
			$SQLSessionStatement->bindParam(':token', $token);
			$SQLSessionStatement->execute();
			$SQLSessionStatement->closeCursor();
			$status = array(status => "ok", responseData => array(token => $token));
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