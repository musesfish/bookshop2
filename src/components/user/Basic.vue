<template>
    <div class="bs-uc-bsc">
        <section  data-id="basic">
			<p>
                <a href="#" class="active">我的信息</a>
            </p>
            <form id="myform" v-if="basic">
                <p>
                    <span>我的头像：</span>
                    <img :src="require('../../assets/'+basic.avatar)" 
                        v-if="basic.avatar"/>
                    <img src="../../assets/img/avatar/default.png" v-else/>
                    <a href="#" data-action='upload' @click.prevent="isB=true">更改头像</a>
                </p>
                <p>
                    <span>用户名：</span>
                    <input type="text" :value="basic.user_name" name="user_name">
                </p>
                <p class="sex">
                    <span>性别：</span>
                    <a href="#" id="boy" :data-gender="basic.gender" 
                        :class="basic.gender==1?'select':'un_select'"
                        @click.prevent="modifysex(1)"></a>男
                    <a href="#" id="girl" :data-gender="basic.gender" 
                        :class="basic.gender==0||basic.gender==null?'select':'un_select'"
                        @click.prevent="modifysex(0)"></a>女
                </p>
                <p>
                    <span>绑定电话：</span>
                    <input type="text" :value="basic.phone" name="phone">
                </p>
                <p>
                    <span>绑定邮箱：</span>
                    <input type="text" :value="basic.email" name="email">
                </p>
                <input type="button" value="保存更改" id="btn_save" @click="save()">
            </form>
		</section>

        <!-- 遮罩层-->
            <div id="bg-mask" v-show="isB"></div>
            <!-- 上传头像 -->
            <div id="upload" class="drag_upload" @mousedown="dragdown($event)" 
                @mouseup="dragup($event)" v-show="isB">
                <h2>上传头像</h2>
                <form  id="form-avatar" method="post">
                    <p id="freader">
                        <input type="file" id="avatar" name="avatar" @change="readfile($event)"/>
                    </p>
                    <div id="drag-img" @drop.prevent="dropread($event)">
                        请将图片拖拽到此区域
                    </div>
                    <p>
                        <input id="btn_sub" type="submit" value="提交" @click.prevent="uploadava()"/>
                        <input id="btn_res" type="reset" value="取消" @click="isB=false"/>
                    </p>
                </form>
            </div>
    </div>
</template>
<script>
    export default{
        name:'Basic',
        data:function(){
            return{
                result:[],
                basic:{},
                saveuc:{},
                isB:false,
                L:0,
                T:0,
                B:false,
                fd:new FormData()
            }
        },
        watch:{
            result:function(){
                if(this.result[0]=="basic"){
                    this.basic=JSON.parse(this.result[1]).basic[0];
                }
                if(this.result[0]=="saveuc"){
                    this.saveuc=JSON.parse(this.result[1]);
                    alert(this.saveuc.msg);
                    this.getData();
                }
                if(this.result[0]=="upava"){
                    if(JSON.parse(this.result[1]).msg=="上传成功"){
                        alert("上传成功");
                        this.isB=false;
                        this.getData();
                    }
                }
            },
            B:function(){
                if(this.B){
                    this.dragmove();
                }
            },
            isB:function(){
                if(this.isB){
                    this.isSurport();
                }
            }
        },
        methods:{
            // 判断是否支持接口
            isSurport:function(){
                //判断浏览器是否支持FileReader接口
                if (typeof FileReader == 'undefined') {
                    document.getElementById("freader").innerHTML = "当前浏览器不支持FileReader接口,请尝试拖拽上传";
                }
                //判断浏览器是否支持拖拽上传 DataTransfer
                if (typeof DataTransfer == 'undefined') {
                    document.getElementById("drag-img").innerHTML="版本太低，无法拖拽上传";
                }
            },
            // 拖拽上传功能
            dragupload:function(){
                $(document).on({
                    dragleave:function(e){e.preventDefault();},
                    drop:function(e){e.preventDefault();},
                    dragenter:function(e){e.preventDefault();},
                    dragover:function(e){e.preventDefault()}
                });
            },
            // 拖拽读取文件
            dropread:function(e){
                let fileList = e.dataTransfer.files;
                if (fileList.length == 0) {
                    alert("没有读取到上传图片");
                    return;
                }
                var rs = fileList[0].type.indexOf("image");
                if (rs == -1) {
                    alert("只能上传图片格式类型");
                    return;
                }
                var size = Math.floor(fileList[0].size / 1024);
                if (size > 512) {
                    alert("上传图片太大，不能超过512KB");
                    return;
                }
                var img = window.webkitURL.createObjectURL(fileList[0]);
                var fileName = fileList[0].name;
                $("#drag-img").html(`<img src="${img}"  width="120" alt="${fileName}"/>`);
                this.fd.append("avatar",fileList[0]);
            },
            // 表单的file读取文件
            readfile:function(e){
                console.log($(e.target).get(0).files[0]);
                let file = $(e.target).get(0).files[0];
                let reader = new FileReader();
                reader.onloadstart = function (e) {
                    console.log("开始读取....");
                }
                reader.onprogress = function (e) {
                    console.log("正在读取中....");
                }
                reader.onabort = function (e) {
                    console.log("中断读取....");
                }
                reader.onerror = function (e) {
                    console.log("读取异常....");
                }
                reader.onload = function (e) {
                    console.log("成功读取....");
                    $("#drag-img").html(`<img src="${e.target.result}"  width="120"/>`);
                }
                reader.readAsDataURL(file);
                let formElement = document.getElementById("form-avatar");//获取form
                this.fd = new FormData(formElement);
            },
            // 上传头像
            uploadava:function(){
                // this.mylog(this.fd);
                this.ajax(this,"uc_basic/uc_upload.php",2,"upava",this.fd);
            },
            // 按下弹出框
            dragdown:function(e){
                // this.mylog(e);
                let ex=e.clientX,ey=e.clientY;
                let offset=$(".drag_upload").offset();
                let ol=offset.left,ot=offset.top;
                this.L=ex-ol,this.T=ey-ot;
                this.B=true;
            },
            // 拖拽弹出框
            dragmove:function(){
                $("body,html").mousemove((e)=>{
                    if(this.B){
                        var ex=e.clientX,ey=e.clientY;
                        var t=ey-this.T,l=ex-this.L;
                        if(l<0){
                            l=0;
                        }
                        if(l>innerWidth-$(".drag_upload").width()){
                            l=innerWidth-$(".drag_upload").width();
                        }
                        if(t<0){
                            t=0;
                        }
                        $(".drag_upload").offset({top:t,left:l});
                    }
                });
            },
            // 松开弹出框
            dragup:function(){
                this.B=false;
            },
            //性别框样式 事件
            modifysex:function(num){
                if(num==1){
                    this.basic.gender=1;
                }else{
                    this.basic.gender=0;
                }
            },
            // 保存修改
            save:function(){
                let str="&gender="+ this.basic.gender;
                str=$("#myform").serialize()+str+"&update_basic=1";
                this.ajax(this,"uc_basic/uc_list.php",2,"saveuc",str);
            },
            // 获取个人信息
            getData:function(){
                this.ajax(this,"uc_basic/uc_list.php",1,"basic");
            }
        },
        mounted(){
            this.getData();
            this.dragupload();
        }
    }
</script>

<style scoped>
    .bs-uc-bsc{
        width:100%;
        margin:0 auto;
        min-width:320px;
    }
    /*头*/
    .bs-uc-bsc section>p{
        background-image:linear-gradient(to top,#E7E7E6 0%,#F5F5F5 100%);
        height:38px;
        font-size:1.5em;
        line-height:38px;
        margin-bottom:10px;
    }
    .bs-uc-bsc section>p a.active{
        font-weight:bold;
        background:transparent!important;
    }
    .bs-uc-bsc section>p a{
        padding:0 22px;
        color:#333;
    }
    /*身*/
    .bs-uc-bsc section #myform{
        font-size:1.3em;
        max-width:580px;
        margin:0 auto;
        text-align:center;
    }
    .bs-uc-bsc section #myform p{
        height:58px;
        line-height:58px;
        border-bottom:1px solid #ddd;
        padding:5px 10px;
    }
    .bs-uc-bsc section #myform p span{
        text-align:right;
        display:inline-block;
        width:100px;
    }
    .bs-uc-bsc section #myform p input{
        height:30px;
        width:156px;
        border:1px solid #ddd;
        outline:0;
        /*font-size:15px;*/
        font:12px arial,\5b8b\4f53,georgia,verdana,helvetica,sans-serif;
        color:#636363;
        padding-left: 5px;
    }
    .bs-uc-bsc section #myform #btn_save{
        height:46px;
        width:134px;
        line-height: 46px;
        text-align: center;
        border:1px solid #ff2f2f;
        outline:0;
        /*background-image:linear-gradient(to top,#f20b16,#ff2f2f);*/
        /*color:white;*/
        border-radius:3px;
        margin-top:20px;
        margin-left: 35px;
        font-size:15px;
        /*font-weight:bold;*/
        cursor:pointer;
        /*background:#ffeded;*/
        background:#fff;
        color:#ff2f2f;
        display: inline-block;
    }
    .bs-uc-bsc section #myform #btn_save:hover{
        background-image:linear-gradient(to top,#f20b16,#ff2f2f);
        color:white;
    }
    .bs-uc-bsc section #myform img{
        border:1px solid #ead4c6;
        border-radius:5px;
        width:65px;
    }
    .bs-uc-bsc section #myform p:first-child{
        padding-bottom:20px;
    }
    .bs-uc-bsc section #myform p:first-child img{
        border:1px solid #ead4c6;
        border-radius:5px;
        width:65px;
    }
    .bs-uc-bsc section #myform p:first-child a{
        font-size:12px;
        color:#636363;
        padding-left:25px;
        font-weight:bold;
    }
    .bs-uc-bsc section #myform #boy{
        display:inline-block;
        width:12px;
        height:12px;
        margin-right:5px;
    }
    .bs-uc-bsc .un_select{
        background:url('../../assets/img/uc_basic/un_select.png') no-repeat center center;
    }
    .bs-uc-bsc .select{
        background:url('../../assets/img/uc_basic/select.png') no-repeat center center;
    }
    .bs-uc-bsc section #myform #girl{
        display:inline-block;
        width:12px;
        height:12px;
        margin:0 5px 0 20px;
    }
    .bs-uc-bsc #bg-mask{
        background: #eee;
        opacity: 0.3;
        z-index: 8888;
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
    }
    .bs-uc-bsc .drag_upload{
        box-sizing: border-box;
        overflow:hidden;
        width:320px;
        height:320px;
        position:absolute;
        top:30%;
        left:30%;
        z-index:9999;
        background: #fff;
        box-shadow: 0 2px 2px 2px #f3f3f3;
        border-radius:10px;
        cursor: move;
    }
    .bs-uc-bsc #upload h2{
        text-align: center;
        padding: 10px;
        background: #fe3227;
        color: white;
        position: relative;
    }
    .bs-uc-bsc #upload form p{
        padding-left: 15px;
        padding-top:15px;
    }
    .bs-uc-bsc #upload form div{
        margin:20px auto 0;
        border:1px solid silver;
        width: 150px;
        height:150px;
        text-align: center;
        line-height: 150px;
    }
    .bs-uc-bsc #upload form p #btn_sub,
    .bs-uc-bsc #upload form p #btn_res{
        padding:5px 10px;
        background: #fe3227;
        color: white;
        float:right;
        margin-right: 20px;
        margin-top:10px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
    }
</style>