<template>
<div class="bs-cs">
    <!--轮播-->
    <div class="carousel" v-if="bandata">
        <ul class="img" @mouseover="inchange()" @mouseout="outchange()">
            <li v-for="(p,i) in bandata">
                <router-link to="/products">
                <img :src="require('../../assets/'+p.img)">
                </router-link>
            </li>
        </ul>
        <ul class="dot">
            <li :data-value="p.title" v-for="(p,i) in bandata"
            :class="{active:i==0}" @mouseover="overmove(i)">{{i+1}}</li>
        </ul>
        <!--轮播左右-->
        <a href="#" class="ck-slide ck-left" @click.prevent="climove('next')"></a>
        <a href="#" class="ck-slide ck-right" @click.prevent="climove('pre')"></a>
    </div>  
</div>
</template>

<script>
  export default{
    name:'Carousel',
    data:function(){
        return{
            result:[],
            bandata:[],
            time1:"",
            b:true,
            left:0,
            imgWidth:0,
            li_list:[]
        }
    },
	watch:{
        result:function(){
            //分类数据
            if(this.result[0]=="bandata"){
                this.bandata=JSON.parse(this.result[1]);
            }
        },
        imgWidth:function(){
            this.left=0;
            this.isB=true;
        }
	},
    methods:{
        /*加载轮播信息*/
        banMove:function(){
            if(this.bandata){
                this.time1=setInterval(()=>{
                    if(this.b){
                        this.left=(parseInt(this.left));
                        if(this.left==-(this.imgWidth*5)){
                            this.left=0;
                        }
                        else this.left-=this.imgWidth;
                        this.left=this.left+"px";
                        $(".carousel .img").css("marginLeft",this.left);
                        this.clear_indicators();
                        this.add_indicators();
                    }
                },2000);
            }
        },
        /*去4小点样式*/
        clear_indicators:function (){
            for(let i=0;i<this.li_list.length;i++){
                this.li_list[i].className="";
            }
        },
        /*加4小点样式*/
        add_indicators:function (){
            let left=this.left;
            let li_list=this.li_list;
            let Width=this.imgWidth;
            if(left=="0px"){
                li_list[0].className="active";
            }else if(left=="-"+Width+"px"){
                li_list[1].className="active";
            }else if(left==-(Width*2)+"px"){
                li_list[2].className="active";
            }else if(left==-(Width*3)+"px"){
                li_list[3].className="active";
            }else if(left==-(Width*4)+"px"){
                li_list[4].className="active";
            }else if(left==-(Width*5)+"px"){
                li_list[5].className="active";
            }
        },
        // 鼠标移入移出状态变化
        inchange:function(){
            this.b=false;
            $(".carousel .ck-left").css("opacity",0.8);
            $(".carousel .ck-right").css("opacity",0.8);
        },
        outchange:function(){
            this.b=true;
            $(".carousel .ck-left").css("opacity",0.3);
            $(".carousel .ck-right").css("opacity",0.3);
        },
        // 上一张下一张点击事件
        climove:function(arg){
            this.b=false;
            this.left=(parseInt(this.left));
            if(arg=="pre"){
                if(this.left==-(this.imgWidth*5)){
                    this.left=0;
                }
                else this.left-=this.imgWidth;
            }else{
                if(this.left==0){
                    this.left=-(this.imgWidth*5);
                }
                else this.left+=this.imgWidth;
            }
            this.left=this.left+"px";
                $(".carousel .img").css("marginLeft",this.left);
                this.clear_indicators();
                this.add_indicators();
        },
        // 四小点移图
        overmove:function(i){
            this.clear_indicators();
            this.b=false;
            this.li_list[i].className="active";
            $(".carousel .img").css("marginLeft",-i*this.imgWidth+"px");
        },
        myresize:function(){
            window.onresize=()=>{
                if(document.querySelector(".carousel")){
                    this.imgWidth=document.querySelector(".carousel").offsetWidth;
                    this.isB=false;
                }
            }
        }
    },
    mounted(){
        this.ajax(this,"index/banners.php",1,"bandata");
        this.banMove();
        this.li_list=document.querySelector(".carousel .dot").children;
        this.left=parseInt($(".carousel .img").css("marginLeft"));
        this.imgWidth=document.querySelector(".carousel").offsetWidth;
        this.myresize();
    }
  }
</script>

<style scoped>
/*轮播*/
.bs-cs .carousel{
    overflow:hidden;
    box-sizing:border-box;
    position:relative;
}
.bs-cs ul.img{
    display:flex;
    cursor:pointer;
    transition:all .5s linear;
}
@media (min-width: 1px) {
    .bs-cs .carousel{
        width:300px;
        margin:-45px auto 10px;
    }
    .bs-cs ul.img{
        width:calc(300*6px);
    }
    .bs-cs a.ck-right,.bs-cs a.ck-left{
        display:none;
    }
    .bs-cs ul.dot{
        bottom:3px;
    }
}
@media (min-width: 500px) {
    .bs-cs .carousel{
        width:600px;
        margin:-45px auto 10px;
    }
    .bs-cs ul.img{
        width:calc(600*6px);
    }
    .bs-cs a.ck-right,.bs-cs a.ck-left{
        display:block;
    }
    .bs-cs ul.dot{
        bottom:3px;
    }
}
@media (min-width: 768px) {
    .bs-cs .carousel{
        width:768px;
        margin:0px auto;
    }
    .bs-cs ul.img{
        width:calc(768*6px);
    }
    .bs-cs a.ck-right,.bs-cs a.ck-left{
        top:130px;
    }
}
@media (min-width: 992px) {
    .bs-cs .carousel{
        width:980px;
        margin-bottom:30px;
    }
    .bs-cs ul.img{
        width:calc(980*6px);
    }
    .bs-cs a.ck-right,.bs-cs a.ck-left{
        top:162px;
    }
}
@media (min-width: 1200px) {
    .bs-cs .carousel{
        width:980px;
    }
}

	.bs-cs ul.img li{
        width: -moz-calc(100%/6);
        width: -webkit-calc(100%/6);
        width: calc(100%/6);
	}
    .bs-cs ul.img li img{
		width:100%;
	}
	.bs-cs ul.dot{
		position:absolute;
		left:0;
		width:180px;
		height:40px;
		margin:auto;
		left:0;
		right:0;
	}
	.bs-cs ul.dot li{
		float:left;
		border-radius:50%;
		background:rgba(255,255,255,0.9);
		width:20px;
		height:20px;
		line-height:20px;
		text-align:center;
		margin:10px 5px;
		cursor:pointer;
	}
	.bs-cs .active{
		background:rgba(255,0,0,0.9)!important;
		color:#fff;
	}
	/*轮播左右*/
	.bs-cs a.ck-slide{
		position:absolute;
		background:#fff;
		opacity:0.3;
		width:37px;
		height:71px;
		border-radius:5px;
	}
	.bs-cs a.ck-left{
		left:10px;
		background:#fff url("../../assets/img/index/arrow-left.png") no-repeat center center;
		transition:all 3s linear;
	}
	.bs-cs a.ck-right{
		right:10px;
		background:#fff url("../../assets/img/index/arrow-right.png") no-repeat center center;
		transition:all 3s linear;
	}
</style>