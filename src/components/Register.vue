<template>
    <div class="bs-re">
        <div id="main" class="bs">
            <router-link to="/index" class="logo">
                <img src="../assets/img/book_logo.png" alt="logo">
            </router-link>
			<p class="register"><span>新用户注册</span></p>
			<div class="container">
				<form name="regform">
					<p>新用户注册
                    <router-link to="/login">直接登录</router-link>
                    </p>
					<table>
						<tr>
							<td>用户名：</td>
							<td><input type="text" placeholder="请输入用户名" maxlength="9" autofocus="onfocus" name="uname">
							<span>3-6个字符，由字母、数字、_组成</span>
							</td>
						</tr>
						<tr>
							<td>登录密码：</td>
							<td><input type="password" placeholder="请输入密码" maxlength="9" name="upwd"></td>
						</tr>
						<tr>
							<td>确认密码：</td>
							<td><input type="password" placeholder="请确认密码" maxlength="9" name="upwds"></td>
						</tr>
						<tr>
							<td>邮箱：</td>
							<td><input type="email" placeholder="请输入邮箱地址" name="email"></td>
						</tr>
						<tr>
							<td>手机号：</td>
							<td><input type="phone" placeholder="请输入您的手机" name="phone"></td>
						</tr>
						<tr>
							<td></td>
							<td><input type="button" value="提交注册信息" id="submit" @click="subreg()"></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
        <Footer></Footer>
    </div>
</template>

<style scoped>
    @import '../assets/css/register.css';
</style>

<script>
    export default{
        name:'Register',
		data:function(){
			return{
				arrfoc:["3-6个字符，由字母、数字、_组成","密码长度为6-12位","请再次输入密码","请输入合法邮箱","请输入合法手机号"],
		        arrblu:[
					[/^\w{3,6}$/,"用户名不为空"],[/^.{6,12}$/,"密码不为空"],[/^.{6,12}$/,"密码长度不为空"],
					[/^[/\w-]+@([/\w-])+(.[/\w-])+$/,"邮箱不为空"],[/^1[34578]\d{9}$/,"手机号不为空"]
				],
				focMsg:"",
				bluMsg:[],
				result:[],
				regdata:"",
				regbtndata:"",
				oDiv:{},
				oIpt:{}
			}
		},
		watch:{
			result:function(){
				// this.mylog(this.result+"is changed");
				if(this.result[0]=="regdata"){
					// this.mylog(this.result);
					this.regdata=this.result[1];
					this.mylog(this.regdata);
					var tip=this.regdata.split(",");
					if(tip[0]){//用户名可以使用
						this.oIpt[0].nextElementSibling.style.backgroundColor="green";
						this.oIpt[0].nextElementSibling.innerHTML=tip[1];
					}else{//用户名重复
						this.oIpt[0].nextElementSibling.innerHTML=tip[1];
					}
				}
				if(this.result[0]=="regbtndata"){
					// this.mylog(this.result);
					this.regbtndata=this.result[1];
					var tip=this.regbtndata.split(",");
					String.prototype.trim=function() {
						return this.replace(/(^\s*)|(\s*$)/g,'');
					}
					sessionStorage.setItem("uid",tip[0]);
					sessionStorage.setItem("uname",tip[1]);
					sessionStorage.setItem("upwd",tip[2].trim());
					this.$router.push("/login");
				}
			}
		},
		methods:{
			valiEvent:function(msg){
				var _this=this;
				/*聚焦提示 利用重载 执行不同的语句*/
				if(msg==this.focMsg){
					// 利用闭包机制 保护重用变量this
					return function(){
						// console.log(this.nextSibling);
						this.nextElementSibling.style.visibility="visible";
						this.nextElementSibling.innerHTML=msg;
					}
				}else if(msg==this.bluMsg){/*失焦提示*/
					return function(){
						this.nextElementSibling.style.backgroundColor="red";
						this.nextElementSibling.style.color="white";
						/*为空提示*/
						if(this.value==""){
							this.nextElementSibling.innerHTML=msg[1];
						}else{
							/*正则正确时 给出提示*/
							if(msg[0].test(this.value)){
								this.nextElementSibling.style.backgroundColor="green";
								this.nextElementSibling.innerHTML="输入正确";
								/*用户名在格式正确下进行 重复验证*/
								if(this.name=="uname"&&this.nextElementSibling.innerHTML=="输入正确"){
									_this.ajax(_this,"register/register.php?uname="+this.value,1,"regdata");
								}
							}else{
								this.nextElementSibling.innerHTML="格式错误";
							}
							/*不管格式正确与否 确认密码是否一样验证*/
							if(this.name=="upwds"){
								if(this.value!=_this.oIpt[1].value){
									this.nextElementSibling.style.backgroundColor="red";
									this.nextElementSibling.innerHTML="两次密码输入不一致";
								}
							}
						}
					}
				}
			},
			subreg:function(){
				let b=true;
				for(let i=1;i<this.oIpt.length-1;i++){
					if(this.oIpt[i].nextSibling.innerHTML!="输入正确"){
						b=false;
						break;
					}
				}
				if(this.oIpt[0].nextSibling.innerHTML!="用户名可以使用！"&&b){
					// let postStr="uname="+this.oIpt[0].value+"&upwd="+this.oIpt[1].value+"&email="
					// +this.oIpt[3].value+"&phone="+this.oIpt[4].value;
					let postStr=$("[name=regform]").serialize();
					// this.mylog(postStr);
					this.ajax(this,"register/register.php","2","regbtndata",postStr);
				}
				return false;
			}
		},
		mounted:function(){
			this.oDiv=document.getElementsByClassName("container")[0];
 			this.oIpt=this.oDiv.getElementsByTagName("input");
			for(var i=0;i<this.oIpt.length-1;i++){
				/*在input后追加span元素并设置隐藏*/
				var span=document.createElement("span");
				if(i!=0){
					this.oIpt[i].parentNode.appendChild(span);
					this.oIpt[i].nextSibling.style.visibility="hidden";
				}
				/*input失焦聚焦验证 多次调用创建多个闭包*/
				this.oIpt[i].onfocus=this.valiEvent(this.focMsg=this.arrfoc[i]);
				this.oIpt[i].onblur=this.valiEvent(this.bluMsg=this.arrblu[i]);
			}

		}
    }
</script>