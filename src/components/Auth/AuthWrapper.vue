<template>
  <div class="col-4">
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
