import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Index from '@/components/Index'
import Carousel from '@/components/utility/Carousel.vue'
import Autoplay from '@/components/utility/Autoplay.vue'
import Family from '@/components/utility/Family.vue'
import gotoTop from '@/components/utility/gotoTop.vue'
import Lift from '@/components/utility/Lift.vue'

import Products from '@/components/Products'

import ProductDetails from '@/components/ProductDetails'
import Magnifier from '@/components/utility/Magnifier.vue';

import Login from '@/components/Login'
import Register from '@/components/Register'

import LookForward from '@/components/LookForward'
import Service from '@/components/Service'

import ucBasic from '@/components/ucBasic'
import myCollect from '@/components/user/myCollect'
import Cart from '@/components/user/Cart'
import myOrder from '@/components/user/myOrder'
import Address from '@/components/user/Address'
import Basic from '@/components/user/Basic'

import Order from '@/components/Order'
import orderConfirm from '@/components/embed/orderConfirm'
import Payment from '@/components/embed/Payment'
import paySuccess from '@/components/embed/paySuccess'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '',
      redirect:"/index"
    },
    {
      path: '/index',
      component: Index
    },
    {
      path:"/products/:fid/:kw",
      component:Products
    },
    {
      path:"/products",
      component:Products
    },
    {
      path:"/productDetails/:bid",
      component:ProductDetails
    },
    {
      path: '/login',
      component:Login
    },
    {
      path:"/register",
      component:Register
    },
    {
      path:"/service",
      component:Service
    },
    {
      path:"/ucBasic",
      component:ucBasic,
      children:[
        {path:"",redirect:"/ucBasic/basic"},
        {path:"/ucBasic/myOrder",component:myOrder},
        {path:"/ucBasic/cart",component:Cart},
        {path:"/ucBasic/collect",component:myCollect},
        {path:"/ucBasic/address",component:Address},
        {path:"/ucBasic/basic",component:Basic}
      ]
    },
    {
      path:"/order",
      component:Order,
      children:[
        {path:"",redirect:"/order/orderConfirm"},
        {path:"/order/orderConfirm/:str",component:orderConfirm},
        {path:"/order/payment/:str",component:Payment},
        {path:"/order/paySuccess/:str",component:paySuccess}
      ]
    },
    {
      path:"*",
      component:LookForward
    }
  ]
})
