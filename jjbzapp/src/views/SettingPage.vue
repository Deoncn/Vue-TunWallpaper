<template>
  <v-container>
    <div class="settings">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="9" lg="7" xl="5">

          <v-card class="settings-card">
            <v-card-title>通用设置</v-card-title>
            <v-btn class="settings-reset-dark" outlined @click="resetstate"> 重置 </v-btn>

            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      主题切换
                      <v-icon>palette</v-icon>
                      <div class="settings-panel-msg">切换网页主题色系</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch v-model="Defaultstate.theme.dark" inset></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>


            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      全屏预览
                      <v-icon>screenshot_monitor</v-icon>
                      <div class="settings-panel-msg">开启后点击任意小图，直接开启大图</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch v-model="Defaultstate.fullscreen" inset></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>

            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      新开页面
                      <v-icon>style</v-icon>
                      <div class="settings-panel-msg">开启后，点击任意小图，直接打开新开页面预览大图</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch inset v-model="Defaultstate.detail"></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>

            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      切换动画
                      <v-icon large>gif</v-icon>
                      <div class="settings-panel-msg">开启后 当预览大图时左右切换时，出现滑动动画效果</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch inset v-model="Defaultstate.animation"></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>




            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      高清模式
                      <v-icon>hd</v-icon>
                      <div class="settings-panel-msg">根据显示器适配高分辨率预览图</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch inset v-model="Defaultstate.hdmode"></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>




            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="11">
                      紧凑样式
                      <v-icon>view_quilt</v-icon>
                      <div class="settings-panel-msg">小图之间样式没有空白间隙，紧凑样式展示</div>
                    </v-col>
                    <v-col cols="1">
                      <v-switch inset v-model="Defaultstate.compact"></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <hr>

            <v-row justify="center">
              <v-col cols="12">
                <div class="settings-panel">
                  <v-row align="center">
                    <v-col cols="10">
                      <span>主页每张个数</span>
                      <v-icon>event_seat</v-icon>
                      <div class="settings-panel-msg">选择每页请求多少个图片，默认24个</div>
                    </v-col>
                    <v-col cols="2">
                      <v-select :items="pageitems" v-model="Defaultstate.size" dense outlined>
                      </v-select>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

          </v-card>
        </v-col>
      </v-row>


    </div>

  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'


export default {
  data() {
    return {
      pageitems: ['24', '48', '96'],

      
      db: null,
      request: null,

    }
  },

  computed: {
    // 链接vuex
    ...mapState('settings', { Defaultstate: 'Defaultstate' }),
  },

  methods: {

    // 借助 mappMutations 生成对应的方法，方法中会调用 commit 去联系 mutations
    ...mapMutations('settings', { hello: 'HELLO', resetstate: 'RESET_STATE' }),

  },


  watch: {


    Defaultstate: {
      deep: true,
      handler(value) {
        localStorage.setItem("Defaultstate", JSON.stringify(value));
      },
    },


  },



  beforeCreate: function () {

    // console.log("beforeCreate ,  在组件实例初始化完成之后立即调用。 ")
  },

  // vuex 的数据会在 created 后立即初始化 所以 beforeCreate 无法使用
  created: function () {
    // console.log(this.Defaultstate)
    // console.log("Create ,  在组件实例处理完所有与状态相关的选项后调用。 ")
  },


  beforeMount: function () {
    // console.log(this.Defaultstate)
    // console.log("beforeMount , 在组件被挂载之前调用。 ")
  },

  mounted: function () {
    // console.log("mounted , 在组件被挂载之后调用。 ")
  },


  beforeUpdate: function () {
    // console.log("beforeUpdate, 在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。")
  },


  updated: function () {

    this.$vuetify.theme.dark = this.Defaultstate.theme.dark;
    // console.log("updated , 在组件因为一个响应式状态变更而更新其 DOM 树之后调用。")
  }

}
</script>
