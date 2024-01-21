
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import settingsOptions from './modules/settings'
import favoritesOptions from './modules/favorites'
import viewerOptions from './modules/viewer'
import generalOptions from './modules/generals'

// data
const state = {

}

// Backend API (context , value)
const actions = {

    // hello: function => 简写 => hello 
    hello: function (context, value) {

        console.log(" actions 中的 hello 被调用了!");
        context.commit("HELLO", value);

    }


}

// Devtools (state, value)
const mutations = {

}


// like => computed
const getters = {


}

// export store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,

    modules: {
        settings: settingsOptions,
        favorites: favoritesOptions,
        viewer: viewerOptions,
        generals: generalOptions

    }
})




























// 设置相关配置
// const settingsOptions = {
//     namespaced: true,
//     actions: {},
//     mutations: {},
//     state: {},
//     getters: {}
// }
