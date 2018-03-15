<template>
<div class="bs-mh">
  	<header id="main" class="bs">
		<!--顶部-->
		<div class="bg">
			<div id="top" class="row" style="padding-left:5px;padding-right:5px;">
				<!--左边-->
				<p class="welcome" id="fir" v-if="!isB">
					<span class="hidden-xs">嘿，欢迎来心灵驿站</span>
					<router-link to="/login">登录</router-link>
					<router-link to="/register">免费注册</router-link>
				</p>
				<p class="welcome" id="wel" v-if="isB">
					<span class="hidden-xs">嘿，<a id="username">{{obj.uname}}</a>欢迎来心灵驿站</span>
					<a id="username" class="visible-xs" style="float:left">{{obj.uname}}</a>
					<a href="#" id="clearId" @click="logout()">退出</a>
				</p>
				<!--右边-->
				<p class="server" style="position:relative;">
					<router-link to="/lookforward" class="phone hidden-xs" >手机驿站</router-link>
					<b class="hidden-xs">|</b>
					<router-link to="/service" class="hidden-xs">客户服务</router-link>
					<b class="hidden-xs">|</b>
					<router-link to="/ucBasic" id="mysoul" @mouseenter.native="enter()"
					  @mouseleave.native="leave()" @click.native="enter()" class="mybs">
					  我的驿站
					</router-link>
					<i></i>
					<ul id="dropdown" @mouseenter="enter(true)" @mouseleave="leave(true)" >
						<router-link to="/ucBasic/basic">我的信息</router-link>
						<router-link to="/ucBasic/address">收货地址</router-link>
						<router-link to="/ucBasic/collect">我的收藏</router-link>
						<router-link to="/ucBasic/cart">待购商品</router-link>
						<router-link to="/ucBasic/myOrder">我的订单</router-link>
					</ul>
				</p>
			</div>
		</div>
		<!--底部-->
		<div id="bottom" class="clear row">
			<!--左边-->
			<a href="index.html" alt="logo" class="lside hidden-xs hidden-sm col-md-3"></a>
			<!--右边-->
			<div class="rside visible-xs col-xs-12">
				<div class="rrside">
					<a class="search" href="javascript:">
						<input type="text" placeholder="请输入书籍名称" id="search" v-model="searchval"
						@keyup="gettip()">
						<h2 id="h2" @click="jump()"></h2>
					</a>
					<ul class="searul" id="searul" v-if="search">
						<li v-for="(v , i) in search"
						:id="v.bid" class="lisear" @click="jump(v.title)">{{v.title}}<span>{{v.author}}</span></li>
					</ul>
				</div>
			</div>
			<!--右边-->
			<div class="rside hidden-xs col-sm-9">
				<div class="rrside">
					<a class="search" href="javascript:">
						<input type="text" placeholder="请输入书籍名称" id="search" v-model="searchval"
						@keyup="gettip()">
						<span id="sortspan"  @click="toggleSort()">全部分类</span>
						<b id="sortb"  @click="toggleSort()"></b>
						<h2 id="h2" @click="jump()"></h2>
					</a>
                    <div id="fathers" @mouseleave="leaveHide()" v-if="sorts">
                        <ul id="allsort">
                            <li v-for="(output , k) in sorts" :id="output.fid" 
                              @mouseenter="enterChange(true,k+1)" @click="clickJump(k+1)">{{output.fname}}</li>
                        </ul>
                        <ul :id="'ul'+output.fid" class="sort"  v-for="(output , k) in sorts" 
                           :data-id="output.fid" @enterChange="changestyle(false,k+1)" @click="clickJump(k+1)">
                            <li v-for="val in output.fnames.split('|')">{{val}}</li>
                        </ul>
                    </div>
					<ul class="searul" id="searul" v-if="search">
						<li v-for="(v , i) in search"
						:id="v.bid" class="lisear" @click="jump(v.title)">{{v.title}}<span>{{v.author}}</span></li>
					</ul>
					<p class="hot">
						<router-link to="/products">热搜:</router-link>
						<router-link to="/productDetails/bid=3">我这一辈子</router-link>
						<router-link to="/productDetails/bid=4">活出生命的意义</router-link>
						<router-link to="/productDetails/bid=17">流浪者归来</router-link>
						<router-link to="/productDetails/bid=9">老舍的平民生活</router-link>
					</p>
				</div>
				<p class="hidden-xs hidden-sm hidden-md">
					<router-link to="/ucBasic/cart">
						<span class="cart lf">
							<router-link to="/ucBasic/cart" class="headCart">购物车</router-link>
						    <b data-h-count="headCount" class="headCount">{{cartcount}}</b>
						</span>
                    </router-link>
					<router-link to="/ucBasic/myOrder" class="order rt">我的订单</router-link>
				</p>
			</div>
		</div>
	</header>
</div>
</template>

<style scoped>
    @import '../assets/css/header.css';
</style>

<script>
  export default{
    name:'MyHeader',
    data:function(){
      return {
        msg:'Hello Header',
		result:[],
		sorts:[],
		obj:{},
		cart:[],
		search:[],
		timer:"",
		isB:false,
		cartcount:0,
		searchval:""
      }
    },
	props:["hcount"],
	watch:{
		// 父组件传来的数据
		hcount:function(){
			this.cartcount=this.hcount;
		},
		// 服务器端动态数据
		result:function(){
			//分类数据
			if(this.result[0]=="sortdata"){
				this.sorts=JSON.parse(this.result[1]);
			}
			//登录验证(localstorage)
			if(this.result[0]=="lolog"){
				this.obj=JSON.parse(this.result[1]);
				if(this.obj.code==1){
					this.isB=true;
					this.uname=this.obj.uname;
					this.ajax(this,"cart/list.php",1,"cart");
					sessionStorage.setItem("uname", this.obj.uname);
				}
			}
			//登录验证(session)
			if(this.result[0]=="selog"){
				this.obj=JSON.parse(this.result[1]);
				if(this.obj.ok==1){
					this.isB=true;
					this.uname=this.obj.uname;
					this.ajax(this,"cart/list.php",1,"cart");
					sessionStorage.setItem("uname", this.obj.uname);
				}else{
					this.isB=false;
					sessionStorage.setItem("uname", "");
				}
			}
			//退出登录
			if(this.result[0]=="logout"){
				this.cart=this.result[1];
			}
			//搜索数据
			if(this.result[0]=="search"){
				this.search=JSON.parse(this.result[1]);
			}
			// 购物车
			if(this.result[0]=="cart"){
				this.cartcount=JSON.parse(this.result[1]).hcount;
			}
		}
	},
    methods:{
        // 我的驿站
         enter:function(b){
			 if(b) clearTimeout(this.timer);
			$("#dropdown").show(500);
		 },
		 leave:function(b){
			 if(b) $("#dropdown").show(1000);
			 this.timer=setTimeout(function(){$("#dropdown").hide(500)},100);
		 },
        // 全部分类
        toggleSort:function(){
            $("#allsort").toggle(500);
        },
        enterChange:function(b,k){
             if(b) {
                $("#allsort li").css({
                    "background": "#fff",
                    "color": "#487a6f"
                });
                $(".sort").hide();
                $("#"+k).css({
                    "background": "#fe3227",
                    "color": "white"
                });
            }
            $("#ul" + k).show(300);
        },
        leaveHide:function(){
            $(".sort").css("display","none");
            $("#allsort").hide(500);
        },
        clickJump:function(k){
            this.$router.push("/products/fid="+k+"/kw");
        },
		// 登录模块
		checkLog:function(){
			//判断用户是否在线
			if(localStorage.getItem("uname")){
				// this.mylog("localStorage");//验证cookie是否正确
				var postStr="uname="+localStorage.getItem("uname")+"&upwd="+localStorage.getItem("upwd");
				this.ajax(this,"login/login.php?"+postStr,1,"lolog");
			}else{//专门用于验证服务器session中是否有uid的php
			    // this.mylog("session");
				this.ajax(this,"header/isLogin.php",1,"selog");
			}
		},
		// 退出登录
		logout:function(){
			// this.mylog("logout");
			this.ajax(this,"header/logout.php",1,"logout");
			location.reload();
			localStorage.setItem("upwd","");
			localStorage.setItem("uname","");
		},
		// 跳转到列表页
		jump:function(v){
			// this.mylog(v);
			if(v) this.searchval=v;
			// this.mylog(this.searchval);
			// this.$router.push("/products/''/"+this.searchval);
			this.$router.push("/products/fid/kw="+this.searchval);
			this.search=[];
			this.search=[];
		},
		// 固定搜索框
		fixnav:function(){
			window.addEventListener("scroll",function(){
				var div=document.querySelector("#bottom");//fixed_nav
				var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
				if(div!=undefined)
					div.className=scrollTop>100?"fixed_nav clear bottom":"bottom clear";
			})
		},
		// 搜索帮助
		gettip:function(){
			// this.mylog(this.searchval);
			this.ajax(this,"header/search.php?kw="+this.searchval,1,"search");
		}
    },
    mounted(){
        // 挂载及判断在线完成即加载数据
        this.ajax(this,"header/sort.php",1,"sortdata");
		// this.mylog(this.hcount);
		// // 验证登录
		this.checkLog();
		this.fixnav();
    }
  }
</script>