<template>
    <div class="bs-uc">
        <MyHeader :hcount="hcount"></MyHeader>
        
        <!--主体-->
		<div id="main">
			<!--2 页面主体-->
			<!--面包屑导航-->
			<p id="bread_crumb">
				您当前位置：
				<router-link to="/index">心灵驿站</router-link><span> &gt;</span>
				<router-link to="/ucBasic">个人中心</router-link>
			</p>
			<!--盒子-->
			<div id="box">
				<!--主体--> 
                <router-view class="view" keep-alive transition transition-mode="out-in"></router-view>  
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    export default{
        name:'ucBasic',
        data:function(){
            return{
                hcount:0
            }
        },
        methods:{
            chklog:function(){
                //要求用户在线事件
                if(!sessionStorage["uname"]){
                    alert("请先登录！");
					this.$router.push("/login");
                }
            }
        },
        mounted(){
            this.chklog();
        }
    }
</script>

<style scoped>
    /*面包屑导航*/
	@media (min-width:1px) AND (max-width:768px){
		.bs-uc #bread_crumb{
			margin-top:-50px;
		}
	}
    .bs-uc #bread_crumb{
        height:36px;
        padding-top:10px;
    }
    .bs-uc #bread_crumb a{
        color:#636363;
        padding-right:3px;
    }
    /* 盒子 */
    .bs-uc #box{
        display:flex;
        justify-content:center;
        width:100%;
        background:#fff;
        padding:0;
        margin:0;
        min-width:320px;
    }
</style>