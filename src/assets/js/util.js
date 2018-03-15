//实现vue-ajax插件
export default{
  data:function(){
    return{result:[]}
  },
  install(Vue,options)//Vue.js 插件公开方法 install (Vue 构造器 , 可选的选项对象)
  {
    Vue.prototype.ajax = function (_this,url,code,i,postStr="") {//添加实例方法，通过把它们添加到 Vue.prototype 上实现
      if(code==1){
          //_this.$http.get("http://soulstore.applinzi.com/data/"+url,{withCredentials:true}).then((data)=>{
          //_this.$http.get("http://localhost/tpl/data/"+url,{withCredentials:true}).then((data)=>{
            _this.$http.get("http://localhost/github-pages/bookshop2/bookshop2/data/"+url,{withCredentials:true}).then((data)=>{
              this.result=[];
              this.result[0]=[i];
              this.result.push(data.bodyText);
              return this.result;
           })
      }else if(code==2){
          //_this.$http.post("http://soulstore.applinzi.com/data/"+url,postStr,{
          //_this.$http.post("http://localhost/tpl/data/"+url,postStr,{
          	_this.$http.post("http://localhost/github-pages/bookshop2/bookshop2/data/"+url,postStr,{
                headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                withCredentials:true
              }).then((data)=>{
              this.result=[];
              this.result[0]=[i];
              this.result.push(data.bodyText)
              return this.result;
          })
      }
    }
  }
}