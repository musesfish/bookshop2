<template>
<div class="bs-ft">
    <div id="foot" class="bs">
			<!--顶部-->
			<div>
				<dl class="row">
					<dd  class="hidden-xs">
						<a href="#"><img src="../assets/img/footer/1.png" alt="1"></a>
						<span>正规渠道正品保障</span>
					</dd>
					<dd  class="hidden-xs">
						<a href="#"><img src="../assets/img/footer/2.png" alt="2"></a>
						<span>放心购物货到付款</span>
					</dd>
					<dd  class="hidden-xs">
						<a href="#"><img src="../assets/img/footer/3.png" alt="3"></a>
						<span>625 城市次日到达</span>
					</dd>
					<dd  class="hidden-xs">
						<a href="#"><img src="../assets/img/footer/4.png" alt="4"></a>
						<span>上门退换购物无忧</span>
					</dd>
				</dl>
			</div>
			<!--底部-->
			<p class="row">
				<span class="col-md-12">
					Copyright (C) 心灵驿站网 2017-2027, All Rights Reserved
					<a href="#" class="hidden-xs hidden-sm" style="padding:0;margin:0">
					<img src="../assets/img/footer/validate.gif">
					</a>	
					<span class="hidden-xs hidden-sm">京ICP证041189号出版物经营许可证 新出发京批字第直2333号</span>
				</span>
				<router-link to="/index" class="visible-xs visible-sm" style="padding:0;margin:0">
				<img src="../assets/img/footer/validate.gif">
				</router-link>	
				<span class="visible-xs visible-sm">京ICP证041189号出版物经营许可证 新出发京批字第直2333号</span>
			</p>
	</div>
</div>
</template>

<style scoped>
    @import '../assets/css/footer.css';
</style>

<script>
    export default{
        name:'Footer'
    }
</script>