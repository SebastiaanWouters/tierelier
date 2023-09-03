import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(autoAnimatePlugin).mount('#app')
