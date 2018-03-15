<template>
    <div class="bs-pm">
        <!--主体-->
		<div id="main">
			<!--2 页面主体-->
			<section>
			<!--2.1 状态-->
				<div id="state" class="visible-lg">
					<span class="shape"><b></b></span>
					<span class="shape shape2"><b></b></span>
					<span class="confirm">确认订单信息<b></b></span>
					<span class="pay">支付订单<b></b></span>
					<span class="succeed">支付完成</span>
				</div>
			<!--2.2 主体-->	
				<div id="box">
					 <div class="head clear">
						<p class="lf">支付金额：<b>{{str[1]}}元</b></p>
						<p class="rt hidden-xs">订单号：<span>{{str[0]}} </span> 收款方：心灵驿站商城</p>
					</div>
					<div class="body">
						<p>网上银行支付</p>
						<dl class="row">
							<dd>
								<input type="radio" name="pay" value="1" checked>
								<img src="../../assets/img/pay/pay_img1.jpg" alt="pay_img1">
							</dd>
							<dd>
								<input type="radio" name="pay" value="2">
								<img src="../../assets/img/pay/pay_img2.jpg" alt="pay_img1">
							</dd>
							<dd>
								<input type="radio" name="pay" value="3">
								<img src="../../assets/img/pay/pay_img3.jpg" alt="pay_img1">
							</dd>
							<dd>
								<input type="radio" name="pay" value="4">
								<img src="../../assets/img/pay/pay_img4.jpg" alt="pay_img1">
							</dd>
							<dd>
								<input type="radio" name="pay" value="5">
								<img src="../../assets/img/pay/pay_img5.jpg" alt="pay_img1">
							</dd>
						</dl>
					</div>
					<div class="foot">
						<router-link class="rt" :to="'/order/paySuccess/str='+str[0]+'_'+str[1]">
							确定付款
						</router-link>
					</div>
				</div>
			</section>
		</div>
    </div>
</template>

<style scoped>
    @import '../../assets/css/payment.css';
</style>

<script>
    export default{
        name:'Payment',
		data:function(){
			return{
				str:[]
			}
		},
		mounted(){
			this.str=this.$route.params.str.split("=")[1].split("_");
		}
    }
</script>