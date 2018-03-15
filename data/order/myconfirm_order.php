<?php   
    session_start();
    header("Content-Type:application/json");
    require_once("../init.php");
    $uid=$_SESSION["uid"];
    @$arr=$_REQUEST["str"];
	@$arr=json_decode($arr);
	//echo var_dump(get_object_vars($arr[0])["bid"]);

    $sql="SELECT * FROM bs_receiver_address WHERE user_id=$uid AND is_default=1";
    $result=sql_execute($sql);
    $output["address"]=$result;
    if(!$result){
        echo '{"code":"0","msg":"请先填写收货地址！"}';
    }else{
        @$address_id=$output["address"][0]["aid"];
        $sql="INSERT INTO bs_order VALUES(NULL,$uid,$address_id,'1',now(),'','','')";
        $result=sql_execute($sql);
        $aid=mysqli_insert_id($conn);
        if($result && $aid){
            for($i=0;$i<count($arr);$i++){
               $bid=get_object_vars($arr[$i])["bid"];
               $count=get_object_vars($arr[$i])["count"];
               $sql="INSERT INTO bs_order_detail VALUES(NULL,$aid,$bid,$count)";
               $result=sql_execute($sql);
            }
        }
        $sql="SELECT o.aid,d.count,b.md,b.subtitle,b.price,b.bid ";
        $sql .= "FROM bs_order o,bs_order_detail d,bs_book b ";
        $sql .= "WHERE d.order_id=o.aid AND d.product_id=b.bid AND o.aid=$aid";
        $result=sql_execute($sql);

        $output["products"]=$result;
        echo json_encode($output);
    }
?>


