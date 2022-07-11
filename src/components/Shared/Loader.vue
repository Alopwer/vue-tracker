<template>
  <div class="app-loader">
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLoader'
})
</script>

<style lang="scss" scoped>
  .app-loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
