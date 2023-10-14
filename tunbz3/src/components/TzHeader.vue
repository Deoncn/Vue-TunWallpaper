<template>
    <n-config-provider :theme="theme">
        <n-card>
            <n-spasce>

                <n-space>

                    <n-avatar size="medium" src="src/assets/img/log.png" />
                    <!-- <div class="ui-logo">
                        <img src="../assets/img/log.png" />
                        <span>豚豚壁纸</span>
                    </div> -->

                    <n-button text>
                        <RouterLink :to="'/'">首页</RouterLink>
                    </n-button>

                    <n-button text>
                        <RouterLink to="/search">搜索</RouterLink>
                    </n-button>
                    

                    <n-button text>
                        <RouterLink to="/search">喜欢</RouterLink>
                    </n-button>
                    



                    <n-button text>
                        <RouterLink :to="'/User'">我的</RouterLink>
                    </n-button>

                    <n-button text>
                        <RouterLink to="/settings">设置</RouterLink>
                    </n-button>

                    <n-button text>
                        <RouterLink to="/about">关于</RouterLink>
                    </n-button>



                    <n-space>
                        <n-button @click="theme = darkTheme">
                            深色
                        </n-button>
                        <n-button @click="theme = null">
                            浅色
                        </n-button>
                    </n-space>



                    <n-space>
                        <n-text type="error">
                            1.0
                        </n-text>

                    </n-space>

                </n-space>




            </n-spasce>
        </n-card>
    </n-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { darkTheme } from 'naive-ui'

export default defineComponent({
    data() {
        return {
            darkTheme,
            theme: null,
            value: null
        };
    },
    methods: {



    }


})
</script>


//TODO 导航栏