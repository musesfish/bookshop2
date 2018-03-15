<template>
    <div class="bs-ix">
        <MyHeader></MyHeader>
        <gototop></gototop>
		<lift></lift>
		<!--主体-->
		<div id="main">
			<!--顶部-->
			<div id="container">
				<!--分类-->
				<div class="classify hidden-xs hidden-sm hidden-md">
					<family></family>
				</div>
				<!--广告-->
				<div class="advert">
					<carousel></carousel>
					<autoplay class="hidden-xs hidden-sm"></autoplay>
				</div>
			</div>
			<!--底部-->
			<!--为您推荐-->
			<div id="recommend" class="commonstyle">
				<a href="products.html"><h2 class="h2">为您推荐</h2></a>
				<p>
					<span class="selected" @mouseover="moveSelect($event)">图书推荐</span>
					<span @mouseover="moveSelect($event)">热卖图书</span>
				</p>
				<section id="recommendDiv" v-if="recommend">
					<div v-for="(pro,i) in recommend">
						<router-link :to="'/productDetails/bid='+pro.pid">
							<img :src="require('../assets/'+pro.pic)">
						</router-link>
						<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
						<span class="author">{{pro.author}}</span>
						<span class="price">￥{{pro.price}}</span>
					</div>
				</section>
			</div>
			<!--图书畅销排行榜-->
			<div id="selling" class="commonstyle">
				<a class="h2" href="products.html" style="margin-bottom:20px;">图书畅销排行榜</a>
				<p>
					<span class="selected"  @mouseover="moveSelect($event)">图书总榜</span>
					<span  @mouseover="moveSelect($event)">少儿</span>
					<span  @mouseover="moveSelect($event)">文学</span>
					<span  @mouseover="moveSelect($event)">小说</span>
					<span  @mouseover="moveSelect($event)">历史</span>
					<span  @mouseover="moveSelect($event)">经济管理</span>
					<router-link :to='"/products/fid/kw"' class="rt">查看更多 &gt;</router-link>
				</p>
				<section id="sellingDiv" v-if="selling">
					<div v-for="(pro,i) in selling">
						<router-link :to="'/productDetails/bid='+pro.pid">
							<img :src="require('../assets/'+pro.pic)">
						</router-link>
						<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
						<span class="author">{{pro.author}}</span>
						<span class="price">￥{{pro.price}}</span>
					</div>
				</section>
			</div>
			<!--热门分类-->
			<div id="hotcategories" style="margin-top:20px;">
				<router-link to='/products'><h2 class="h2" style="min-width:380px;">热门分类</h2></router-link>
				<div v-if="family">
					<div v-for="(f,i) in family" style="margin:4px" >
					<router-link :to="'/products/fid='+f.fid+'/kw'" :class="f.class"></router-link>
					<ul  class="hidden-xs">
						<li><router-link :to="'/products/fid='+f.fid+'/kw'" class="title">{{f.fname}}</router-link></li>
						<li><router-link :to="'/products/fid='+f.fid+'/kw'">{{f.fnames.split("|")[0]}}</router-link></li>
						<li><router-link :to="'/products/fid='+f.fid+'/kw'">{{f.fnames.split("|")[1]}}</router-link></li>
						<li><router-link :to="'/products/fid='+f.fid+'/kw'">{{f.fnames.split("|")[2]}}</router-link></li>
						<li><router-link :to="'/products/fid='+f.fid+'/kw'">{{f.fnames.split("|")[3]}}</router-link></li>
						<li><router-link to='/products' class="lf">查看更多 &gt;</router-link></li>
					</ul>
				</div>
				</div>
			</div>
			<!--图书新品排行榜-->
			<div id="newranking"  class="commonstyle">
				<router-link to="/products"><h2 class="h2" style="margin-bottom:20px;">图书新品排行榜</h2></router-link>
				<p>
					<span class="selected"  @mouseover="moveSelect($event)">图书总榜</span>
					<span  @mouseover="moveSelect($event)">少儿</span>
					<span  @mouseover="moveSelect($event)">文学</span>
					<span  @mouseover="moveSelect($event)">小说</span>
					<span  @mouseover="moveSelect($event)">历史</span>
					<span  @mouseover="moveSelect($event)">经济管理</span>
					<router-link to='/products' class="rt">查看更多 &gt;</router-link>
				</p>
				<section id="newrankingDiv" v-if="selling">
					<div v-for="(pro,i) in selling">
						<router-link :to="'/productDetails/bid='+pro.pid">
							<img :src="require('../assets/'+pro.pic)">
						</router-link>
						<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
						<span class="author">{{pro.author}}</span>
						<span class="price">￥{{pro.price}}</span>
					</div>
				</section>
			</div>
			<!--精选图书推荐-->
			<div id="selectedbooks">
				<router-link to='/products/fid/kw'><h2 class="h2" style="margin-top:20px">精选图书推荐</h2></router-link>
				<router-link to='/products/fid/kw' class="rt">查看更多 &gt;</router-link>
				<div class="autoplays">
					<dl id="selectedDl" v-if="recommended">
						<dd v-for="(pro,i) in recommended" style="margin-bottom:25px;">
							<router-link :to="'/productDetails/bid='+pro.pid">
								<img :src="require('../assets/'+pro.pic)">
							</router-link>
							<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
							<span class="author">{{pro.author}}</span>
							<span class="price">￥{{pro.price}}</span>
						</dd>
					</dl>
				</div>
			</div>
			<!--今日最好价-->
			<div id="bestprice">
				<router-link to="/products/fid/kw"><h2 class="h2" style="margin-top:20px">今日最好价</h2></router-link>
				<router-link to="/products/fid/kw" class="rt">查看更多 &gt;</router-link>
				<div class="autoplays">
					<dl id="bestDl">
						<dd v-for="(pro,i) in top_sale" style="margin-bottom:25px;">
							<router-link :to="'/productDetails/bid='+pro.pid">
								<img :src="require('../assets/'+pro.pic)">
							</router-link>
							<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
							<span class="author">{{pro.author}}</span>
							<span class="price">￥{{pro.price}}</span>
						</dd>
					</dl>
				</div>
			</div>
		</div>

        <Footer></Footer>
    </div>
</template>

<style scoped>
    @import '../assets/css/index.css';
</style>

<script>
	import Carousel from '@/components/utility/Carousel.vue';
	import Autoplay from '@/components/utility/Autoplay.vue';
	import Family from '@/components/utility/Family.vue';
	import gotoTop from '@/components/utility/gotoTop.vue';
	import Lift from '@/components/utility/Lift.vue';
    export default{
		components: {
			'carousel': Carousel,
			'autoplay': Autoplay,
			'family': Family,
			'gototop': gotoTop,
			'lift': Lift
		},
        name:'Index',
		data:function(){
			return{
				result:[],
				floors:[],
				recommend:[],
				selling:[],
				family:[],
				recommended:[],
				top_sale:[]
			}
		},
		watch:{
			result:function(){
				// this.mylog("watch"+this.result);
				if(this.result[0][0]=="floors"){
					this.floors=JSON.parse(this.result[1]);
					this.recommend=this.floors.all;
					this.selling=this.floors.all;
					this.family=this.floors.family;
					this.recommended=this.floors.recommended;
					this.top_sale=this.floors.top_sale;
				}
			}
		},
		methods:{
			// 移动切换视图
			moveSelect:function(e){
				if(e.target.innerHTML=="热卖图书"){
					e.target.className="selected";
					e.target.previousElementSibling.className="";
					this.recommend=this.floors.allreverse;
				}else if(e.target.innerHTML=="图书推荐"){
					e.target.className="selected";
					e.target.nextElementSibling.className="";
					this.recommend=this.floors.all;
				}else if(e.target.innerHTML=="图书总榜"||e.target.innerHTML=="文学"||e.target.innerHTML=="历史"){
					$(e.target).siblings("span").removeClass();
					e.target.className="selected";
					this.selling=this.floors.all;
				}else if(e.target.innerHTML=="少儿"||e.target.innerHTML=="小说"||e.target.innerHTML=="经济管理"){
					$(e.target).siblings("span").removeClass();
					e.target.className="selected";
					this.selling=this.floors.allreverse;
				}
			}
		},
		mounted(){
			this.ajax(this,"index/floors.php",1,"floors");
		}
    }
</script>