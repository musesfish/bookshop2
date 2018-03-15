<template>
    <div class="bs-gtp">
        <!--返回顶部-->
		<div id="totop" @click="gototop" ref="totop"  class="hidden-xs hidden-sm">
			<img src="../../assets/img/code.gif" alt="code">
			<img src="../../assets/img/top.gif" alt="top">
		</div>
    </div>
</template>

<script>
    export default{
        name:"gotoTop",
        data:function(){
            return{
                totop:{}
            }
        },
        methods:{
			/*侧边返回顶部加滚动监听事件*/
			gototop:function(){
				var totop=this.totop;
				window.addEventListener("scroll",()=>{
					var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//目前页面距顶部的滚动距离
					totop.style.visibility=scrollTop>innerHeight/2?"visible":"hidden";//判断返回顶部是否出现
				});
				//window.scrollTo(0,0);//返回顶部
				$("html,body").stop(true).animate({scrollTop:0},500);
			}
        },
        mounted(){
            this.totop=this.$refs.totop;
            this.gototop();
        }
    }
</script>

<style scoped>
    /*返回顶部*/
    .bs-gtp #totop{
        width:53px;
        height:108px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        position:fixed;
        bottom:10px;
        right:10px;
        z-index:99;
        cursor:pointer;
        visibility:hidden;
        transition: all .3s linear;
    }
</style>