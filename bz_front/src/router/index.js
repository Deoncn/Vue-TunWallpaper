// 配置路由相关信息

import VueRouter from 'vue-router'
import Vue from 'vue'

import MainPage from '../views/MainPage.vue'
import CruDe from '../views/admin/CruDe.vue'
// component: () => import('../components/ViewSs.vue')


// 1、通过Vue.use(插件) .安装插件
Vue.use(VueRouter)

// 2 创建VueRouter对象
const routes = [

    {
        path: '/',
        component: MainPage
    },
    {
        path: '/search',
        component: () => import('../views/SearchPage.vue')
    },
    {
        path: '/favorite',
        component: () => import('../views/FavoritePage.vue')
    },


    {
        path: '/settings',
        component: () => import('../views/SettingPage.vue')
    },
    {
        path: '/about',
        component: () => import('../views/AboutPage.vue')
    },

    // admin page
    {
        path: '/idb',
        component: () => import('../views/admin/IndexedDB.vue')
    }, 
    {
        path: '/admin',
        component: CruDe
    },



]

// 配置路由和组件之间的应用关系
const router = new VueRouter({
    routes,
    // mode: 'history'
})

// 3 将router对象传入到Vue实例
export default router