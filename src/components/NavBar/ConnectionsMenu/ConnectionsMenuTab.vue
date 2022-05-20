<template>
  <div class="users text-sm" v-if="userConnections.length">
    <div class="users__item"
      v-for="user in userConnections"
      v-bind:key="user.id">
      <p>{{ user.username }}</p>
    </div>
  </div>
  <p class="mt-3 mb-1 text-center text-sm" v-else>
    No connections found
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { User } from '../../../api/user.api'

export default defineComponent({
  name: 'ConnectionsMenuTab',
  props: {
    userConnections: Object as PropType<User>
  },
  setup (props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>
