<template>
<!--自播-->
    <div class="autoplay bs-ap" id="automatic" @mouseover="stopOplay(false)" @mouseout="stopOplay(true)">
        <p></p>
        <span id="pre" ref="pre" @click="handlePlay(true)"></span>
        <dl v-if="autoplay" ref="dl">
            <dd v-for="(pro,i) in autoplay">
				<router-link :to="'/productDetails/bid='+pro.pid">
					<img :src="require('../../assets/'+pro.pic)">
				</router-link>
				<router-link :to="'/productDetails/bid='+pro.pid">{{pro.title}}</router-link>
				<span class="author">{{pro.author}}</span>
				<span class="price">￥{{pro.price}}</span>
			</dd>
        </dl>
        <span id="next" ref="next" @click="handlePlay(false)"></span>
        <p></p>
    </div>
</template>

<script>
  export default{
    name:'Autoplay',
    data:function(){
      return {
        result:[],
		autoplay:[],
		time2:"",
		dl:{},
		pre:{},
		next:{},
		ULWIDTH:780,
		ulOffsetLeft:94,
		halfLeft:this.ULWIDTH-this.ulOffsetLeft
      }
    },
	watch:{
		result:function(){
			if(this.result[0]=="autoplay"){
				this.autoplay=JSON.parse(this.result[1]);
			}
		}
	},
    methods:{
		autoPlay:function(){
			if(this.autoplay){
				this.time2=setInterval(()=>{
					if(this.dl.offsetLeft==94) {
						this.dl.style.left=-this.ULWIDTH+this.ulOffsetLeft+"px";//第一次
						this.next.style.backgroundColor="#fff";
						this.pre.style.backgroundColor="#eaebef";
					}
					else {
						this.dl.style.left=this.ulOffsetLeft+"px";//第二次
						this.pre.style.backgroundColor="#fff";
						this.next.style.backgroundColor="#eaebef";
					}
				},2000);
			}
		},
		stopOplay:function(b){
			if(!b){
				clearInterval(this.time2);
			}else{
				this.autoPlay();
			}
		},
		handlePlay:function(b){
			if(!b && this.dl.style.left!=94){
				this.dl.style.left=this.ulOffsetLeft+"px";//上一页
				this.pre.style.backgroundColor="#fff";
				this.next.style.backgroundColor="#eaebef";
			}
			else if(b && this.dl.style.left!=this.halfLeft){
				this.dl.style.left=-this.ULWIDTH+this.ulOffsetLeft+"px";//下一页
				this.next.style.backgroundColor="#fff";
				this.pre.style.backgroundColor="#eaebef";
			}
		}
    },
    mounted(){
		this.ajax(this,"index/autoplay.php",1,"autoplay");
		this.autoPlay();
		this.dl=this.$refs.dl;
		this.next=this.$refs.next;
		this.pre=this.$refs.pre;
    }
  }
</script>

<style scoped>
    /*顶部自播*/
	.bs-ap{
		height:190px;
		position:relative;
		/*border:1px solid #ddd;*/
		border-radius:5px;
		overflow:hidden;
	}
	.bs-ap>span{
		border:1px solid #ac9f9f;
		margin:78px 0;
		border-radius:3px;
		cursor:pointer;
		display:block;
		width:34px;
		height:34px;
		position:absolute;
		z-index:99;
	}
	.bs-ap>p{
		width:94px;
		height:190px;
		position:absolute;
		background:#fff;
		z-index:9;
	}
	.bs-ap>p:first-child{
		left:0;
	}
	.bs-ap>p:last-child{
		right:0;
	}
	.bs-ap #pre{
		background:#eaebef url("../../assets/img/index/arrow_carrot-up1.png") no-repeat center center;
		left:36px;
	}
	.bs-ap #next{
		background:#eaebef url("../../assets/img/index/arrow_carrot-up2.png") no-repeat center center;
		right:36px;
	}
	.bs-ap dl{
		width:calc(780*2px);
		position:absolute;
		left:94px;
		transition:all .5s linear;
	}
	.bs-ap dl dd{
		width:140px;
		height:188px;
		margin-left:14px;
		float:left;
		text-align:center;
		border:1px solid #ddd;
		border-radius:5px;
	}
	.bs-ap dl dd img{
		width:85px;
		cursor:pointer;
		vertical-align:middle;
		margin-top:5px;
	}
	.bs-ap dl dd span.price{
		font-size:12px;
		color:#fe4902;
		font-weight:bold;
		display:block;
		margin-top:6px;
	}
	.bs-ap dl dd span.author{
		display:block;
		margin-top:5px;
	}
	.bs-ap dl dd a:nth-child(2){
		display:block;
		margin-top:5px;
		height:14px;
		overflow:hidden;
		cursor:pointer;
	}
	.bs-ap dl dd a:nth-child(2):hover{
		height:28px;
	}
</style>