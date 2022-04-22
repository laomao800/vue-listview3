import { defineComponent } from 'vue'
import { pick, isPlainObject } from 'lodash-es'
import { Listview as _Listview } from '@/index'

const allowPresetProps = [
  // StoreProvider
  'pressEnterSearch',
  'autoload',
  'requestMethod',
  'requestConfig',
  'transformRequestData',
  'transformResponseData',
  'contentDataMap',
  'contentMessage',
  'validateResponse',
  'resolveResponseErrorMessage',
  'usePage',
  'pageSize',
  'pageSizes',
  'pageProps',
  'pagePosition',

  // ListviewLayout
  'height',
  'fullHeight',

  // Filterbar
  'searchButton',
  'resetButton',
]

const create = (options: Record<string, any> = {}) => {
  options = isPlainObject(options) ? options : {}
  const { replaceComponents = {}, ..._options } = options

  return defineComponent({
    extends: _Listview,
    data() {
      return {
        presetProps__: pick(_options, allowPresetProps),
        replaceComponents__: replaceComponents,
      }
    },
  })
}

export { create }
