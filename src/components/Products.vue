<template>
    <div class="bs-pr">
        <MyHeader :hcount="hcount"></MyHeader>
        <gototop></gototop>
		<!--主体-->
		<div id="main">
			<!--面包屑导航-->
			<p id="bread_crumb">
				<router-link to="/index">心灵驿站</router-link><span>&gt;</span>
				<router-link to="/products">图书分类</router-link>
			</p>
			<!--分类-->
			<div id="family">
				<ul @click="getSort($event)">
					<li>
						<ul class="classify">
							<li>分类</li>
							<li>文艺</li>
							<li>童书</li>
							<li>生活</li>
							<li>人文社科</li>
							<li>经营</li>
							<li>科技</li>
						</ul>
					</li>
					<li>
						<ul class="price">
							<li>价格</li>
							<li>1-19</li>
							<li>19-29</li>
							<li>29-40</li>
							<li>50-100</li>
						</ul>
					</li>
                    <li id="author">
                        <ul class="score">
                            <li>作者</li>
                            <li class="hidden-xs">钱儿妈</li>
                            <li>冀剑制</li>
                            <li>老舍</li>
                            <li class="hidden-xs hidden-sm">特立独行的猫</li>
                            <li class="hidden-xs">弗兰克尔</li>
                            <li>匪我思存</li>
                            <li class="hidden-xs hidden-sm">马尔科姆</li>
                            <li>卓雅</li>
                            <li>舒乙</li>
                        </ul>
                    </li>
					<li>
						<ul class="discount">
							<li>折扣</li>
							<li>3折以下</li>
							<li>3-5折</li>
							<li>5-7折</li>
							<li>7折以上</li>
						</ul>
					</li>
				</ul>
			</div>
			<!--选项头-->
			<nav>
				<dl @click="getTitle($event)">
					<dd class="active" data-id="allsort">综合排序</dd>
					<dd data-id="discount">折扣</dd>
					<dd data-id="author">作者</dd>
					<dd data-id="publish">出版社</dd>
					<dd data-id="price">价格</dd>
					<dd id="pages" v-if="data"><span>{{parseInt(pageNo)+1}}/{{pageCount}}</span></dd>
				</dl>
			</nav>
			<!--分类详情-->
			<div id="classification" class="table clear" v-if="data">
				<div v-for="(p,i) in data">
					<router-link class="preview" :to='"/productDetails/bid="+p.bid'>
						<img :src="require('../assets/'+p.md)">
					</router-link>
					<dl class="describe">
						<dd class="title">
							<router-link :to='"/productDetails/bid="+p.bid'>{{p.title}}</router-link>
							<router-link to="/index" class="home hidden-xs">心灵驿站</router-link>
						</dd>
						<dd class="price"><span>￥{{p.price}}</span>{{p.discount}}</dd>
						<dd class="author">{{p.author}}</dd>
						<dd class="comment">{{p.publish}}&nbsp;&nbsp;
							<router-link to="/products">{{p.classification}}</router-link></dd>
						<dd class="details">{{p.subtitle}}</dd>
						<dd class="btn">
							<a href="#" class="add-cart" @click.prevent="addtocart(p.bid)">加入购物车</a>
							<a href="#" @click.prevent="gotobuy(p.bid)" class="redbtn hidden-xs">立即购买</a>
							<a href="#" @click.prevent="addtocollect(p.bid,p.price,p.fixprice,p.subtitle,p.md)" 
								class="add-collect hidden-xs">收藏</a>
						</dd>
					</dl>
				</div>
			</div>
			<!--页码-->
			<div id="page">
				<ul v-if="pageCount">
				    <li @click="getPage(true)" id="prePage" :class="{disabled:pageNo==0}">上一页</li>
                    <li  :class="{active:pageNo==i}" 
						v-if="i>pageNo-2 && i<parseInt(pageNo)+2" 
						v-for="(v,i) in pageCount" 
                        @click="getData(i)">{{v}}
                    </li>
                    <li @click="getPage(false)" id="nextPage" :class="{disabled:pageNo==pageCount-1}">下一页</li>
				</ul>
			</div>
		</div>

        <Footer></Footer>
    </div>
</template>

<style scoped>
    @import '../assets/css/products.css';
</style>

<script>
	import gotoTop from '@/components/utility/gotoTop.vue';
    export default{
		components:{
			'gototop':gotoTop
		},
        name:'Products',
		data:function(){
			return{
				kw:"",
				fid:0,
				result:[],
				data:[],
				pageNo:0,
				pageCount:0,
				count:0,
				pageSize:0,
				udcollect:"",
				isB:true,
				hcount:0
			}
		},
		watch:{
			result:function(){
				if(this.result[0][0]=="pros"){
					this.data=JSON.parse(this.result[1]).data;
					this.pageNo=JSON.parse(this.result[1]).pageNo;
					this.pageCount=JSON.parse(this.result[1]).pageCount;
					this.count=JSON.parse(this.result[1]).count;
					this.pageSize=JSON.parse(this.result[1]).pageSize;
					return;
				}
				if(this.result[0]=='udcollect'){
					this.udcollect=this.result[1];
					this.mylog(this.udcollect);
					let rs=window.confirm(this.udcollect+"是否前往收藏夹查看");
					if(rs) this.$router.push('/ucBasic/collect');
					return;
				}
				if(this.result[0]=='cartlist'){
					//头部购物车实时显示购物车内数据总数的容器
					this.hcount=JSON.parse(this.result[1]).hcount;
					let rs=window.confirm("添加成功，是否前往购物车查看");
					if(rs) this.$router.push('/ucBasic/cart');
					return;
				}
			}
		},
		methods:{
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
			// 立即购买
			gotobuy:function(bid){
				this.mylog(bid);
				this.$router.push('/order/orderConfirm/str={"bid":'+bid+',"count":1},');
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
			// 选项头事件
			getTitle:function(e){
				if(e.target.innerHTML=="综合排序"){
					if(this.isB){
						this.getData(0,'',"d");
						this.isB=false;
					}else{
						this.getData(0,"","u");
						this.isB=true;
					}
					return;
				}
				if(e.target.innerHTML=="折扣"){
					if(this.isB){
						this.getData(0,"","",100000,0,"","","","d");
						this.isB=false;
					}else{
						this.getData(0,"","",100000,0,"","","","u");
						this.isB=true;
					}
					return;
				}
				if(e.target.innerHTML=="作者"){
					if(this.isB){
						this.getData(0,"","",100000,0,"","d");
						this.isB=false;
					}else{
						this.getData(0,"","",100000,0,"","u");
						this.isB=true;
					}
					return;
				}
				if(e.target.innerHTML=="出版社"){
					if(this.isB){
						this.getData(0,"","",100000,0,"","","","","d");
						this.isB=false;
					}else{
						this.getData(0,"","",100000,0,"","","","","u");
						this.isB=true;
					}
					return;
				}
				if(e.target.innerHTML=="价格"){
					if(this.isB){
						this.getData(0,"","d");
						this.isB=false;
					}else{
						this.getData(0,"","u");
						this.isB=true;
					}
					return;
				}
			},
			// 分类事件
			getSort:function(e){
				let val=e.target.innerHTML;
				if(e.target.parentNode.className=="classify"){
					this.getData(0,val);
					return;
				}
				if(e.target.parentNode.className=="price"){
					let price=e.target.innerHTML.split("-");
					this.getData(0,"","",price[1],price[0]);
					return;
				}
				if(e.target.parentNode.className=="discount"){
					this.getData(0,"","",100000,0,"","",val);
					return;
				}
				if(e.target.parentNode.className=="score"){
					this.getData(0,"","",100000,0,val);
					return;
				}
			},
			// 上下页事件
			getPage:function(b){
				if(this.pageNo>0 && b) this.getData(this.pageNo-1);
				if(!b && this.pageNo<this.pageCount-1) this.getData(parseInt(this.pageNo)+1);
			},
			// 获取数据
			getData:function(pno=0,classify="",priced="",hprice=100000,lprice=0,author="",authord="",
				discount="",discountd="",publicd="",kw="",fid=0){
				let postStr=
					"pno="+pno+
					"&classify="+classify+
					"&priced="+priced+
					"&hprice="+hprice+
					"&lprice="+lprice+
					"&author="+author+
					"&authord="+authord+
					"&discount="+discount+
					"&discountd="+discountd+
					"&publicd="+publicd+
					"&kw="+kw+
					"&fid="+fid;
				this.ajax(this,"products/products.php?"+postStr,1,"pros");
			}
		},
		mounted(){
			if(this.$route.params.kw!=undefined && this.$route.params.fid!=undefined){
				this.kw=this.$route.params.kw.split("=")[1];
				this.fid=this.$route.params.fid.split("=")[1];
			}
			this.getData(0,'','',10000,0,'','','','','',this.kw,this.fid);
		}
    }
</script>