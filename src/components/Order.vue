<template>
    <div class="bs-od">
        <MyHeader></MyHeader>
        
        <!--主体-->
		<div id="main">
            <!--面包屑导航-->
			<p id="bread_crumb">
				您当前位置：
				<router-link to="/index">心灵驿站</router-link><span> &gt;</span>
				<router-link to="/ucBasic/myOrder">订单</router-link>
			</p>
            <router-view></router-view> 
        </div>

        <Footer></Footer>
    </div>
</template>



<script>
    export default{
        name:'Order',
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
</style>