<template>
  <div v-if="auth.isLoaded && !auth.isLoading">
    <NavBar v-if="isAuthenticated" />
    <router-view/>
  </div>
  <div v-else>
    LOADING...
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'
import { AuthActionTypes } from './store/auth/action-types'
import { CoworkerActionTypes } from './store/coworkers/action-types'
import NavBar from './components/NavBar/NavBar.vue'

export default defineComponent({
  components: {
    NavBar
  },
  setup () {
    const { state, dispatch, getters } = useStore()
    const router = useRouter()

    const isAuthLoading = computed(() => getters.isAuthLoading)
    const isAuthenticated = computed(() => getters.isAuthenticated)

    onBeforeMount(() => {
      dispatch(AuthActionTypes.AUTHENTICATE)
      dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS)
    })

    watch([isAuthenticated, isAuthLoading], () => {
      if (!isAuthenticated.value && !isAuthLoading.value) {
        router.push('/auth')
      }
    })

    return {
      auth: computed(() => state.auth.common),
      isAuthenticated
    }
  }
})
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
  body {
    background-color: var(--surface-ground);
    font-family: var(--font-family);
    color: var(--text-color);
  }
</style>
