<template>
  <AuthWrapper />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, onUpdated, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import AuthWrapper from '@/components/Auth/AuthWrapper.vue'

export default defineComponent({
  name: 'AuthView',
  components: {
    AuthWrapper
  },
  setup () {
    const { getters } = useStore()
    const router = useRouter()

    const isAuthLoading = computed(() => getters.isAuthLoading)
    const isAuthenticated = computed(() => getters.isAuthenticated)

    onBeforeMount(() => {
      if (!isAuthLoading.value && isAuthenticated.value) {
        router.push('/')
      }
    })
  }
})
</script>
