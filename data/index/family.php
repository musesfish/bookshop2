<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	$output=[];
	$sql="SELECT * FROM bs_book_family";
	$output=sql_execute($sql);
	echo json_encode($output);
?>