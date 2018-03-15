<template>
    <div class="bs-mc">
        
        <!--主体-->
		<div id="main">
			<section>
				
				<!--题头-->
				<p class="titlep">
					<span class="treasure">全部宝贝 <b id="total">{{count}}</b></span>
					<span id="delete" @click="delSel()">删除</span>
					<span id="manageA" data-num="0" @click="manage($event)">批量管理</span>
				</p>
				<!--商品列表-->
				<div class="prolis" v-if="data.length">
					<div :id="l.lid" class="clleo" @click="manage($event)" v-for="(l,i) in data">
						<router-link :to="'/productDetails/bid='+l.product_id" title="查看详情">
							<img :src="require('../../assets/'+l.md)"/>
						</router-link>
						<div>
							<router-link class="title" :to="'/productDetails/bid='+l.product_id" title="查看详情">
								{{l.subtitle}}
							</router-link>
							<p class="price">
								<span>{{l.price}}</span>定价<span>{{l.fixprice}}</span>
							</p>
						</div>
						<div data-id="mask" :id="l.lid"></div>
					</div>
				</div>
			</section>
		</div>

    </div>
</template>

<style scoped>
    @import '../../assets/css/my_collect.css';
</style>

<script>
    export default{
        name:'myCollect',
		data:function(){
			return{
				result:[],
				data:[],
				count:0
			}
		},
		watch:{
			result:function(){
				if(this.result[0]=="data"){
					this.data=JSON.parse(this.result[1]).data;
					this.count=JSON.parse(this.result[1]).count;
				}
				if(this.result[0]=="delsel"){
					alert(JSON.parse(this.result[1]).msg);
					this.getData();
				}
			}
		},
		methods:{
			manage:function(e){
				if ($(e.target).data("num") == "0") {
					$(e.target).css({"background": "red", "color": "white"});
					$(e.target).html("退出管理");
					$("#delete").css("display", "block");
					$("[data-id=mask]").addClass("mask");
					$("#manageA").data("num", "1");
					return;
				}
				if ($(e.target).data("num") == "1") {
					$(e.target).css({"background": "#fff", "color": "#636363"});
					$(e.target).html("批量管理");
					$("#delete").css("display", "none");
					$("[data-id=mask]").removeClass("mask");
					$("#manageA").data("num", "0");
					$(".clleo").css("border", "1px solid silver");
				}
				if (e.target.className == "mask selected") {
					$(e.target).removeClass("selected");
					$(e.target).parent().css("border", "1px solid silver");
					return;
				}
				if (e.target.className == "mask") {
					$(e.target).addClass("selected");
					$(e.target).parent().css("border", "1px solid red");
					$("#delete.php").css({"border": "1px solid red", "color": "red"});
				}
			},
			delSel:function(){
				var $masks = $(".prolis .mask.selected");
                var ids = [];
				$.each($masks, function (i, l) {
					ids.push(l.id.toString());
				});
				ids = JSON.stringify(ids).slice(1, -1);
				var rs = window.confirm("您确定删除选中的收藏商品吗？");
				if (rs) {
					this.ajax(this,"collect/delete.php?ids="+ids,1,"delsel");
				}
			},
			getData:function(){
				this.ajax(this,"collect/list.php",1,"data");
			}
		},
		mounted(){
			this.getData();
		}
    }
</script>