<?php
/**
 * Copyright (c) 2022 Thiago Cabrera All rights reserved.
 * Contact: thiagofcabrera00@gmail.com
 * Released under the GPLv3
 * https://www.gnu.org/licenses/gpl-3.0
 **/

$connection = null;

try
{
    $connection = new PDO('mysql:host=127.0.0.1:3306;dbname=access-control-component', 'thiago', '2201');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $connectionException) {
    //Contestamos al cliente que su petición no se puede efectuar por un problema
    $status = array("status" => "db-error", "description" => $connectionException->getMessage());
    echo json_encode($status);
    //Cortamos la ejecución del programa del servidor de forma forzada
    die();
};
