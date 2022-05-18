<template>
  <AuthWrapper />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthWrapper from '@/components/Auth/AuthWrapper.vue'

export default defineComponent({
  name: 'AuthView',
  components: {
    AuthWrapper
  }
})
</script>
