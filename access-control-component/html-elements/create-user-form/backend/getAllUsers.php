<?php

/*

Vanilla JS WebComponent's Toolkit
Copyright (C) 2019  Matías Gastón Santiago

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

//----------------------------------------Request Process---------------------------------------
include_once( "./database.php");

$input = json_decode( file_get_contents('php://input') );

//-------------------------------- Simulation of requested resource ----------------------------

try
{
	$SQLStatement = $connection->prepare("CALL `usp_get_all_users`");
	$SQLStatement->execute();
    $response = $SQLStatement->fetchAll(PDO::FETCH_ASSOC);
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (getAllUsers.php', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

//------------------------------------------Filtering-------------------------------------------

$rowfilterCallback = function($value)
{
    return function(array $item) use ($value)
    {
    	return (substr_count(strtolower(join($item)), strtolower($value) )>0)? true : false;
    };
};

if ( !is_null($input->filter) || strlen($input->filter) > 0 || !empty($input->filter))
{
	$response = array_filter( $response, $rowfilterCallback($input->filter) );
}

//------------------------------------------Sorting---------------------------------------------


$sortFunction = function( $key, $ascending )
{
    return function(array $a, array $b) use ($key,$ascending)
    {
    	if ($a[$key] < $b[$key]) 
	    {
	        return ($ascending)? -1 : 1;
	    }
	    else if ($a[$key] > $b[$key]) 
	    {
	         return ($ascending)? 1 : -1;
	    }
	    else
	    {
	        return 0;
	    }    	
    };
};

if ( is_string($input->order) && is_bool($input->ascending) )
	usort($response, $sortFunction($input->order, $input->ascending));

//------------------------------------------Pagination-------------------------------------------

function countPagesFromArray( $matrixData, int $pageSize )
{
	$counter = 0;

	if ( count($matrixData) > 0 && $pageSize > 0 )
	{
		$counter = intval( count($matrixData)/$pageSize);
		if ( count($matrixData)%$pageSize > 0 || $pageSize > count($matrixData)  ) 
			$counter+=1;
	}
	
	return $counter;
}


function extractPageFromArray( $matrixData, int $pageNumber, int $pageSize )
{
	$result = null;

	$pages = countPagesFromArray($matrixData, $pageSize);

	if ( $pageNumber <= $pages && $pages > 0 )
	{
		$offset = ($pageNumber-1)*$pageSize;
		$diff = 0;
		
		if ( $pageNumber*$pageSize > count($matrixData) )
		{
			$diff = ($pageNumber*$pageSize) - count($matrixData);
		}
		
		$result = array_slice($matrixData, $offset, $pageSize);
	}
	
	return $result;
}

if ( !is_null($input->page) && !is_null($input->pagesize) )
{
	$response = extractPageFromArray($response, intval($input->page), intval($input->pagesize) );
}


//---------------------------------------------JSON Response ---------------------------------------
echo json_encode( $response );

?>
