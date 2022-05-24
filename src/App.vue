<template>
  <div v-if="auth.isLoaded && !auth.isLoading">
    <NavBar v-if="isAuthenticated" />
    <div class="container">
      <router-view/>
    </div>
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
import NavBar from './components/NavBar/NavBar.vue'
import { CoworkerActionTypes } from './store/coworkers/action-types'

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
    })

    watch([isAuthenticated, isAuthLoading], ([isAuthenticatedValue, isAuthLoadingValue]) => {
      if (!isAuthenticatedValue && !isAuthLoadingValue) {
        router.push('/auth')
      }
      if (isAuthenticatedValue) {
        dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS)
        dispatch(CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS)
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
    margin: 10px 20px;
  }
  .container {
    margin: 20px 0;
  }
</style>
