import DefaultTheme from 'vitepress/theme'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-switch.css'
import 'element-plus/theme-chalk/el-dialog.css'
import 'element-plus/theme-chalk/el-overlay.css'
import './custom.css'
import DemoBox from '../components/DemoBox.vue'
import { Listview, ListviewContainer } from '../../../'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoBox', DemoBox)
    app.component('Listview', Listview)
    app.component('ListviewContainer', ListviewContainer)
  },
}
