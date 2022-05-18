<template>
  <form class="grid p-fluid">
    <div class="col-12">
      <InputText type="text" placeholder="email" v-model="logInData.email" />
    </div>
    <div class="col-12">
      <InputText type="password" placeholder="password" v-model="logInData.password" />
    </div>
    <span v-if="logInError.length">{{ logInError }}</span>
    <div class="col-12">
      <Button label="Log In" @click="logIn" class="p-button-secondary p-button-raised w-full" />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { EMPTY_ERROR } from '@/constants'
import { AuthMutationTypes } from '../../store/mutation-types'
import { AuthActionTypes } from '../../store/action-types'

export default defineComponent({
  setup () {
    const { state, dispatch, commit } = useStore()
    const router = useRouter()

    const logInData = reactive({
      email: '',
      password: ''
    })

    const logInError = computed(() => state.auth.errors.logIn.message)

    async function logIn () {
      dispatch(AuthActionTypes.LOG_IN, logInData)
    }

    function clearForm () {
      logInData.email = ''
      logInData.password = ''
    }

    watch(
      () => state.auth.user.username,
      (username) => {
        if (username) {
          router.push('/')
        }
      }
    )

    onBeforeRouteLeave(() => {
      clearForm()
      commit(AuthMutationTypes.SET_LOGGED_IN_ERROR, EMPTY_ERROR)
    })

    return {
      logInData,
      logIn,
      logInError
    }
  }
})
</script>
