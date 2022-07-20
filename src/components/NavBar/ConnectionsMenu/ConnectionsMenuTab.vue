<template>
  <div class="users text-sm" v-if="userConnections.length">
    <div class="users__item"
      v-for="user in userConnections"
      v-bind:key="user.id">
      <div class="users-block">
        <div class="flex">
          <i class="pi pi-user"></i>
          <p class="mb-0">{{ user.username }}</p>
        </div>
        <Button v-if="canSendConnectionRequest"
          icon="pi pi-plus"
          class="p-button-success p-button-rounded p-button-text p-button-sm"
          @click="sendConnectionRequest(user.userId)" />
        <Button v-else
          icon="pi pi-minus"
          class="p-button-danger p-button-rounded p-button-text p-button-sm"
          @click="deleteConnection(user.userId)" />
      </div>
    </div>
  </div>
  <p class="mt-3 mb-1 text-center text-sm" v-else>
    No connections found
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { User } from '../../../api/user.api'
import { useStore } from '../../../store'
import { CoworkerActionTypes } from '../../../store/coworkers/action-types'

export default defineComponent({
  name: 'ConnectionsMenuTab',
  props: {
    userConnections: Object as PropType<User>,
    canSendConnectionRequest: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    const sendConnectionRequest = async (userId: string) => {
      dispatch(CoworkerActionTypes.SEND_CONNECTION_REQUEST, userId)
    }

    const deleteConnection = async (userId: string) => {
      dispatch(CoworkerActionTypes.DELETE_CONNECTION, userId)
    }

    return {
      ...toRefs(props),
      sendConnectionRequest,
      deleteConnection
    }
  }
})
</script>

<style scoped lang="scss">
  .users-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    p {
      margin-top: 0;
    }
    i {
      margin-right: 0.75rem;
    }
  }
  .p-button {
    &.p-button-sm {
      padding: 0;
    }
    &.p-button-icon-only {
      width: 1.5rem;
      &.p-button-rounded {
        height: 1.5rem;
      }
    }
  }
</style>
<style scoped>
  .p-button.p-button-sm >>> .p-button-icon {
    font-size: 0.75rem;
  }
</style>
