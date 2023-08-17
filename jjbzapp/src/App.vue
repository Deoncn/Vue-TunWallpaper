<template>
  <v-app id="app">
    <BzHeader></BzHeader>

    <v-main class="lighten-4 pt-16">
      <router-view></router-view>
    </v-main>

    <BzFooter></BzFooter>
  </v-app>
</template>


<script>
import { mapState } from 'vuex'
import BzFooter from '@/components/BzFooter.vue'
import BzHeader from '@/components/BzHeader.vue'

export default {
  name: 'App',
  components: {
    BzFooter,
    BzHeader
  },

  computed: {
    // 链接vuex
    ...mapState('settings', { Defaultstate: 'Defaultstate' }),
  },


  created() {
    this.$vuetify.theme.dark = this.Defaultstate.theme.dark;

    // console.log( parseInt( 24 /24 ))

  },

};
</script>