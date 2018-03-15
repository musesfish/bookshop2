<template>
    <div v-if="book.length!=0">
        <div class="bs-mnf preview hidden-xs">
            <p><img :src='require("../../assets/"+book.md)'/></p>
            <div id="middleMask" @mouseover="()=>{this.isB=true}"
            @mousemove="magnifier($event)" @mouseout="()=>{this.isB=false}"></div>
            <div id="superMask" :style="bg" v-if="isB"></div>
            <div id="mask" v-if="isB"></div>
        </div>
    </div>    
</template>

<script>
    export default{
        name:'Magnifier',
        data:function(){
            return{
                bg:{},
				WSIZE:135,//移动框的宽度
				HSIZE:183,//移动框的高度
				MDWSIZE:270,//遮罩框的宽度
				MDHSIZE:366,//遮罩框的高度
				isB:false,
                book:[]
            }
        },
        props:["booktoson"],
        watch:{
            booktoson:function(){
                if(this.booktoson.length!=0){
                    this.book=this.booktoson;
                    this.bg={backgroundImage: "url(" + require("../../assets/"+this.book.lg) + ")"};
                }
            }
        },
        methods:{
            magnifier:function(e){
               var mask=this.mask,
                superMask=this.superMask,
                HSIZE=this.HSIZE,
                WSIZE=this.WSIZE,
                MDHSIZE=this.MDHSIZE,
                MDWSIZE=this.MDWSIZE,
                x=e.offsetX,//鼠标相对于遮罩框左上角的x轴距离
                y=e.offsetY,//鼠标相对于遮罩框左上角的y轴距离
                top=y-HSIZE/2,//获取移动框的top
                left=x-WSIZE/2;//获取移动框的left
                var mask=document.getElementById("mask");//移动框
                var superMask=document.getElementById("superMask");//放大框
                if(top<0) top=0;
                else if(top>MDHSIZE-HSIZE) top=MDHSIZE-HSIZE;//控制移动框不超出遮罩框的高
                if(left<0) left=0;
                else if(left>MDWSIZE-WSIZE) left=MDWSIZE-WSIZE;//控制移动框不超出遮罩框的宽
                
                if(mask!=null&&superMask!=null){
                    mask.style.top=top+"px";//赋值移动框的top
                    mask.style.left=left+"px";//赋值移动框的left
                    superMask.style.backgroundPosition=-left*540/270+"px "+(-top*540/270+86)+"px";
                }
			}
        },
        mounted(){
            // this.mylog(this.booktoson);
            if(this.booktoson){
                this.book=this.booktoson;
                this.bg={backgroundImage: "url(" + require("../../assets/"+this.book.lg) + ")"};
            }
        }
    }
</script>

<style scoped>
    .bs-mnf.preview{
        width:270px;	
        position:relative;
        padding:0;
        margin-right:30px;
    }
    .bs-mnf.preview #middleMask{
        position:absolute;
        top:0;
        left:0;
        border:1px solid #c8c3c3;
        width:270px;
        height:366px;
        text-align:center;
        line-height:365px;
        overflow:hidden;
        background:transparent;
        z-index:9;
        cursor:move;
    }
    .bs-mnf.preview p img{
        width:270px;
        height:270px;
        margin-top:43px;
        // border:1px solid red;
    }
    .bs-mnf.preview #mask{
        width:135px;
        height:183px;
        position:absolute;
        top:0;
        left:0;
        background:#F5F5F5;
        opacity:0.6;
        /*display:none;*/
    }
    .bs-mnf.preview #superMask{
        border:1px solid #c8c3c3;
        width:270px;
        height:366px;
        position:absolute;
        left:280px;
        top:0;
        background-color:#fff;
        background-size:540px 540px;
        /*background-position:0 86px;*/
        background-repeat:no-repeat;
        /*display:none;*/
    }
</style>