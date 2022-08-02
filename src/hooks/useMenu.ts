import { ref } from 'vue'

export const useMenu = () => {
  const menu = ref()

  const toggleMenu = (event: PointerEvent) => {
    menu.value.toggle(event)
  }

  return {
    menu,
    toggleMenu
  }
}
