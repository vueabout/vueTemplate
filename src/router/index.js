import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const courierWelfare = () => import('../page/courierWelfare.vue')
const baiduMap = () => import('../page/baiduMap.vue')
const swiperuse = () => import('../page/swiperuse.vue')
const templateLayout = () => import('../page/templateLayout.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',          // HTML5 history 消除# 后台续作配置 否则404
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'courierWelfare',
      component: courierWelfare,
      meta:{title:'快递员福利社'}
    },
    {
      path: '/map',
      name: 'baiduMap',
      component: baiduMap,
      meta:{title:'百度地图'}
    },
    {
      path: '/swiperuse',
      name: 'swiperuse',
      component: swiperuse,
      meta:{title:'轮播图'}
    },
    {
      path: '/templateLayout',
      name: 'templateLayout',
      component: templateLayout,
      meta:{title:'通用布局页面'}
    }
  ]
})
