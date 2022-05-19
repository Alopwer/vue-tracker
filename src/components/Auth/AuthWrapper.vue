<template>
  <div class="col-3 absolute auth-wrapper">
    <LogIn v-if="activeForm === ActiveForm.LogIn" />
    <SignUp v-else @switchActiveForm="switchActiveForm" />
    <Button :label="buttonLabel" @click="switchActiveForm" class="w-full" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import LogIn from './LogIn.vue'
import SignUp from './SignUp.vue'

enum ActiveForm {
  LogIn,
  SignUp
}

export default defineComponent({
  name: 'AuthWrapper',
  components: {
    LogIn,
    SignUp
  },
  setup () {
    const activeForm = ref(ActiveForm.LogIn)
    const buttonLabel = computed(() => activeForm.value === ActiveForm.LogIn ? 'Don\'t have an account?' : 'Have an account?')

    function switchActiveForm () {
      activeForm.value = activeForm.value === ActiveForm.LogIn ? ActiveForm.SignUp : ActiveForm.LogIn
    }

    return {
      activeForm,
      ActiveForm,
      switchActiveForm,
      buttonLabel
    }
  }
})
</script>

<style scoped lang="scss">
  .auth-wrapper {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
