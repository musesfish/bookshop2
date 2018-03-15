<template>
<div class="bs-fy">
    <dl v-if="family">
        <dt><router-link to="/products/fid/kw">图书分类</router-link></dt>
        <dd v-for="(v,i) in family">
            <router-link :to='"/products/fid="+v.fid+"/kw"'>{{v.fname}}</router-link>
            <router-link :to='"/products/fid="+v.fid+"/kw"'>{{v.fnames}}</router-link>
        </dd>
    </dl>
</div>    
</template>

<script>
    export default{
        name:'Family',
        data:function(){
            return{
                result:[],
                family:[]
            }
        },
        watch:{
            result:function(){
                if(this.result[0]=="family"){
                    this.family=JSON.parse(this.result[1]);
                    // this.mylog(this.family);
                }
            }
        },
        methods:{
            // 获取分类数据
            getFamily:function(){
                this.ajax(this,"index/family.php",1,"family");
            }
        },
        mounted(){
            this.getFamily();
        }
    }
</script>

<style scoped>
    .bs-fy{
        padding:0!important;
	}
	.bs-fy dt{
		background:#487a6f;
		height:36px;
		text-align:center;
		line-height:36px;
		font-size:16px;
		border-bottom:1px dotted #fff;
		cursor:pointer;
		margin-bottom:10px;
	}
	.bs-fy dt a{
		color:white;
	}
	.bs-fy dd{
		padding:0 12px 0 8px;;
	}
	.bs-fy dd a:first-child{
		display:block;
		background:#fff url("../../assets/img/index/arrow_carrot-up.png") no-repeat right center;
		background-size:10%;
		height:28px;
		line-height:28px;
		font-weight:bold;
		color:#487a6f;
		cursor:pointer;
	}
	.bs-fy dd a:nth-child(2){
		letter-spacing:2px;
		display:inline-block;
		width:168px;
		line-height:24px;
		color:#636363;
		border-bottom:1px dotted #487a6f;
		padding-bottom:5px;
		margin-bottom:5px;
	}
	.bs-fy dd a.bottom{
		border-bottom:0;
	}
</style>