<template>
    <div class="bs-od-ps">
        <!--主体-->
		<div id="main">
			<!--2 页面主体-->
			<section>
                <h2>订单支付成功 !</h2>
                <p>订单号：<span>{{str[0]}}</span>支付金额：<b>{{str[1]}}</b></p>
                <p>
					<router-link to="/ucBasic/myOrder">查看订单</router-link>
					<router-link to="/index">继续购物</router-link>
				</p>
        	</section>
		</div>
    </div>
</template>

<style scoped>
    @import '../../assets/css/pay_success.css';
</style>

<script>
    export default{
        name:'paySuccess',
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