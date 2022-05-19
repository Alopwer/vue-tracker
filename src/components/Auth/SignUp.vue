<template>
  <form class="grid p-fluid">
    <div class="col-12">
      <InputText type="text" placeholder="email" v-model="signUpData.email" />
    </div>
    <div class="col-12">
      <InputText type="text" placeholder="username" v-model="signUpData.username" />
    </div>
    <div class="col-12">
      <InputText type="password" placeholder="password" v-model="signUpData.password" />
    </div>
    <span v-if="signUpError.length">{{ signUpError }}</span>
    <div class="col-12">
      <Button label="Sign up" @click="signUp" class="p-button-secondary p-button-raised" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onBeforeUnmount, onBeforeMount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { EMPTY_ERROR } from '@/constants'
import { useStore } from '../../store'
import { AuthMutationTypes } from '../../store/auth/mutation-types'
import { AuthActionTypes } from '../../store/auth/action-types'

export default defineComponent({
  emits: ['switchActiveForm'],
  name: 'SignUp',
  setup (_, { emit }) {
    const { state, dispatch, commit } = useStore()

    onBeforeRouteLeave(() => {
      clearForm()
      commit(AuthMutationTypes.SET_SIGN_UP_ERROR, EMPTY_ERROR)
    })

    onBeforeMount(() => {
      commit(AuthMutationTypes.SET_SIGN_UP_FULLFILLED, false)
    })

    const signUpData = reactive({
      username: '',
      email: '',
      password: ''
    })

    const signUpError = computed(() => state.auth.errors.signUp.message)

    function signUp () {
      dispatch(AuthActionTypes.SIGN_UP, signUpData)
    }

    function clearForm () {
      signUpData.email = ''
      signUpData.password = ''
      signUpData.username = ''
    }

    watch(
      () => state.auth.signUp.fullfilled,
      (isSignUpFullfilled) => {
        if (isSignUpFullfilled) {
          emit('switchActiveForm')
        }
      }
    )

    return {
      signUpData,
      signUp,
      signUpError
    }
  }
})
</script>
