<template>
  <nav>
    <ConnectionsMenu />
    <Button @click="logOut" label="Log out" class="p-button-secondary p-button-outlined p-button-sm" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../../store'
import { AuthActionTypes } from '../../store/auth/action-types'
import ConnectionsMenu from './ConnectionsMenu/ConnectionsMenu.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    ConnectionsMenu
  },
  setup () {
    const { dispatch } = useStore()

    const logOut = () => dispatch(AuthActionTypes.LOG_OUT)

    return {
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
  .p-overlaypanel {
    &::before, &::after {
      display: none;
    }
  }
  .users {
    &__item {
      p {
        margin-bottom: 0;
      }
    }
  }
  .p-tabview {
    div.p-tabview-panels {
      padding: 0 0.75rem;
    }
    .p-tabview-nav li {
      & a.p-tabview-nav-link {
        padding: 0.75rem;
        &:not(.p-disabled):focus {
          box-shadow: none;
        }
      }
    }
  }
</style>
