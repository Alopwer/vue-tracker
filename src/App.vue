<template>
  <div v-if="auth.isLoaded && !auth.isLoading">
    <nav>
      <Button v-if="isAuthenticated" @click="logOut" label="Log out" class="p-button-secondary p-button-raised " />
    </nav>
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

export default defineComponent({
  setup () {
    const { state, dispatch, getters } = useStore()
    const router = useRouter()

    onBeforeMount(() => {
      dispatch(AuthActionTypes.AUTHENTICATE)
    })

    const logOut = () => dispatch(AuthActionTypes.LOG_OUT)

    const isAuthLoading = computed(() => getters.isAuthLoading)
    const isAuthenticated = computed(() => getters.isAuthenticated)

    watch([isAuthenticated, isAuthLoading], () => {
      if (!isAuthenticated.value && !isAuthLoading.value) {
        router.push('/auth')
      }
    })

    console.log(router.currentRoute.value)

    return {
      auth: computed(() => state.auth.common),
      isAuthenticated,
      logOut
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
  nav {
    display: flex;
    justify-content: end;
  }
  .p-button-text a {
    color: inherit;
  }
</style>
