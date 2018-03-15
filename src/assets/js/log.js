//实现vue-mylog插件
export default{
  install(Vue,options)//Vue.js 插件公开方法 install (Vue 构造器 , 可选的选项对象)
  {
    Vue.prototype.mylog = function (msg) {//添加实例方法，通过把它们添加到 Vue.prototype 上实现
      console.log(msg);
    }
  }
}