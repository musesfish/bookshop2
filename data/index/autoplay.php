<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	$output=[];

	$sql="SELECT * FROM bs_index_product";
	$output=sql_execute($sql);
	echo json_encode($output);
?>