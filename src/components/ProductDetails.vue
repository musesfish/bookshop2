<template>
    <div class="bs-pd">
        <MyHeader :hcount="hcount"></MyHeader>
		<gototop></gototop>
		<!--主体-->
		<div id="main">
			<!--容器-->
			<div id="container">
				<!--侧边-->
				<aside class="hidden-xs hidden-sm hidden-md">
					<!--分类-->
					<div class="classify">
						<family></family>
					</div>
					<!--二维码-->
					<div class="code">
						扫描二维码下载客户端
					</div>
					<!--排行版-->
					<div class="rank">
						<span>同类图书排行版</span>
						<ul v-if="all.length!=0">
							<li class="active">
								<span class="top">01</span>
								<a href="#">
									<img :src="require('../assets/'+all[0].md)">
								</a>
								<div>
									<a @click="()=>{this.getData(all[0].bid)}" href="#">
										{{all[0].title}}</a>
									<span>{{all[0].author}}</span>
									<b>￥{{all[0].price}}</b>
								</div>
							</li>
							<li>
								<span class="top">02</span>
								<a @click="()=>{this.getData(all[1].bid)}" href="#">
										{{all[1].title}}</a>
								<span>￥{{all[1].price}}</span>
							</li>
							<li><span class="top">03</span>
								<a @click="()=>{this.getData(all[2].bid)}" href="#">
										{{all[2].title}}</a>
								<span>￥{{all[2].price}}</span>
							</li>	
							<li v-for="(pros,i) in all" v-if="i>2">
								<span>0{{i}}</span>
								<a @click="jump(pros.bid)" href="#">
										{{pros.title}}</a>
								<span>￥{{pros.price}}</span>
							</li>
							<li><router-link to="/products">查看更多图书 &gt;</router-link></li>
						</ul>
					</div>
				</aside>
				<!--主体-->
				<section class="mypros">
					<!--产品-->
					<div id="products">
						<!--面包屑导航-->
						<p id="bread_crumb">
							<router-link to="/index">心灵驿站</router-link><span>&gt;</span>
							<router-link to="/products">社会/财经</router-link><span>&gt;</span>
							<router-link :to="'/productDetails/bid='+book.bid"
							v-if="book.length!=0">寻找时间的人</router-link>
						</p>
						<!--产品详情-->
						<div class="visible-xs xsimg">
							<a href="#" v-if="book.length!=0">
								<img :src="require('../assets/'+book.md)">
							</a>
						</div>
						<div id="product_details" v-if="book.length!=0">
						    <magnifier :booktoson="book"></magnifier>
							<div class="show_details">
								<h2>{{book.title}}</h2>
								<p class="details">{{book.subtitle}}</p>
								<div class="price">
									<p>售 价:<span>￥</span><b>{{book.price}}</b><a href="#read">
										<i class="hidden-xs">读书简介</i></a></p>
									<p>定 价：￥<b>{{book.fixprice}}</b></p>
								</div>
								<p>作者：{{book.author}}</p>
								<p>出版社：{{book.publish}}</p>
								<p>出版时间：{{book.publish_time}}</p>
								<p>字数：{{book.word_count}}</p>
								<p>所属分类：{{book.classification}}</p>
								<div class="btn">
									<a href="#" id="add-cart" data-bid="book.bid" 
										@click.prevent="addtocart(book.bid)">加入购物车</a>
									<a href='#' @click.prevent="gotobuy(book.bid)" >立即购买</a>
									<a href="#" id="collect" 
										@click.prevent="addtocollect(book.bid,book.price,book.fixprice,book.subtitle,book.md)">收藏</a>
								</div>
							</div>
						</div>
                        <p id="read"></p>
						<!--为你推荐-->
						<div class="recommend hidden-xs hidden-sm">
							<p>为你推荐</p>
							<!--自播-->
							<div class="autoplay" id="automatic" >
								<dl v-if="books.length!=0">
									<dt>
										<span id="pre" @click="clickli(true)"></span>
									</dt>
									<dd v-for="(b,i) in books" v-if="i<indb && i>=inds">
										<img :src="require('../assets/'+b.md)" :title="b.title">
										<router-link :to="'/productDetails/'+b.bid">{{b.title}}</router-link>
										<span class="price">￥{{b.price}}</span>
									</dd>
									<dt>
										<span id="next" @click="clickli(false)"></span>
									</dt>	
								</dl>
							</div>
							<ul id="ul">
								<li :class="{active:inds==0}"  @click="()=>{this.inds=0,this.indb=4}"></li>
								<li :class="{active:inds==4}" @click="()=>{this.inds=4,this.indb=8}"></li>
								<li :class="{active:inds==8}" @click="()=>{this.inds=8,this.indb=12}"></li>
							</ul>
						</div>
						<!--读书简介-->
						<div class="catalog visible-xs">
							<p><span>读书简介</span></p>
							<ul>
								<li v-if="book">{{book.subtitle}}</li>
							</ul>
						</div>
						<div class="summary hidden-xs"  id="catalog">
							<p>
								<a class="selected">读书简介</a>
								<a href="#catalog" class="hidden-xs">目录</a>
								<a href="#comment">累计评论</a>
							</p>
							<div class="content" id="content" v-if="book">{{book.subtitle}}</div>
						</div>
						<!--目录-->
						<div class="catalog"  id="comment">
							<p><span>目录</span></p>
							<ul>
								<li>前言</li>
								<li>PART1 ...</li>
								<li>PART2 ...</li>
								<li>PART3 ...</li>
								<li>PART4 ...</li>
								<li>PART5 ...</li>
							</ul>
						</div>
						<!--累计评论-->
						<div class="cumulative_comment">
                            <p><span>累计评论 {{commentCount}} 条</span></p>
							<dl v-if="comments.length!=0">
								<dd v-for="(c,i) in comments">
									<div>
										<a class="headimg" href="#">
											<img :src="require('../assets/'+c.avatar)" v-if="c.avatar!=null">
											<img src="../assets/img/avatar/default.png" v-else>
										</a>
										<p class="author">{{c.uname}}</p>
									</div>
									<div>
										<p class="view">{{c.comment}}</p>
									</div>
								</dd>
							</dl>
						</div>
						<!--发表评论-->
						<div class="comment">
							<textarea placeholder="发表评论，分享你的看法吧！" id="mycomment"
							v-model="newcomment"></textarea>
							<a id="public" style="cursor: pointer" @click.prevent="addcomment()">发表评论</a>
						</div>
					</div>
				</section>
			</div>
		</div>
        <Footer></Footer>
    </div>
</template>

<style scoped>
    @import '../assets/css/product_details.css';
</style>

<script>
	import gotoTop from '@/components/utility/gotoTop.vue';
	import Family from '@/components/utility/Family.vue';
	import Magnifier from '@/components/utility/Magnifier.vue';
    export default{
		components:{
			'gototop':gotoTop,
			'family':Family,
			'magnifier':Magnifier
		},
        name:'ProductDetails',
		data:function(){
			return{
				bid:0,
				result:[],
				myresult:[],
				book:[],
				all:[],
				books:[],
				commentCount:0,
				comments:[],
				newcomment:"",
				newcomm:"",
				hcount:0,
				indb:4,
				inds:0
			}
		},
		watch:{
			$route:function(){
				this.bid=this.$route.params.bid.split("=")[1];
				this.getData(this.bid);
			},
			result:function(){
				// 页面数据
				if(this.result[0][0]=="bsdetail"){
					this.myresult=JSON.parse(this.result[1]);
					// this.mylog(this.myresult);
					this.book=this.myresult.book;
					this.all=this.myresult.all;
					this.books=this.myresult.books;
					this.commentCount=this.myresult.commentCount;
					return;
				}
				// 获取评论
				if(this.result[0]=="comms"){
					// this.mylog(JSON.parse(this.result[1]));
					this.comments=JSON.parse(this.result[1]);
				}
				// 收藏
				if(this.result[0]=='udcollect'){
					this.udcollect=this.result[1];
					// this.mylog(this.udcollect);
					let rs=window.confirm(this.udcollect+"是否前往收藏夹查看");
					if(rs) this.$router.push('/ucBasic/collect');
					return;
				}
				// 购物车
				if(this.result[0]=='cartlist'){
					//头部购物车实时显示购物车内数据总数的容器
					this.hcount=JSON.parse(this.result[1]).hcount;
					let rs=window.confirm("添加成功，是否前往购物车查看");
					if(rs) this.$router.push('/ucBasic/cart');
					return;
				}
				// 添加评论
				if(this.result[0]=='newcomm'){
					this.newcomm=JSON.parse(this.result[1]);
					if(this.newcomm.code){
						alert(this.newcomm.msg);
						this.getComm();
						this.newcomment="";
					}else{
						alert(this.newcomm.msg);
					}
					return;
				}
			}
		},
		methods:{
			// 排行榜
			jump:function(id){
				this.getData(id);
			},
			// 推荐商品点击
			clickli:function(b){
				if(b){//pre
					if(this.inds==0){
						this.inds=8;
						this.indb=13;
					}else{
						this.inds-=4;
						this.indb-=4;
					}
				}else{//next
					if(this.inds==8){
						this.inds=0;
						this.indb=4;
					}else{
						this.inds+=4;
						this.indb+=4;
					}
				}
			},
			// 发表评论
			addcomment:function(){
				 if(!sessionStorage["uname"]){
					alert("请先登录！");
					this.$router.push("/login");
				}else{
					if(this.newcomment){
						this.ajax(this,"product_details/add_comment.php?comment="+this.newcomment+
						"&bid="+this.bid,1,"newcomm");
					}
				}
			},
			// 立即购买
			gotobuy:function(bid){
				this.mylog(bid);
				this.$router.push('/order/orderConfirm/str={"bid":'+bid+',"count":1},');
			},
			// 加入购物车
			addtocart:function(i){
				if($("#fir").is(":visible")){//假如登录区为未登录状态
					alert("请先登录!");//提醒用户先登录
					this.$router.push("/login");
				}else{
					//点击加入购物车时 把商品id（session中用户id）给到服务器端 进行对应的购物车更新或插入操作
					this.ajax(this,"cart/add.php",2,'addcart',"bid="+i);	
					//请求用户的所有购物车内数据 更新用户的购物车内容
					this.ajax(this,"cart/list.php",1,'cartlist');	
				}
			},
			// 添加收藏
			addtocollect:function(bid,price,fixprice,subtitle,md){
				if($("#fir").is(":visible")){
					alert("请先登录！");
					this.$router.push("/login");
				}else{
					let str="str="+bid+
							"__"+price+
							"__"+fixprice+
							"__"+subtitle+
							"__"+md;	
					this.ajax(this,"collect/update.php",2,'udcollect',str);	
				}
			},
			// 获取评论数据
			getComm:function(){
				this.ajax(this,"product_details/comments.php?bid="+this.bid,1,"comms");
			},
			// 获取页面数据
			getData:function(b){
				this.ajax(this,"product_details/product_details.php?bid="+b,1,"bsdetail");
			}
		},
		mounted(){
			this.bid=this.$route.params.bid.split("=")[1];
			this.getComm();
			this.getData(this.bid);
		}
    }
</script>