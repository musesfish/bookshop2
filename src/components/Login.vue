<template>
    <div id="main" class="bs-lg">
			<div class="container bs">
				<div class="lside row">
					<router-link to="/index" class="logo float">
						<img src="../assets/img/book_logo.png" alt="logo">
					</router-link>
					<a href="index.html" class="ad hidden-xs hidden-sm"><img src="../assets/img/login/adimg.gif" alt="adimg"></a>
				</div>
				<div class="rside">
					<div id="login">
						<p class="logtitle">
							<span>登录心灵驿站</span>
						</p>
						<p class="yhm">
							<input type="text" id="uname" placeholder="请输入您的用户名" maxlength="8" 
							@blur="cheknull" v-model="uname">
							<span>用户名不为空</span>
						</p>
						<p class="mm">
							<input type="password" id="upwd" placeholder="请输入您的密码" 
							@blur="cheknull" maxlength="12" v-model="upwd">
							<span>密码不为空</span>
						</p>
                        <div id="vcode" class="vcodes hidden">
                        	<img src="http://localhost/github-pages/bookshop2/bookshop2/data/login/code_gg.php" class="change_img">
                            <!--<img src="http://soulstore.applinzi.com/data/login/code_gg.php" class="change_img">-->
                            <!--<img src="http://localhost/tpl/data/login/code_gg.php" class="change_img">-->
                            <input type="text"  name="vcode" placeholder="验证码" required v-model="vcode"/>
                            <a href="#" class="change_vcode" @click="changeCode(this)">看不清 换一张</a>
                        </div>
						<p class="auto">
							<input type="checkbox" id="autolg">自动登录
							<a href="#">忘记密码?</a>
						</p>
							<input type="button" value="登录" id="btnlogin" @click="logbtn()"
							@keydown.enter="logbtn()">
						<p>
							<router-link to="/register">立即注册</router-link>
						</p>
					</div>
				</div>
			</div>
        <Footer></Footer>    
		</div>
</template>

<style scoped>
    @import '../assets/css/login.css';
</style>

<script>
    export default{
        name:'Login',
		data:function(){
			return{
				uname:"",
				upwd:"",
				vcode:"",
				result:[],
				logdata:[],
				vlogdata:{},
				vcode_count_fail:0
			}
		},
		watch:{
			result:function(){
				// this.mylog("数据发生变化："+this.result);
				if(this.result[0]=="logdata"){
					this.logdata=JSON.parse(this.result[1]);
				}
				if(this.result[0]=="vlogdata"){
					this.vlogdata=JSON.parse(this.result[1]);
					// this.mylog(this.vlogdata.msg);

					if(this.vlogdata.code==1){
						sessionStorage.setItem("uid",this.vlogdata.uid);
						sessionStorage.setItem("uname",this.uname);
						// this.mylog(1);
						alert(decodeURI(this.vlogdata.msg));
						//如果自动登录被选中
						if($("#autolg").is(":checked")){
							localStorage.setItem("upwd",this.upwd);
							localStorage.setItem("uname",this.uname);
						}
						this.$router.push("/index");
						this.vcode_count_fail=1;
						this.validatorVcode();
					}else{
						// this.mylog(2);
						alert(this.vlogdata.msg);
						this.vcode_count_fail++;
						this.validatorVcode();
					}
				}
			}	
		},
		methods:{
			//如果用户输入用户名或密码的错误超过2次，显示验证码
			validatorVcode:function(){
				sessionStorage.setItem("vcode_count_fail",this.vcode_count_fail);
				if(this.vcode_count_fail>2){
					$(".vcodes").removeClass("hidden");
				}
			},
			//看不清切换验证码
			changeCode:function(e){
				e.preventDefault();
				$(".change_img").attr("src","data/login/code_gg.php");
			},
			// /*登录名密码失焦验证*/
			cheknull:function(e){
				// this.mylog(e.target.value);
				if(e.target.value==""){
					// console.log(e.target.nextSibling);
					e.target.nextElementSibling.style.visibility="visible";
				}
			},
			/*登录按钮验证*/
			logbtn:function(){
				if(this.uname!=""&&this.upwd!=""){
					let v = this.vcode; //验证码
					let vreg = /^[a-z0-9]{4}$/i;//验证用户输入的数据
					//当登录次数超过2次而且验证码输的不正确才验证
					if(this.vcode_count_fail>2 && !vreg.test(v)){
						alert("验证码格式不正确: 只能是4 位字母数字");
						return;
					}
					let postStr="uname="+this.uname+"&upwd="+this.upwd;
					// this.mylog(postStr);
					this.ajax(this,"login/login.php?"+postStr,1,"vlogdata");
				}else{
					$("#uname").next().css("visibility","visible");
					$("#upwd").next().css("visibility","visible");
				}
			}
		},
		mounted:function(){
			// console.log("4挂载后");
			// 判别session会话是否存有记录(自动填充数据)
			if(sessionStorage.getItem("uname")){
				this.uname=sessionStorage.getItem("uname");
				this.upwd=sessionStorage.getItem("upwd");
			}
			// 如果localStorage有记录自动去服务端验证后跳去首页
			if(localStorage.getItem("uname")){
				let postStr="uname="+localStorage.getItem("uname")+"&upwd="+localStorage.getItem("upwd");
				this.ajax(this,"login/login.php?"+postStr,1,"logdata");
				if(this.logdata.code==1){
					alert(this.logdata.msg);
					this.$router.push("/index");
				}
			}
			//密码验证出错的次数
			this.vcode_count_fail = sessionStorage.getItem("vcode_count_fail");
			if(this.vcode_count_fail == null){
				this.vcode_count_fail = 1;
			}	
			//防止用户输入错误超过2次刷新页面，“刷新页面立即验证”
   			this.validatorVcode();
		}
    }
</script>