<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import request from '@/utils/request'


export default {

  name: "SearchTime",
  data() {
    return {
      keyWord: '',

      isFull: true,
      imgindex: 0,
      imgselect: {},
      isdtpageshow: false,
      thesize: { dx: 0, dy: 0, width: 0, height: 0 },

      page: 1,
      length: 1,
      total: 1,

      info: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
        users: [],
      },
    };
  },

  computed: {
    ...mapState('favorites', { lovelistids: 'lovelistids' }),

    ...mapState('settings', { Defaultstate: 'Defaultstate' }),

    unsearched() {
      if (this.total == 0) {
        return 1
      } else {
        return null;
      }

    }
  },
  methods: {

    ...mapActions('favorites', {
      favorite_item: "FAVORITE_IT"
    }),

    // favorites
    ...mapMutations('favorites', {
      CONNECT: "CONNECT_IDB",
      ADD: "ADD_OBJECT",
      DELET: "DELETE_OBJECT"
    }),

    search() {
      // 请求前更新 List的数据
      this.info = { isFirst: false, isLoading: true, errMsg: "", users: [] }
      request({
        method: 'GET',
        url: `img/SourceController/getAllSource/${this.page}/${this.Defaultstate.size}?description=${this.keyWord}`
      })
        .then(response => {
          this.info = { isLoading: false, errMsg: "", users: response.data.data.records };
          this.length = response.data.data.pages
          this.total = response.data.data.total
        })
        .catch(error => {
          this.info = { isLoading: false, errMsg: error.message, users: [] };
        })
    },


    favorState(item) {
      if (this.lovelistids.includes(item.id)) {
        return true;
      } else {
        return false;
      }
    },

    // 上一张
    backone() {

      if (0 < this.imgindex) {
        this.imgindex--;
        this.imgselect = this.info.users[this.imgindex];
        this.canvasco();
        console.log(this.imgindex);
      } else if (0 == this.imgindex) {
        console.log("已达到第一张，无法进行一个减");
      } else {
        console.log("其他错误！");
      }

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

    // 下一张
    nextone() {
      if (this.imgindex < Number(this.info.users.length) - 1) {
        this.imgindex++;
        this.imgselect = this.info.users[this.imgindex];
        this.canvasco();

      } else if (this.imgindex == Number(this.info.users.length) - 1) {
        console.log("已达到最后一张，无法进行一个 + 😵");
      } else {
        console.log("其他错误！");
      }
    },


    F11key() {
      document.documentElement.requestFullscreen();
    },

    fulltoexit() {
      this.isFull = false
      this.isF11 = true
    },

    exittofull() {
      this.isFull = true
      this.isF11 = false
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }


    },


    updatesdetail(item) {
      const htmlStyle = document.getElementsByTagName('html')[0].style;
      htmlStyle.overflowY = 'hidden';

      this.imgselect = item;

      this.imgindex = this.info.users.indexOf(item)

      // 更新页面状态
      this.opendetailpage();
    },

    opendetailpage() { this.isdtpageshow = !this.isdtpageshow; },


    lol() {
      this.search()
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

    // 退出全屏
    exitfullscreen() {
      if (document.fullscreenElement) {
        console.log("全屏状态，退出全屏");
        document.exitFullscreen();

        this.isFull = true;
      }
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


    },


  },

  created() {
    this.CONNECT();
  },

}
</script>

<template>
  <v-container>
    <!-- 搜索功能 -->
    <v-row justify="center">

      <!-- 搜索框 -->
      <v-col md="4">
        <v-text-field label="请输入搜索关键字...按回车搜素" v-model="keyWord" dense clearable outlined @keyup.enter="search">
        </v-text-field>
      </v-col>

      <!-- 搜索按钮 -->
      <v-col md="2">
        <v-btn @click="search" outlined>
          <v-icon>mdi-magnify</v-icon>搜索一下
        </v-btn>
      </v-col>

      <v-col md="1">
        <!-- 展示加载中 -->
        <div v-show="info.isLoading">
          <!-- <v-progress-circular :size="500" :width="30" color="purple" indeterminate></v-progress-circular> -->
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>

    </v-row>


    <!-- 展示功能 -->
    <v-row>



      <div>
        <!-- 展示词 -->
        <div>
          <h1 v-show="info.isFirst">请输入搜索关键字...按回车进行搜索</h1>
        </div>


        <!-- 展示错误信息 -->
        <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>


        <!-- 展示未查询到结果信息 -->
        <h1 v-show="unsearched">未搜索到信息</h1>
      </div>
    </v-row>
    <div>
      <!-- 列表 -->
      <div class="img-box" v-show="info.users.length" v-for="item in info.users" :key="item.id">

        <div @click="canvasco">
          <v-img @click="updatesdetail(item)" :src="item.src" :aspect-ratio="279.984 / 186.656" />
        </div>

        <span class="res-span">{{ item.res }}</span>

        <span class="down-span">
          <a :href="item.src" target="downloadFile">保存</a>
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




      <div class="image-background" v-if="isdtpageshow">
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

    <div v-show="info.users.length" class="text-center pagination-bar">
      <v-container>
        <div class="vue_pagination">
          <v-pagination v-model="page" :length="length" @input="$vuetify.goTo(0, 'duration'), lol()"
            prev-icon="arrow_left" next-icon="arrow_right"></v-pagination>
          <hr />

          <v-btn>当前共 {{ this.total }} 张 / {{ this.length }} 页 Page = {{ this.page }}</v-btn>
        </div>
      </v-container>
    </div>

  </v-container>
</template>


