import { isPlainObject } from 'is-what'
import { pick } from 'lodash-es'
import { defineComponent, ref, unref, useSlots } from 'vue'

import { Listview } from '@/index'

const allowPresetProps = [
  // Store
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
  'pageAttrs',
  'pagePosition',
  'replaceComponents',

  // ListviewLayout
  'height',
  'fullHeight',

  // Filterbar
  'searchButton',
  'resetButton',
]

const create = (options: Record<string, any> = {}) => {
  options = isPlainObject(options) ? options : {}
  const overwriteProps = pick(options, allowPresetProps)

  return defineComponent({
    name: 'ListviewPreset',
    setup(_props, { expose }) {
      const slots = useSlots()
      const lvRef = ref(null as any)

      expose({
        updateLayout: (...args: any) => unref(lvRef)?.updateLayout(...args),
        resetFilter: (...args: any) => unref(lvRef)?.resetFilter(...args),
        search: (...args: any) => unref(lvRef)?.search(...args),
        setContentMessage: (...args: any) =>
          unref(lvRef)?.setContentMessage(...args),
      })

      return () => (
        // @ts-ignore
        <Listview
          ref={lvRef}
          {...overwriteProps}
          v-slots={{ ...slots }}
        ></Listview>
      )
    },
  })
}

export { create }
