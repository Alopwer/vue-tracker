import { ToastSeverity } from 'primevue/api'

export type ListOption = {
  label: string;
  value: string;
}

export type OverlayPanelElType = HTMLElement & {
  toggle: (...args: any[]) => any;
}

export const toastConfig = {
  life: 3000
}

export const toastSuccessConfig = {
  ...toastConfig,
  severity: ToastSeverity.SUCCESS,
  summary: 'Success'
}

export const toastErrorConfig = {
  ...toastConfig,
  severity: ToastSeverity.ERROR,
  summary: 'Error'
}
