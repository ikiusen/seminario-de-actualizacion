<?php
function connectUsers($userIdA, $userIdB)
{
    return generateKey('A','B');
}
function diconnectUsers($userIdA, $userIdB)
{

}
function sendMessage($senderUserId, $targetUserId, $messageBody)
{

}

function getMessages($userId)
{
    
}

function generateKey($senderUserId, $targetUserId)
{
    return hash('sha256', uniqid());
}
?>