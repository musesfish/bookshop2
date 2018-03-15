<template>
    <div class="bs-od-cf">
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
			<!--2.2 地址-->
				<div id="address">
					<h2 class="h2">选择收货地址</h2>
					<hr>
					<p id="default-adrs" v-if="address.length!=0">
						<span>{{address[0].receiver}}</span>
						<a class="a">{{address[0].province}}</a>
            			<a class="a">{{address[0].city}}</a>
						<a class="a">{{address[0].county}}{{address[0].address}}号</a>
            			<a class="a">{{address[0].cellphone}}</a>
					</p>
					<router-link to="/ucBasic/address">更多地址 >></router-link>
				</div>
			<!--2.3 确认-->
				<div id="confirm">
					<h2 class="h2">确认商品信息</h2>
					<div class="box">
						<!--头-->
						<div class="head">
							<span>商品信息</span>
							<span>单价(元)</span>
							<span>数量</span>
							<span>金额</span>
						</div>
						<!--身-->
						<div class="body" v-if="products.length!=0" v-for="(product,i) in products">
							<div class="information">
								<router-link :to="'/productDetails/bid='+product.bid">
									<img :src="require('../../assets/'+product.md)">
								</router-link>
								<div class="hidden-xs">
									<p>{{product.subtitle}}</p>
								</div>
							</div>
							<div class="price">
								<a href="index.html" class="home hidden-xs">心灵驿站</a>
								￥{{product.price}}
							</div>
							<div class="number">
								X{{product.count}}
							</div>
							<div class="total">
								￥{{product.count*product.price}}
							</div>
						</div>
						<!--尾-->
						<div class="foot" v-if="products.length!=0">
							<a href="cart.html" class="lf hidden-xs"> &lt;&lt;&nbsp;前往购物车 </a>
							<p class="rt">
								共<b>{{counts}}</b>件商品<span>合计(不含运费):</span><b>{{totalprice}}</b><b>元</b>
								<router-link :to="'/order/payment/str='+products[0].aid+'_'+totalprice" class="bottoma">
									付款并确认
								</router-link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
    </div>
</template>

<style scoped>
    @import '../../assets/css/order_confirm.css';
</style>

<script>
    export default{
        name:'orderConfirm',
		data:function(){
			return{
				result:[],
				str:[],
				mydata:[],
				address:[],
				products:[],
				counts:0,
				totalprice:0
			}
		},
		watch:{
			result:function(){
				if(this.result[0]=="odconfirm"){
					this.mydata=JSON.parse(this.result[1]);
					if(this.mydata.code=="0"){
						alert(this.mydata.msg);
						this.$router.push("/ucBasic/address");
					}else{
						this.address=this.mydata.address;
						this.products=this.mydata.products;
						for(var i=0;i<this.products.length;i++){
							this.counts = Number(this.counts)+parseInt(this.products[i].count);
							this.totalprice += this.products[i].price * this.products[i].count;
						}
					}
				}
			}
		},
		methods:{
			getData:function(){
				this.str=JSON.parse("["+decodeURI(this.$route.params.str.split("=")[1].slice(0,-1))+"]");
				this.str=JSON.stringify(this.str);
				this.ajax(this,"order/myconfirm_order.php",2,"odconfirm","str="+this.str);
			}
		},
		mounted(){
			this.getData();
		}
    }
</script>