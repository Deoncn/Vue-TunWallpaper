export default {
    namespaced: true,
    state: {

        Defaultstate: JSON.parse(localStorage.getItem("Defaultstate")) ||
        {
            fullscreen: false,
            detail: false, // NEW PAGE
            animation: false,
            hdmode: false,
            compact: false,
            size: '24',
            theme: { dark: false }
        },

    },

    actions: {},



    mutations: {

        // state, value
        HELLO: function () {
            console.log(" settingsOptions 中的 mutations 中 HELLO 被调了")
        },

        // 重置设置状态
        RESET_STATE: function (state, value) {

            console.log("RESET_STATE : ", value,)
            // 重置主题为明亮
            state.Defaultstate =
            {
                fullscreen: false,
                detail: false, // NEW PAGE
                animation: false,
                hdmode: false,
                compact: false,
                size: '24',
                theme: { dark: false }
            }

        },

    },

    getters: {}


}