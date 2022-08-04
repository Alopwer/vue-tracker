import { ref } from 'vue'

export const useMenu = <T>(onToggleMenu?: (data: T) => void) => {
  const menu = ref()

  const toggleMenu = (event: PointerEvent, data: T) => {
    menu.value.toggle(event)
    onToggleMenu && onToggleMenu(data)
  }

  return {
    menu,
    toggleMenu
  }
}
