<script>
import TzFooter from './components/TzFooter.vue'
import TzHeader from './components/TzHeader.vue'
import TzMain from './components/views/MainPage.vue'

export default {
  components: {
    TzFooter, TzHeader, TzMain
  },
  data() {
    return {
      count: 2,
    }
  }
}

</script>

<template>
  <n-config-provider>
    <n-layout>
      <n-layout-header bordered>
        <TzHeader></TzHeader>
      </n-layout-header>

      <n-layout-content content-style="padding: 24px;">
        <TzMain></TzMain>
      </n-layout-content>

      <n-layout-footer>
        <TzFooter></TzFooter>
      </n-layout-footer>
    </n-layout>

  </n-config-provider>
</template>