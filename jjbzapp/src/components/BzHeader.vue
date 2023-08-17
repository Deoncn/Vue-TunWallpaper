<template>
    <v-app-bar dense fixed>
        <v-container>
            <v-toolbar-title>
                <img src="../assets/log.png">豚豚壁纸
            </v-toolbar-title>

            <v-tabs>
                <v-tab to="/">
                    <v-icon color="blue">chair</v-icon> 首页
                </v-tab>

                <v-tab to="/admin" style="display:none">
                    管理
                </v-tab>

                <v-tab to="/idb" style="display:none">
                    IDB
                </v-tab>


                <v-tab to="/search">
                    <v-icon small color="green">search</v-icon> 搜索
                </v-tab>

                <v-tab to="/favorite">

                    <v-icon small color="red">favorite_border</v-icon>
                    喜欢
                </v-tab>

                <v-tab to="/user" class="tabs-float-right">
                    <v-icon color="teal" small>person_outline</v-icon> 我的
                </v-tab>


                <v-tab to="/settings">
                    <v-icon color="cyan" small>settings</v-icon> 设置
                </v-tab>


                <v-tab to="/about">
                    <v-icon color="purple" small>info_outline</v-icon> 关于
                </v-tab>

            </v-tabs>

            <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4">
            </v-progress-linear>
        </v-container>
    </v-app-bar>

</template>

<script>
export default {
    data: () => ({
        loading: false,
    }),

    watch: {
        loading(val) {
            if (!val) return

            setTimeout(() => (this.loading = false), 3000)
        },
    },
}
</script>