import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { worker } from '../tests/mocks/browser'
worker.start()

createApp(App).mount('#app')
