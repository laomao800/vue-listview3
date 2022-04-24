import type { App, DefineComponent } from 'vue'
import 'element-plus/es/components/button-group/style/css'
import 'element-plus/es/components/dropdown/style/css'
import { create } from '@/create'
import _Listview from './Listview'

function bindInstall(name: string, component: DefineComponent) {
  const install = (app: App) => app.component(name, component)
  // @ts-ignore
  component.install = install
  return component
}

const Listview = bindInstall('Listview', _Listview as any)
// const ListviewContainer = bindInstall('ListviewContainer', _ListviewContainer)

export default Listview
export { create, Listview }
