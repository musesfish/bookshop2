<?php
	require_once("../init.php");
    session_start();
    header("Content-Type:application/json");
    $uid=$_SESSION["uid"];
      $sql="SELECT aid FROM bs_order WHERE user_id=$uid";
      $result=sql_execute($sql);
	  $orders=[];
      for($i=0;$i<count($result);$i++){
        $orders[]=$result[$i]["aid"];
      }
	    
	  //var_dump($orders);
      for($j=0;$j<count($orders);$j++){
            $sql="SELECT o.status,o.aid,d.count,b.md,b.subtitle,b.price,a.receiver,b.bid ";
            $sql .= "FROM bs_order o,bs_order_detail d,bs_book b,bs_receiver_address a ";
            $sql .= "WHERE d.order_id=o.aid AND o.user_id=$uid AND d.product_id=b.bid AND a.aid=o.address_id ";
            $sql .= "AND o.aid=$orders[$j]";
            $result=sql_execute($sql);
            $orders[$j]=$result;
      }
	  
	  //var_dump($orders);
	  for($k=0;$k<count($orders);$k++){
			$totalprice=0;
			for($l=0;$l<count($orders[$k]);$l++){
				$totalprice+=$orders[$k][$l]["price"]*$orders[$k][$l]["count"];
			}
			if($totalprice!=0){
				$orders[$k]["totalprice"]=$totalprice;
			}
	  }
	 // print_r(array_filter($orders));   
	 //var_dump($orders);
	 $orders=array_filter($orders);
	 echo json_encode($orders);
?>

