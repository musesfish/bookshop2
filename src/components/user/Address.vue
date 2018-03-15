<template>
    <div class="bs-uc-ads">
        <section  data-id="addresses">
            <p>
                <a href="#" class="active">收货地址</a>
            </p>
            <div id="address">
                <div v-if="address.length" v-for="(a,i) in address">
                    <form class="form-adrs" :id="a.aid">
                        <p class="col-xs-12 col-sm-5">收货人姓名：<input type="text" :value="a.receiver" name="receiver" disabled/></p>
                        <p class="col-xs-12 col-sm-5">收货人手机：<input name='cellphone' type="text" :value="a.cellphone" disabled/></p>
                        <p class="col-xs-12 col-sm-5">省份：<input type="text" name="province" :value="a.province" disabled/></p>
                        <p class="col-xs-12 col-sm-5">市级：<input type="text" name="city" :value="a.city" disabled/></p>
                        <p class="col-xs-12 col-sm-5">区域：<input type="text" name="county" :value="a.county" disabled/></p>
                        <p class="col-xs-12 col-sm-5">门牌号：<input type="text" name="address" :value="a.address" disabled/></p>
                        <p class="col-xs-12 col-sm-5">
                            邮编：<input type="text" name="postcode" :value="a.postcode" disabled/>
                        </p>
                        <p class="col-xs-12 col-sm-5">
                            <input type="checkbox" id="default" disabled :checked="a.is_default=='1'"/>
                            <label for="default" class="address">默认地址</label>
                        </p>
                        <p class="col-xs-12 end">
                            <a href="#" :data-edit="a.aid" class="editadrs" @click.prevent="editadrs(a.aid)">编辑</a>
                            <a href="#" :data-del="a.aid" class="deladrs" @click.prevent="delads(a.aid)">删除</a>

                            <a href="#" :data-sure="a.aid" class="sure" style="display: none"
                            @click.prevent="sure(a.aid)">确定</a>
                            <a href="#" :data-cancel="a.aid" class="cancel" style="display: none"
                            @click.prevent="cancel()">取消</a>
                        </p>
                    </form>
                </div>
                <p id="addadrs"><a href="#" class="add" @click.prevent="addadrs()">新增收货地址</a></p>
            </div>
        </section>

        <!-- 添加地址 -->
            <!-- 遮罩层-->
            <div id="bg-mask"></div>
            <div id="add-address" class="drag_upload">
                <h2>添加地址</h2>
                <form  id="form-address" method="post" v-on:submit.prevent>
                    <p>收货人姓名：<input type="text" name="receiver"/></p>
                    <p>收货人手机：<input type="text" name="cellphone"/></p>
                    <p>邮编：<input type="text" name="postcode"/></p>
                    <p>省份：<input type="text" name="province"/></p>
                    <p>市级：<input type="text" name="city"/></p>
                    <p>区域：<input type="text" name="county"/></p>
                    <p>门牌号：<input type="text" name="address"/></p>
                    <p><input type="checkbox" id="is_default"/> 设为默认地址</p>
                    <p class="btn">
                        <input id="btn_sub_address" type="submit" value="提交" @click="subadd()"/>
                        <input id="btn_res_address" type="reset" value="取消" @click="hideadd()"/>
                    </p>
                </form>
            </div>
    </div>
</template>
<script>
    export default{
        name:'Address',
        data:function(){
            return{
                result:[],
                address:[]
            }
        },
        watch:{
            result:function(){
                if(this.result[0]=="address"){
                    this.address=JSON.parse(this.result[1]).address;
                }
                if(this.result[0]=="delads"){
                    alert(JSON.parse(this.result[1]).msg);
                    this.getData();
                }
                if(this.result[0]=="edit"){
                    alert(JSON.parse(this.result[1]).msg);
                    this.cancel();
                }
                if(this.result[0]=="addnew"){
                    alert(JSON.parse(this.result[1]).msg);
                    this.getData();
                    this.hideadd();
                }
            }
        },
        methods:{
            // 新增地址
            addadrs:function(){
                $("#bg-mask").height($("html,body").height());
                $("#bg-mask").width(outerWidth);
                $("#bg-mask").show(500);
                $("#add-address").show(500);
            },
            // 取消新增
            hideadd:function(){
                $("#bg-mask").hide(500);
                $("#add-address").hide(500);
            },
            // 确认新增
            subadd:function(){
                if($("input[id=is_default]").is(":checked")) var is_default=1;
                else var is_default=0;
                let str=$("#form-address").serialize()+"&insert_address=1"+"&is_default="+is_default;
                this.ajax(this,"uc_basic/uc_list.php",2,"addnew",str);
            },
            // 确认修改
            sure:function(id){
                if($("input[id=default]").is(":checked")) {
                    var is_default=1;
                } 
                else{
                    var is_default=0;
                }
                let str=$("#"+id).serialize()+"&update_address=1"+"&is_default="+is_default+"&aid="+id;
                this.ajax(this,"uc_basic/uc_list.php",2,"edit",str);
            },
            // 取消修改
            cancel:function(){
                $(".editadrs").css("display","inline-block");
                $(".deladrs").css("display","inline-block");
                $(".sure").css("display","none");
                $(".cancel").css("display","none");
                $("#address input").each(function(i,v){
                    $(v).attr("disabled","disabled");
                    $(v).css("border","0");
                });
                this.getData();
            },
            // 编辑地址
            editadrs:function(id){
                $("form#"+id+" input").each(function(i,v){
                    $(v).removeAttr("disabled");
                    $(v).css("border","1px solid #fe3227");
                });
                $("form#"+id+" .editadrs").css("display","none");
                $("form#"+id+" .deladrs").css("display","none");
                $("form#"+id+" .sure").css("display","inline-block");
                $("form#"+id+" .cancel").css("display","inline-block");
            },
            // 删除地址
            delads:function(id){
                let str="aid="+id+"&delete_address=1";
                this.ajax(this,"uc_basic/uc_list.php?"+str,1,"delads");
            },
            // 获取地址
            getData:function(){
                this.ajax(this,"uc_basic/uc_list.php",1,"address");
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
    .bs-uc-ads{
        width:100%;
        min-width:320px;
        margin:0 auto;
        box-sizing:border-box;
    }
     /*头*/
    .bs-uc-ads section>p{
        background-image:linear-gradient(to top,#E7E7E6 0%,#F5F5F5 100%);
        height:38px;
        font-size:1.5em;
        line-height:38px;
        margin-bottom:10px;
    }
    .bs-uc-ads section>p a.active{
        font-weight:bold;
        background:transparent!important;
    }
    .bs-uc-ads section>p a{
        padding:0 22px;
        color:#333;
    }
    /*身*/
    .bs-uc-ads #address{
        display:table;
        margin:0 auto;
    }
    .bs-uc-ads #address form{
        display:table;
        margin-bottom:20px;
        max-width:970px;
        margin:0 auto;
    }
    .bs-uc-ads #address>div p{
        padding:5px 10px;
    }
    .bs-uc-ads #address>div p.end{
        border-top: 1px dotted #636363;
        padding-bottom:10px;
    }
    .bs-uc-ads #address>div p input{
        border:0;
        outline: 0;
        background:transparent;
        font:1.2em;
        color:#636363;
        width: auto;
        vertical-align: middle;
    }
    .bs-uc-ads #address>div p a{
        padding-top:10px;
        display: inline-block;
        margin-right: 10px;
    }
    .bs-uc-ads #address>p a.add{
        display:block;
        border: 1px solid #ff2f2f;
        border-radius: 5px;
        width: 100px;
        height:32px;
        text-align: center;
        line-height: 32px;
        background:#fff;
        color:#ff2f2f;
        margin-top: 10px;
    }
    .bs-uc-ads #address>p a.add:hover{
        background:#ffeded;
    }
    /*添加地址*/
    .bs-uc-ads #bg-mask{
        background: #eee;
        /*background: red;*/
       opacity: 0.3;
        z-index: 8888;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
    }
    .bs-uc-ads .drag_upload{
        overflow:hidden;
        display:none;
        height:420px;
        width:360px;
        position:absolute;
        top:30%;
        left:30%;
        z-index:9999;
        background: #fff;
        box-shadow: 0 2px 2px 2px #f3f3f3;
        border-radius:10px;
        cursor: move;
    }
    .bs-uc-ads #add-address p{
        text-align: right;
        display:block;
        width:250px;
        height:28px;
        margin-left:20px;
        padding-left: 15px;
        margin-top:10px;
        line-height:28px;
        // border:1px solid red;
    }
    .bs-uc-ads #add-address p input{
        border:1px solid #eee;
        padding:2px;
    }
    .bs-uc-ads #add-address h2{
        text-align: center;
        padding: 10px;
        background: #fe3227;
        color: white;
        position: relative;
    }
    .bs-uc-ads #btn_sub_address,.bs-uc-ads #btn_res_address{
        padding:5px 10px!important;
        background: #fe3227;
        color: white;
        margin-right: 20px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
    }
    @media (min-width:1px) AND (max-width:350px){
		.bs-uc-ads .drag_upload{
            left:0;
            width:320px;
        }
	}
</style>