<template>
  <div v-if="!auth.isLoading && auth.isLoaded">
    <nav>
      <Button class="p-button-text">
        <router-link to="/">Home</router-link>
      </Button>
      <Button class="p-button-text">
        <router-link to="/auth" v-if="!auth.isLoggedIn">Auth</router-link>
      </Button>
      <Button v-if="auth.isLoggedIn" @click="logOut" label="Log out" class="p-button-secondary p-button-raised" />
    </nav>
    <router-view/>
  </div>
  <div v-else>
    LOADING...
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { AuthActionTypes } from './store/action-types'

export default defineComponent({
  setup () {
    const { state, dispatch } = useStore()

    onBeforeMount(() => {
      dispatch(AuthActionTypes.AUTHENTICATE)
    })

    const logOut = () => dispatch(AuthActionTypes.LOG_OUT)

    return {
      auth: computed(() => state.auth.common),
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
    justify-content: space-between;
  }
  .p-button-text a {
    color: inherit;
  }
</style>
