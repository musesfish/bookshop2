<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	@$bid=$_REQUEST["bid"];//拿到商品id
	$sql="SELECT u.uname,u.avatar,c.comment FROM bs_user u,bs_comment c WHERE u.uid=c.user_id AND product_id=$bid";
	$output=sql_execute($sql);
	echo json_encode($output);
?>