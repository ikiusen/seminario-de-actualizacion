<?php
function connectUsers($userIdA, $userIdB)
{
    return generateKey('A', 'B');
}
function diconnectUsers($userIdA, $userIdB)
{

}
function sendMessage($senderUserId, $targetUserId, $messageBody)
{
    session_start();
    $_SESSION['MESSAGE'] = array('sender' => $senderUserId, 'reciever' => $targetUserId, 'messageBody' => $messageBody);
    return true;
}

function getMessages($userId)
{
    session_start();
    if ($userId == $_SESSION['MESSAGE']['reciever']) {
        $message = $_SESSION['MESSAGE']['messageBody'];
    }
    return $message;
}

function generateKey($senderUserId, $targetUserId)
{
    return hash('sha256', uniqid());
}
