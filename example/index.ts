import { createApp } from 'vue'
import 'normalize.css'

import App from './App.vue'
import { worker } from '../tests/mocks/browser'
worker.start()

createApp(App).mount('#app')
