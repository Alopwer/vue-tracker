import axios from 'axios'
import { createApp } from 'vue'
import { AuthApi } from '@/api'
import App from './App.vue'
import router from './router'
import { store } from './store'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Chip from 'primevue/chip'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Textarea from 'primevue/textarea'
import Menu from 'primevue/menu'
import FileUpload from 'primevue/fileupload'
import 'primevue/resources/themes/vela-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.response.use((response) => {
  return response.data
}, async (error) => {
  const statusCode: number = error.response.status
  const requestUrl: string = error.request.responseURL
  if (statusCode === 401 && !requestUrl.includes('refresh-token')) {
    try {
      await AuthApi.refreshToken()
    } catch (e) {
      console.log(error)
      return Promise.reject(new Error(error.response.data.message))
    }
    return axios.request(error.config)
  }
  return Promise.reject(new Error(error.response.data.message))
})

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component('Button', Button)
  .component('Dialog', Dialog)
  .component('InputText', InputText)
  .component('OverlayPanel', OverlayPanel)
  .component('TabView', TabView)
  .component('TabPanel', TabPanel)
  .component('Dropdown', Dropdown)
  .component('MultiSelect', MultiSelect)
  .component('Chip', Chip)
  .component('Toast', Toast)
  .component('Textarea', Textarea)
  .component('Menu', Menu)
  .component('FileUpload', FileUpload)
  .mount('#app')
