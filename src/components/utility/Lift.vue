<template>
    <div class="bs-lf">
        <ul id="floor" ref="lift" class="hidden-xs">
			<li class="lift_item_on">为你推荐</li>
			<li>畅销排行</li>
			<li>热门分类</li>
			<li>新品排行</li>
			<li>精选推荐</li>
			<li>今日好价</li>
		</ul>
    </div>
</template>

<script>
    export default{
        name:"Lift",
        data:function(){
            return{
				lift:{}
            }
        },
        methods:{
            /*加载滚动楼层导航函数（获取目标元素距页面顶部距离）*/
			getTotalTop:function(elem){
				var sum=0;
				if(elem){
					do{
						sum+=elem.offsetTop;//获取元素到父元素（包裹着元素）的上边距
						elem=elem.offsetParent;//获取元素的“父元素（包裹着元素）”
					}while(elem);
				}
				return sum;
			},
            /*侧边导航加滚动监听事件*/
			lightLift:function(){
				window.addEventListener("scroll",()=>{
					var lift=this.lift;
					var lshowtop=this.getTotalTop(document.getElementById("recommend"));//第一楼距页面顶部的距离
					var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//目前页面距顶部的滚动距离
					lift.style.display=scrollTop>(lshowtop-300)?"block":"none";//判断导航是否出现
					/*滚动过程侧边导航点灯事件*/
					if(lift.style.display=="block"){
						var fs=document.querySelectorAll("#recommend,#selling,#hotcategories,#newranking,#selectedbooks,#bestprice");
						//获取到各个楼层
						var HEIGHT=600;
						//常规楼层的高度
						for(var i=0;i<fs.length;i++){
							var fsitotalTop=this.getTotalTop(fs[i]);//获取到楼层距离页面顶部的高度
							var start=fsitotalTop-innerHeight/2;//楼层开始会亮时滚动条的滚动长度
							if(i==fs.length-1||i==fs.length-2){//倒数两个楼层的高度不同
								var end=start+HEIGHT/2;//楼层结束亮时滚动条的滚动长度为start+楼层的本身高度
								if(scrollTop>=start&&scrollTop<end) break;//滚动条在边界条件里滚动时 跳出循环 拿到i给对应的导航名点灯
							}else{
								var end=start+HEIGHT;//常规楼层的结束边界值
								if(scrollTop>=start&&scrollTop<end) break;//同上
							}
						}
						var lio=lift.querySelector("#floor .lift_item_on");//获取到导航中亮着的灯
						if(lio) lio.className="";//存在亮灯关上
						var fli=lift.querySelector(`#floor li:nth-child(${i+1})`);//给楼层对应到的导航名点灯
						if(fli) fli.className="lift_item_on";//灯亮了
					}
				})
			},
			/*绑定侧边导航点击跳转事件*/
			jumpLift:function(){
				var lift=this.lift;
				var lis=lift.querySelectorAll("#floor li");//楼层对应的导航名
				var fs=["#recommend","#selling","#hotcategories","#newranking","#selectedbooks","#bestprice"];//楼层的id名
				for(let i=0;i<lis.length;i++){
					lis[i].onclick=()=>{
						var fi=document.querySelector(fs[i]);//获取第i个楼层
						var fitotalTop=this.getTotalTop(fi);//取得该楼层的距页面顶部距离
						if(i==lis.length-1||i==lis.length-2)
							//window.scrollTo(0,fitotalTop-155);//倒数两个楼层的滚动距离
							$("html,body").stop(true).animate({scrollTop:fitotalTop-155},500);
						else
							//window.scrollTo(0,fitotalTop-125);//其他楼层的滚动的距离
							$("html,body").stop(true).animate({scrollTop:fitotalTop-125},500);
					}
				}
			}
        },
        mounted(){
            this.lift=this.$refs.lift;
            this.lightLift();
			this.jumpLift();
        }
    }
</script>

<style scoped>
    /*楼层导航*/
	.bs-lf #floor{
		width:53px;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		position:fixed;
		top:132px;
		left:0;
		z-index:99;
		cursor:pointer;
		display:none;
	}
	.bs-lf #floor li{
		width:40px;
		margin-top:2px;
		/*background:#EAEBEF;*/
		border:1px solid silver;
		/*border:1px solid #ddd;*/
		color:#FE2115;
		/*color:#636363;*/
		text-align:center;
		padding:8px 4px;
		box-sizing:border-box;
		margin-left:4px;
		transition:all .3s linear;
	}
	.bs-lf #floor li:first-child{
		width:40px;
		height:45px;
		border-radius:40% 40% 0 0;
	}
	.bs-lf #floor li:last-child{
		width:40px;
		height:45px;
		border-radius:0 0 40% 40%;
	}
	.bs-lf #floor li:hover{
		background:#FE2115;
		color:#fff;
	}
	.bs-lf .lift_item_on{
		background:#FE2115;
		color:#fff!important;
	}
</style>