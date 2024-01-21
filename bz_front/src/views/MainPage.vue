<template>
    <v-container>
        <div>

            <!-- <v-progress-linear value="100" absolute  height="0" top="0"></v-progress-linear> -->

            <div class="index-tool-bar" style="display:none">
                <v-row>
                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items1" label="排序" outlined dense>
                        </v-select>
                    </v-col>

                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items2" label="分辨率" outlined dense></v-select>
                    </v-col>

                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items3" label="比例" outlined dense></v-select>
                    </v-col>

                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items4" label="分类" outlined dense></v-select>
                    </v-col>

                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items5" label="细分" outlined dense></v-select>
                    </v-col>

                    <v-col sm="2" md="2" lg="2" xl="2" xs="2">
                        <v-select :items="items6" label="颜色" outlined dense></v-select>
                    </v-col>

                </v-row>
            </div>


            <div>

                <div class="img-box" v-for="item in imglists" :key="item.id">

                    <div @click="canvasco()">
                        <v-img :src="item.src" :aspect-ratio="279.984 / 186.656"
                            @click="updatesdetail(item), fullscreenpreview()">
                        </v-img>
                    </div>

                    <span class="res-span">{{ item.res }}</span>

                    <span class="down-span">
                        <a :href="item.src" target="downloadFile">保存</a>
                    </span>

                    <span class="like-span" @click="favorite_item(item)">
                        <button v-if="favorState(item) == false" type="button">
                            <v-icon color="red">favorite_border</v-icon>
                        </button>

                        <button v-if="favorState(item) == true" type="button">
                            <v-icon color="red">favorite</v-icon>
                        </button>
                    </span>

                </div>


                <div class="image-background" v-if="isdtpageshow">

                    <!-- 图像画布 -->
                    <canvas></canvas>

                    <!-- 画布 关闭按钮-->
                    <span class="close-span">
                        <v-icon color="white" @click="closedetailpage">close</v-icon>
                    </span>


                    <!-- 图像分辨率 -->
                    <div class="image-resolution"><span>{{ imgselect.res }}</span></div>

                    <!-- 图像细节菜单功能 -->
                    <div class="image-tools-bar">
                        <v-btn @click="backone" title="上一张" class="tool" text>
                            <v-icon>arrow_back</v-icon>
                        </v-btn>

                        <v-btn @click="favorite_item(imgselect)" v-show="favorState(imgselect) == false" title="喜欢"
                            class="tool" text>
                            <v-icon color="red">favorite_border</v-icon>
                        </v-btn>

                        <v-btn @click="favorite_item(imgselect)" v-show="favorState(imgselect) == true" title="喜欢"
                            class="tool" text>
                            <v-icon color="red">favorite</v-icon>
                        </v-btn>

                        <v-btn :href="imgselect.src" title="下载" class="tool" a text>
                            <v-icon color="green">file_download</v-icon>
                        </v-btn>

                        <v-btn @click="toggleFullScreen" v-show="isFull" title="全屏" class="tool" text>
                            <v-icon color="blue">fullscreen</v-icon>
                        </v-btn>

                        <v-btn @click="toggleFullScreen" v-show="isF11" title="结束全屏" class="tool" text>
                            <v-icon color="blue">fullscreen_exit</v-icon>
                        </v-btn>

                        <v-btn @click="nextone" title="下一张" class="tool" text>
                            <v-icon>arrow_forward</v-icon>
                        </v-btn>



                    </div>



                </div>

            </div>


            <div class="text-center pagination-bar">
                <v-container>

                    <div class="vue_pagination">
                        <v-pagination v-model="page" :length="length" @input="$vuetify.goTo(0, 'duration'), lol()"
                            prev-icon="arrow_left" next-icon="arrow_right">
                        </v-pagination>
                    </div>
                    <hr>
                    <p>当前共 {{ this.total }} 张 / {{ this.length }} 页</p>


                </v-container>
            </div>


            <!-- <ImgViewer :msg="1"></ImgViewer> -->

        </div>

    </v-container>
</template>


<script>
import { mapMutations, mapState, mapActions } from 'vuex'
// import ImgViewer from '@/components/ItemsView.vue'
import request from '@/utils/request'

export default {
    name: 'MainPage',
    components: {
        // ImgViewer
    },
    data: () => ({
        // ❌导航
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        items1: ['推荐', '最热', '最新', '随机'],
        items2: ['不限', '1080P', '2K', '4K', '8K'],
        items3: ['不限', '1:1', '4:3', '16:9', '18:9', '21:9', '更大'],
        items4: ['不限', 'Foo', 'Bar', 'Fizz', 'Buzz'],
        items5: ['不限', 'Foo', 'Bar', 'Fizz', 'Buzz'],
        items6: ['不限', '#fsdfsdg', 'Bar', 'Fizz', 'Buzz'],


        // 展示
        // > 接收数据
        imglists: JSON.parse(localStorage.getItem("imglists")) || [],
        // 喜欢数据给每个对象都加上
        favoritemo: { isfmo: false },
        db: null,


        // 详情及图片查看器
        isFull: true,
        isF11: false,
        islikespan: false,

        imgindex: 0,
        imgselect: {},
        isdtpageshow: false,
        thesize: { dx: 0, dy: 0, width: 0, height: 0 },

        // ✔️分页 (总项目数量 ， 页数{24} ， 默认请求第一页 page)
        length: null,
        total: null,
        page: 1,

    }),

    computed: {
        // favorites
        ...mapState('favorites', { lovelistids: 'lovelistids' }),


        // settings
        ...mapState('settings', { Defaultstate: 'Defaultstate' }),
    },

    methods: {

        ...mapActions('favorites', {
            favorite_item: "FAVORITE_IT",
        }),

        // favorites
        ...mapMutations('favorites', {

            FIRST_FO: "BUILD_IDB_FV",
            CONNECT: "CONNECT_IDB",
        }),

        initialize() {

            request({
                method: 'GET',
                url: `img/SourceController/getAllSource/${this.page}/${this.Defaultstate.size}`,
            }).then(res => {

                // 打印初始化数据 👉 console.log(res)

                // console.log(res)
                this.length = res.data.data.pages;
                this.total = res.data.data.total;
                this.imglists = res.data.data.records;

            }).catch(error => { console.log(error); })

        },


        /**
         * 全局设置相关
         */

        // 全屏预览        
        fullscreenpreview() {
            if (this.Defaultstate.fullscreen) {
                document.documentElement.requestFullscreen();
            }
        },


        // 上一张
        backone() {

            if (0 < this.imgindex) {
                this.imgindex--;
                this.imgselect = this.imglists[this.imgindex];
                this.canvasco()
                console.log(this.imgindex);
            } else if (0 == this.imgindex) {
                console.log("已达到第一张，无法进行一个减")
            } else {
                console.log("其他错误！")
            }

        },


        // ❤ 计算收藏图标是否为显示
        favorState(item) {
            if (this.lovelistids.includes(item.id)) {
                // console.log("true")
                return true;
            } else {
                // console.log("fl")
                return false;
            }
        },


        // 关闭按钮
        closedetailpage() {

            this.exitfullscreen()
            this.opendetailpage()

            // 调整 html overflow 属性
            const htmlStyle = document.getElementsByTagName('html')[0].style;
            htmlStyle.overflowY = ''
        },


        // 切换全屏功能
        toggleFullScreen() {
            if (!document.fullscreenElement) {
                // 全屏功能👇,进行一个窗口全屏, 菜单栏状态变换
                document.documentElement.requestFullscreen(); this.isFull = false; this.isF11 = true;
            } else {
                // 退出全屏功能👇，进行一个窗口退出全屏
                if (document.exitFullscreen) { document.exitFullscreen(); this.isFull = true; this.isF11 = false; }
            }
        },

        // 退出全屏
        exitfullscreen() { if (document.fullscreenElement) { console.log("全屏状态，退出全屏"); document.exitFullscreen(); this.isFull = true; this.isF11 = false; } },

        // 下一张
        nextone() {

            if (this.imgindex < Number(this.Defaultstate.size) - 1) {
                this.imgindex++;

                this.imgselect = this.imglists[this.imgindex];
                this.canvasco()
                console.log(this.imgindex);
            } else if (this.imgindex == Number(this.Defaultstate.size) - 1) {
                console.log("已达到最后一张，无法进行一个 + 😵")
            } else {
                console.log("其他错误！")
            }

        },



        updatesdetail(item) {
            const htmlStyle = document.getElementsByTagName('html')[0].style;
            htmlStyle.overflowY = 'hidden';

            this.imgselect = item;

            this.imgindex = this.imglists.indexOf(item)
            console.log(this.imgindex)
            // 更新页面状态
            this.opendetailpage();
        },

        opendetailpage() { this.isdtpageshow = !this.isdtpageshow; },


        lol() {
            this.initialize()
        },


        /**
         * 画布canvas设置
         * 绘制,传入thesize，要重新绘制的参数
         */
        canvasco() {

            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d')
            const thing = new Image();

            // 把选择的对象图像路径传入 新建的对象thing
            thing.src = this.imgselect.src;


            // 挂载图像对象 thing
            thing.onload = function () {
                const size = resize();
                // console.log("thing", size.dx, size.dy, size.width, size.height)
                ctx.drawImage(thing, size.dx, size.dy, size.width, size.height)
            }

            window.onresize = function () {
                // console.log("重新定义大小")
                const size = resize();
                ctx.drawImage(thing, size.dx, size.dy, size.width, size.height)
            }

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // console.log("window", canvas.width, canvas.height)
                let dx = 0;
                let dy = 0;
                let width = thing.naturalWidth
                let height = thing.naturalHeight

                // console.log("thesize", width, height)

                if (canvas.width / canvas.height <= width / height) {
                    height = height / width * canvas.width;
                    width = canvas.width;
                    dy = (canvas.height - height) / 2
                } else {
                    width = width / height * canvas.height;
                    height = canvas.height;
                    dx = (canvas.width - width) / 2
                }

                // console.log("resize", dx, dy, height, width)

                return {
                    dx: dx,
                    dy: dy,
                    width: width,
                    height: height
                }
            }


        }
        ,

        resolveAfter2Seconds(x) {
            return new Promise(resolve => {
                setTimeout(() => {

                    resolve(x);
                    console.log(x);
                    this.FIRST_FO();

                }, 2000);

            });
        },

        async doit() {
            // 第一步
            await this.resolveAfter2Seconds(100);
            this.CONNECT();
        },

    },

    watch: {

        lovelistids: {
            deep: true,
            handler(value) {
                localStorage.setItem("lovelistids", JSON.stringify(value));
            },
        },
    },

    beforeCreate() {

    },
    created() {

        this.doit();
        this.initialize();

    },
    Mounted() {

    }
}
</script>