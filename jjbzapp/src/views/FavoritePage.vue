<template>
  <v-container>



    <div v-show="lovelovelist.length == 0 ? true : false">
      还没有喜欢的图片，点击图片下方红色爱心
      <v-icon color="red">favorite_outline</v-icon>喜欢收藏图片。
    </div>

    <div>
      <div class="img-box" v-for="item in lovelovelist" :key="item.id">

        <div @click="canvasco">
          <v-img @click="updatesdetail(item)" :src="item.src" :aspect-ratio="279.984 / 186.656" />
        </div>

        <span class="res-span">{{ item.res }}</span>

        <span class="down-span">
          <a :href="item.src">保存</a>
        </span>

        <span @click="favorite_item(item)" class="like-span">
          <v-btn v-show="favorState(item) == false" icon color="red">
            <v-icon>favorite_border</v-icon>
          </v-btn>
          <v-btn v-show="favorState(item) == true" icon color="red">
            <v-icon>favorite</v-icon>
          </v-btn>
        </span>
      </div>

      <div class="image-background" v-show="isdtpageshow">
        <!-- 图像画布 -->
        <canvas></canvas>

        <!-- 画布 关闭按钮-->
        <span class="close-span">
          <v-icon color="white" @click="closedetailpage">close</v-icon>
        </span>

        <!-- 图像分辨率 -->
        <div class="image-resolution">
          <span>{{ imgselect.res }}</span>
        </div>

        <!-- 图像细节菜单功能 -->
        <div class="image-tools-bar">
          <v-btn @click="backone" title="上一张" class="tool" text>
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-btn @click="favorite_item(imgselect)" v-show="favorState(imgselect) == false" title="喜欢" class="tool" text>
            <v-icon color="red">favorite_border</v-icon>
          </v-btn>

          <v-btn @click="favorite_item(imgselect)" v-show="favorState(imgselect) == true" title="喜欢" class="tool" text>
            <v-icon color="red">favorite</v-icon>
          </v-btn>

          <v-btn :href="imgselect.src" title="下载" class="tool" a text>
            <v-icon color="green">file_download</v-icon>
          </v-btn>

          <v-btn @click="toggleFullScreen" v-show="isFull" title="全屏" class="tool" text>
            <v-icon color="blue">fullscreen</v-icon>
          </v-btn>

          <v-btn @click="toggleFullScreen" v-show="!isFull" title="结束全屏" class="tool" text>
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
          <v-pagination v-model="page" :length="length" @input="$vuetify.goTo(0, 'duration'), connectStore()"
            prev-icon="arrow_left" next-icon="arrow_right"></v-pagination>
          <hr />

          <v-btn>当前共 {{ this.total }} 张 / {{ this.length }} 页 Page = {{ this.page }}</v-btn>
        </div>
      </v-container>
    </div>

  </v-container>
</template>


<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";


export default {
  name: "MyFavorites",

  data: () => ({

    //basement
    lovelovelist: [],

    // statement
    isdtpageshow: false,
    isFull: true,
    imgindex: 0,
    imgselect: {},
    thesize: { dx: 0, dy: 0, width: 0, height: 0 },

    // page,something
    length: null,
    total: null,
    page: 1

  }),

  computed: {

    ...mapState("settings", { Defaultstate: "Defaultstate" }),

    ...mapState("favorites", { lovelistids: "lovelistids" }),

  },

  methods: {

    ...mapActions('favorites', {
      favorite_item: "FAVORITE_IT",
    }),

    ...mapMutations("favorites", {
      CONNECT: "CONNECT_IDB",
    }),

    ...mapMutations("generals", {

      testapi: "HELLO"

    }),

    resolveAfter2Seconds(x) {
      return new Promise(resolve => {
        setTimeout(() => {

          resolve(x);
          console.log(x);

        }, 2000);

      });
    },

    async fff1() {
      // 第一步
      let x = await this.resolveAfter2Seconds(10);
      console.log("HELLO");
    },

    // Fontend Context
    favorState(item) {

      if (this.lovelistids.includes(item.id)) {
        return true;
      } else {
        return false;
      }

    },

    /**
     * 画布canvas设置
     * 绘制,传入thesize，要重新绘制的参数
     */
    canvasco() {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      const thing = new Image();

      // 把选择的对象图像路径传入 新建的对象thing
      thing.src = this.imgselect.src;

      // 挂载图像对象 thing
      thing.onload = function () {
        const size = resize();
        // console.log("thing", size.dx, size.dy, size.width, size.height)
        ctx.drawImage(thing, size.dx, size.dy, size.width, size.height);
      };

      window.onresize = function () {
        // console.log("重新定义大小")
        const size = resize();
        ctx.drawImage(thing, size.dx, size.dy, size.width, size.height);
      };

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // console.log("window", canvas.width, canvas.height)
        let dx = 0;
        let dy = 0;
        let width = thing.naturalWidth;
        let height = thing.naturalHeight;

        // console.log("thesize", width, height)

        if (canvas.width / canvas.height <= width / height) {
          height = (height / width) * canvas.width;
          width = canvas.width;
          dy = (canvas.height - height) / 2;
        } else {
          width = (width / height) * canvas.height;
          height = canvas.height;
          dx = (canvas.width - width) / 2;
        }

        // console.log("resize", dx, dy, height, width)

        return {
          dx: dx,
          dy: dy,
          width: width,
          height: height
        };
      }
    },

    // 关闭按钮
    closedetailpage() {

      this.exitfullscreen();
      // this.opendetailpage();
      this.isdtpageshow = false

      // 调整 html overflow 属性
      const htmlStyle = document.getElementsByTagName("html")[0].style;
      htmlStyle.overflowY = "";
    },

    // 切换全屏功能
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        // 全屏功能👇,进行一个窗口全屏, 菜单栏状态变换
        document.documentElement.requestFullscreen();

        this.isFull = false;
      } else {
        // 退出全屏功能👇，进行一个窗口退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();

          this.isFull = true;
        }
      }
    },

    // 上一张
    backone() {

      if (0 < this.imgindex) {
        this.imgindex--;
        this.imgselect = this.lovelovelist[this.imgindex];
        this.canvasco();
        console.log(this.imgindex);
      } else if (0 == this.imgindex) {
        console.log("已达到第一张，无法进行一个减");
      } else {
        console.log("其他错误！");
      }

    },

    // 下一张
    nextone() {
      if (this.imgindex < Number(this.lovelovelist.length) - 1) {
        this.imgindex++;
        this.imgselect = this.lovelovelist[this.imgindex];
        this.canvasco();

      } else if (this.imgindex == Number(this.lovelovelist.length) - 1) {
        console.log("已达到最后一张，无法进行一个 + 😵");
      } else {
        console.log("其他错误！");
      }
    },

    updatesdetail(item) {
      const htmlStyle = document.getElementsByTagName("html")[0].style;
      htmlStyle.overflowY = "hidden";

      this.imgselect = item;

      this.imgindex = this.lovelovelist.indexOf(item);
      // console.log(this.imgindex);
      // 更新页面状态
      this.opendetailpage();
    },

    opendetailpage() {
      this.isdtpageshow = !this.isdtpageshow;
    },

    // 退出全屏
    exitfullscreen() {
      if (document.fullscreenElement) {
        console.log("全屏状态，退出全屏");
        document.exitFullscreen();

        this.isFull = true;
      }
    },

    // Special + 连接仓库 + 数据获取
    connectStore() {

      this.lovelovelist = [];

      const request = indexedDB.open("ttbz_wallpaper");

      request.onerror = event => { console.log("发生错误！", event); };

      request.onsuccess = event => {
        const db = event.target.result;
        this.db = db;

        const objectStore = db.transaction("favorites").objectStore("favorites");

        objectStore.count().onsuccess = event => {
          this.total = event.target.result;

          if (this.total / this.Defaultstate.size <= 1) {
            this.length = 1;
          } else {

            this.length = parseInt(this.total / this.Defaultstate.size) + 1;
          }
        };

        let index = null;
        objectStore.openCursor().onsuccess = event => {
          const cursor = event.target.result;

          if (cursor) {
            if (index === this.Defaultstate.size - 1) {
              this.lovelovelist.push(cursor.value);

              // console.log("读取数据成功：", this.lovelovelist);
              // console.log("总条目", this.total);

              return null;
            } else if (index === null && this.page !== 1) {
              console.log(
                "读取跳过：",
                (this.page - 1) * this.Defaultstate.size
              );
              index = 0;
              cursor.advance((this.page - 1) * this.Defaultstate.size);
            } else {
              index++;
              this.lovelovelist.push(cursor.value);
              cursor.continue();
            }
          } else {
            // console.log("读取数据成功：", this.lovelovelist);
            // console.log("总条目", this.total);
          }



        };
      }

    },


  },

  watch: {

    lovelistids: {
      deep: true,
      handler(value) {
        localStorage.setItem("lovelistids", JSON.stringify(value));
      }
    }

  },


  created() {
    this.fff1();

    // WORKED
    this.CONNECT();
    this.connectStore();
  },
  beforemounted() {

  },
  mounted() {

  },



};
</script>