<template>
    <div>

        <!-- 搜索功能 -->
        <!-- 搜索框 -->
        <!-- 搜索按钮 -->
        <input :input-props="{ autocomplete: 'disabled' }" placeholder="请输入搜索关键字...按回车进行搜索"
            style="width: 216px; margin-left: 24px;" />

        <!-- 展示功能 -->
        <!-- 展示信息 -->
        <!-- 展示词 -->
        <div align="center">
            <h1 v-show="info.isFirst">请输入搜索关键字...按回车进行搜索</h1>
        </div>
        <!-- 展示错误信息 -->
        <div align="center">
            <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
        </div>

        <!-- 展示未查询到结果信息 -->
        <div align="center">
            <h1 v-show="unsearched">未搜索到信息 </h1>
        </div>


    </div>


</template>

<script>
export default {
    name: "SearchPage",
    data() {
        return {
            keyWord: "",

            isshow: false,
            imgselect: {},
            isFull: true,
            isF11: false,

            page: 1,
            length: 1,
            total: 1,

            info: {
                isFirst: true,
                isLoading: false,
                errMsg: "",
                users: [],
            },
        }
    },
    computed: {

        unsearched() {
            if (this.total == 0) {
                return 1
            } else {
                return null;
            }

        }

    },
    methods: {}

}
</script>

<style>

</style>