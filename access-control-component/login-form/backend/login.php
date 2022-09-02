<?php
$input = json_decode(file_get_contents('php://input'));

function login($data) {
    return ('Welcome '.$data->{'username'}.'!!');
}

$response = login($input);

echo json_encode($response);
?>