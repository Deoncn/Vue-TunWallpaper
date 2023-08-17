<template>

    <div class="nav" style="
    --side-padding: 32px;
     grid-template-columns: calc(240px) 1fr auto;
     ">

        <div class="ui-logo">
            <img src="../assets/img/log.png" />
            <span>豚豚壁纸</span>
        </div>


        <div style="display: flex; align-items: center;">
            <div class="nav-menu">
                <a class="nav-picker" size="small" quaternary>
                    <RouterLink :to="'/'">首页</RouterLink>
                </a>

                <a class="nav-picker" size="small" quaternary>
                    <RouterLink to="/search">搜索</RouterLink>
                </a>

                <a class="nav-picker" size="small" quaternary>
                    <RouterLink to="/settings">设置</RouterLink>
                </a>

                <a class="nav-picker" size="small" quaternary>
                    <RouterLink to="/about">关于</RouterLink>
                </a>
            </div>

        </div>


        <div class="nav-end">

            <a class="nav-picker" size="small" quaternary>
                GitHub
            </a>
            <a class="nav-picker padded" size="small" quaternary>
                1.0.0
            </a>

        </div>




    </div>
</template>

<script>



export default {
    data() {
        return {
        }
    }


}
</script>