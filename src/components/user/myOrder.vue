<template>
    <div class="bs-mo">

        <!--主体-->
		<div id="main">
			<!--2 页面主体 我的订单-->
			<section>
			<!--头部-->
				<div class="head table">
					<h2 class="lf">我的订单</h2>
					<!--<p class="rt">
						<input type="text" placeholder="商品名称/商品编号/订单编号">
						<button>查询</button>
					</p>-->
				</div>
			<!--中部-->
				<div class="box">
					<!--中部头-->
					<div class="imfor-top">
						<p>订单号</p>
						<p>订单商品</p>
						<p class="hidden-xs">收货人</p>
						<p class="hidden-xs">订单金额</p>
						<p>状态</p>
						<p>操作</p>
					</div>
					<!--中部身-->
					<div class="imfor" :id="orders[0].aid" v-for="(orders,i) in mydata" v-if="mydata.length!=0">
						<div class="num">
							{{orders[0].aid}}
						</div>
						<div class="product">
							<div v-for="(order,j) in orders" class="lf" v-if="orders[j]!=orders.totalprice">
								<i v-show="false" :data-str="orders[0].aid">
									{{'{"bid":'+orders[j].bid+',"count":'+orders[j].count+'},'}}
								</i>
								<router-link :to="'/productDetails/bid='+order.bid">
									<img :src="require('../../assets/'+order.md)" width="25%">
								</router-link>
								<p class="hidden-xs">{{order.subtitle}}</p>
								<p class="hidden-xs"><i>￥{{order.price}}&nbsp;&nbsp;x{{order.count}}</i></p>
							</div>
						</div>

						<div class="receiver hidden-xs">
							{{orders[0].receiver}}
						</div>
						<div class="price hidden-xs">
							￥{{orders.totalprice}}
						</div>
						<div class="state">
							{{status[orders[0].status]}}
						</div>
						<div class="manipulate" style="margin-top:-20px;">
							<a href="#" :id="orders[0].aid" data-id="manipulate" 
							@click.prevent="cancelO($event)">
							{{orders[0].status=="5" || orders[0].status=="4"?"删除订单":"取消订单"}}
							</a>
							<a href="#" data-id="confirm" @click.prevent="confirmO($event,orders[0].aid)">
							{{orders[0].status=="1"?"去付款":"再次购买"}}
							</a>
						</div>
					</div>
                </div>
			<!--尾部-->
				
			</section>
		</div>

    </div>
</template>

<style scoped>
    @import '../../assets/css/myorder.css';
</style>

<script>
    export default{
        name:'myOrder',
		data:function(){
			return{
				result:[],
				mydata:[],
				status:["等待付款","等待发货","运输中","已签收","已取消"]
			}
		},
		watch:{
			result:function(){
				if(this.result[0]=="getmyorder"){
					this.mydata=this.result[1];
					this.mydata=JSON.parse(this.mydata);
					return;
				}
				if(this.result[0]=="cancelorder"){
					alert(JSON.parse(this.result[1]).msg);
					this.getData();
					return;
				}
			}
		},
		methods:{
			// 付款或再次购买
			confirmO:function(e,i){
				// this.mylog($("[data-str="+i+"]").html().trim());
				var str="";
				var ii=$("[data-str="+i+"]");
				for(let k=0;k<ii.length;k++){
					str+=$(ii[k]).html().trim();
				}
				str=str.toString();
				this.ajax(this,"order/update_order.php?updateOrder=2&aid="+i,1,"updateO");
				this.$router.push("/order/orderConfirm/str="+str);
			},
			// 取消或删除订单
			cancelO:function(e){
				var aid=$(e.target).attr("id");
				if($(e.target).html().trim()=="取消订单"){
					var updateOrder="1";
					var result=window.confirm("确定取消此订单？");
				}else{
					var updateOrder="2";
					var result=window.confirm("确定删除此订单？");
				}
				if(result){
					this.ajax(this,"order/update_order.php?updateOrder="+updateOrder+"&aid="+aid,1,"cancelorder");
				}
			},
			// 获取数据
			getData:function(){
				this.ajax(this,"order/myorder.php",1,"getmyorder");
			}
		},
		mounted(){
			this.getData();
		}
    }
</script>