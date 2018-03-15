<template>
    <div class="bs-ct">
        <!--主体-->
		<div id="main">
			<!--2 页面主体 购物车-->
			<section class="boxfather">
			<!--头部-->
				<div class="table head">
					<h2>购物车</h2>
					<p class="rt">
						已选<b data-sel-count="selcount">0</b>件商品<span>
						合计(不含运费):</span>
						<b data-all-price="allprice">0.00</b><b>元</b>
					</p>
				</div>
			<!--中部-->
				<div class="box">
					<div class="imfor-top">
						<p id="TcheckA" style="cursor: pointer;padding-left:10px;" data-checkA="f" 
						@click.prevent="chkAll()">
							<img src="../../assets/img/cart/product_normal.png" alt="product_normal" 
							@click.prevent="chkAll()">
							全选
						</p>
						<p>商品</p>
						<p class="hidden-xs">单价（元）</p>
						<p>数量</p>
						<p  class="hidden-xs">总金额</p>
						<p>操作</p>
					</div>
					<div id="cartContent" v-if="data.length" v-for="(p,i) in data">
						 	<div class="imfor" :id="p.cid">
							<div class="check">
								<img src="../../assets/img/cart/product_normal.png" 
								alt="product_normal"  data-check="f" class="cimg" :data-id="p.bid"
								@click="chkO($event)">
							</div>
							<div class="product">
								<router-link :to="'/productDetails/bid='+p.bid">
									<img :src="require('../../assets/'+p.md)" :title="p.title" width="15%">
								</router-link>
								<div class="hidden-xs">
									<p>{{p.subtitle}}</p>
									<p>分类：{{p.classification}}</p>
								</div>
							</div>
							<div class="price hidden-xs">
								<a href="index.html" class="home">心灵驿站</a>
								<span>价格：</span>
								<span class="oprice">{{p.price}}</span>
							</div>
							<div class="num">
								<p>
									<button class="reduce" @click="modifycount(false,p.cid,p.count)">-</button>
									<input type="text" :value="p.count" class="valcount"
									 @blur="valcount(p.cid,$event)">
									<button class="add" @click="modifycount(true,p.cid,p.count)">+</button>
								</p>
							</div>
							<div class="total  hidden-xs"><span>￥</span>
								<b class="ocprice">{{(p.price*p.count).toFixed(2)}}</b>
							</div>
							<div class="delete">
								<a href="#" :data-id="p.cid" class="deloc" @click.prevent="clearO(p.cid)">删除</a><br>
								<a href="#" @click.prevent="addtocollect(p.bid,p.price,p.fixprice,p.subtitle,p.md)" class="collect">
									添加收藏
								</a>
							</div>
						</div>
					</div>
				</div>
			<!--尾部-->
				<div class="bottom hidden-xs">
					<p class="lf">
						<span><img class="BcheckA" src="../../assets/img/cart/product_normal.png" alt="product_normal" 
						style="cursor: pointer" @click.prevent="chkAll()"></span>
						<a href="javascript:void(0)" id="BcheckA" @click.prevent="chkAll()">全选</a>
						<a href="#" id="delSel" @click.prevent="delSel()">删除</a>
						<a href="#" class="invalued" id="clearAll" @click="clearA()">清空购物车</a>
					</p>
					<p class="right rt">
						<a href="#" id="order-confirm" @click.prevent="confirmorder()">去结算</a>
					</p>
				</div>
				<div class="visible-xs">
					<a href="#" id="order-confirm" class="xsbtn" @click.prevent="confirmorder()">去结算</a>
				</div>
			</section>
		</div>
    </div>
</template>

<style scoped>
    @import '../../assets/css/cart.css';
</style>

<script>
    export default{
        name:'Cart',
		data:function(){
			return{
				result:[],
				data:[],
				hcount:0
			}
		},
		watch:{
			hcount:function(){
				this.$parent.hcount=this.hcount;
			},
			result:function(){
				// 获取数据
				if(this.result[0]=="getcart"){
					this.data=JSON.parse(this.result[1]).data;
					this.hcount=JSON.parse(this.result[1]).hcount;
				}
				// 移入收藏
				if(this.result[0]=='udcollect'){
					this.udcollect=this.result[1];
					this.mylog(this.udcollect);
					let rs=window.confirm(this.udcollect+"是否前往收藏夹查看");
					if(rs) this.$router.push('/ucBasic/collect');
					return;
				}
				// 更新商品数目
				if(this.result[0]=="upcount"){
					this.getData();
				}
				// 加减商品数目
				if(this.result[0]=="modifycount"){
					this.getData();
				}
				// 清空购物车
				if(this.result[0]=="clearA"){
					this.getData();
				}
				// 单个删除
				if(this.result[0]=="clearO"){
					this.getData();
				}
				// 选中删除
				if(this.result[0]=="delsel"){
					this.getData();
				}
			}
		},
		methods:{
			// 结算
			confirmorder:function(){
				var str=[];
				var imfor=$(".imfor");
				for(var i=0;i<imfor.length;i++){
					console.log($(imfor[i]).children(".check").children("img").attr("src"));
					if($(imfor[i]).children(".check").children("img").attr("src")=="/static/img/product_true.c0ef5d1.png"){
						str+=`{"bid":${$(imfor[i]).children(".check").children("img").data("id")},"count":${$(imfor[i]).children(".num").children().children("input").val()}},`;
					}else{
						continue;
					}
				}
				if(str.length==0){
					alert("请先选择要结算的商品！");
					return false;
				}else{
					this.$router.push("/order/orderConfirm/str="+str);
				}
			},
			// 设置全选属性
			setAattr:function(b){
				if(b){
					$("#TcheckA").data("checkA", "t");
					$("#TcheckA").children("img").attr("src", require("../../assets/img/cart/product_true.png"));
					$("#BcheckA").prev().children("img").attr("src", require("../../assets/img/cart/product_true.png"));
				}else{
					$("#TcheckA").data("checkA", "f");
					$("#TcheckA").children("img").attr("src",  require("../../assets/img/cart/product_normal.png"));
					$("#BcheckA").prev().children("img").attr("src",  require("../../assets/img/cart/product_normal.png"));
				}	
			},
			// 计算选中按钮数目及总价格
			couApri:function(){
				var imgs=$("[data-check]");
				var priceA=0,countA=0;
				for(var img of imgs){
					if($(img).data("check")=="t"){
						priceA+=parseFloat($(img).parent().siblings(".total").children("b").html());
						countA+=parseInt($(img).parent().siblings(".num").children().children("input").val());
					}
				}
				$("[data-sel-count=selcount]").html(countA);
				$("[data-all-price=allprice]").html(priceA.toFixed(2));
			},
			// 全选按钮
			chkAll:function(){
				if($("#TcheckA").data("checkA")=="f") {
					this.setAattr(true);
					$(".cimg").attr("src", require("../../assets/img/cart/product_true.png"));
					$(".cimg").data("check", "t");
				}else{
					this.setAattr(false);
					$(".cimg").attr("src", require("../../assets/img/cart/product_normal.png"));
					$(".cimg").data("check", "f");
				}
				this.couApri();
			},
			// 单选按钮
			chkO:function(e){
				var $this=$(e.target);
				if($this.data("check")=="t"){
					$this.attr("src",  require("../../assets/img/cart/product_normal.png"));
					$this.data("check", "f");
					this.setAattr(false);
				}else{
					$this.data("check", "t");
					$this.attr("src",  require("../../assets/img/cart/product_true.png"));
					var imgs=$(".cimg");
					var priceA=0,countA=0;
					for(var img of imgs){
						if($(img).data("check")=="f"){
							this.setAattr(false);
							break;
						}else {
							this.setAattr(true);
						}
					}
				}
				this.couApri();
			},
			// 删除选中的
			delSel:function(){
				var ids=[],imgs=$("[data-check]");
				for(var img of imgs){
					if($(img).data("check")=="t"){
						ids.push($(img).parents(".imfor").attr("id"));
					}
				}
				//console.log(JSON.stringify(ids).slice(1,-1));
				ids=JSON.stringify(ids).slice(1,-1);
				var rs=window.confirm("确定删除选中的商品吗？");
				if(rs) {this.ajax(this,"cart/update.php?clearS=1&arr="+ids,1,"delsel")}
			},
			// 单个删除
			clearO:function(id){
				this.ajax(this,"cart/update.php?clearO=1&cid="+id,1,"clearO");
			},
			// 清空购物车
			clearA:function(){
				var b = window.confirm("您确认要清空购物车内容吗？");
				if(b){this.ajax(this,"cart/update.php?clearA=1",1,"clearA")}
			},
			/*购物车数量增减*/
			valcount:function(id,e){
				var count =$(e.target).val();//获得商品数量
				this.ajax(this,"cart/update.php?cid="+id+"&count="+count,1,"upcount");
			},
			// 加减购物车
			modifycount:function(b,id,count){
                if (b)
                    count++;
                else {
                    if(count!=0) {
                        count--;
                    }
                }
				this.ajax(this,"cart/update.php?cid="+id+"&count="+count,1,"modifycount");
			},
			// 添加收藏
			addtocollect:function(bid,price,fixprice,subtitle,md){
				let str="str="+bid+
						"__"+price+
						"__"+fixprice+
						"__"+subtitle+
						"__"+md;	
				this.ajax(this,"collect/update.php",2,'udcollect',str);	
			},
			// 获取数据
			getData(){
				this.ajax(this,"cart/list.php",1,"getcart");
			}
		},
		mounted(){
			this.getData();
		}
    }
</script>