<template>
  <div id="app" v-loading="busy" class="d-flex w-100 h-100">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class AppRoot extends Vue {
  private busy = false

  private mounted() {
    Vue.prototype.controlLoading = (b: boolean) => {
      this.busy = b
    }
  }
}
</script>

<style lang="less" scoped>
</style>