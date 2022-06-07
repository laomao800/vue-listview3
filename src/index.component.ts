import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/button-group/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/input-number/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/time-picker/style/css'
import 'element-plus/es/components/time-select/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/breadcrumb/style/css'
import 'element-plus/es/components/breadcrumb-item/style/css'

import type { App, Component } from 'vue'
import { create } from './create'
import _Listview from './Listview'
import _ListviewContainer from './ListviewContainer'

function bindInstall(name: string, component: Component) {
  const install = (app: App) => app.component(name, component)
  // @ts-ignore
  component.install = install
  return component
}

const Listview = bindInstall('Listview', _Listview as any)
const ListviewContainer = bindInstall('ListviewContainer', _ListviewContainer)

export default Listview
export { create, Listview, ListviewContainer }
