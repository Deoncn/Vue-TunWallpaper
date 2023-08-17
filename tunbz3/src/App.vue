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

  <div>
    <TzHeader></TzHeader>
    <TzMain></TzMain>
    <TzFooter></TzFooter>

  </div>

</template>