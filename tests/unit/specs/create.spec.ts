import { wait } from './../helpers'
/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, markRaw } from 'vue'
import { describe, it, expect } from 'vitest'
import { pick } from 'lodash-es'
import { Listview, create as createListview } from '@/index'

import { createListviewWrapper } from '../helpers'

const globalConfig = {
  requestConfig: { headers: { 'my-header': 'text' } },
  validateResponse: () => false,
  resolveResponseErrorMessage: () => 'config error from global',
  transformRequestData(data: Record<string, any>) {
    data.addon = 'requestAddon from global'
    return data
  },
  transformResponseData(response: Record<string, any>) {
    response.addon = 'responseAddon from global'
    return response
  },
  contentDataMap: {
    addon: 'addon',
    items: 'result.items',
    total: 'result.total',
  },
  usePage: { pageIndex: 'global_page_index', pageSize: 'global_page_size' },
}

const ListviewNormal = createListview({})
const ListviewCustom = createListview(globalConfig)

describe('Create config', () => {
  it('Create normal listview', async () => {
    const { vm: vmOrigin } = await createListviewWrapper({}, Listview)
    const { vm: vmNormal } = await createListviewWrapper({}, ListviewNormal)
    const { vm: vmCustom } = await createListviewWrapper({}, ListviewCustom)
    expect(vmOrigin.presetProps__).toEqual(undefined)
    expect(vmNormal.presetProps__).toEqual({})
    expect(vmCustom.presetProps__).toEqual(globalConfig)
  })

  it('Apply global config', async () => {
    const { requestSpy, lvStore } = await createListviewWrapper(
      {},
      ListviewCustom
    )
    expect(requestSpy.mock).toHaveProperty('calls[0][0].global_page_index')
    expect(requestSpy.mock).toHaveProperty('calls[0][0].global_page_size')
    expect(lvStore.contentData).toHaveProperty('addon')
    expect(lvStore.contentData).toHaveProperty('items')
    expect(lvStore.contentData).toHaveProperty('total')
  })

  it('Props override global config', async () => {
    const propsData = {
      validateResponse: () => true,
      resolveResponseErrorMessage: () => 'config error from prop',
      transformRequestData(data: Record<string, any>) {
        data.addon = 'requestAddon from prop'
        return data
      },
      transformResponseData(response: Record<string, any>) {
        response.addon = 'responseAddon from prop'
        return response
      },
      contentDataMap: {
        addon: 'prop.addon',
        items: 'prop.result.items',
        total: 'prop.result.total',
      },
      usePage: {
        pageIndex: 'prop_page_index',
        pageSize: 'prop_page_size',
      },
    }
    const { vm, requestSpy } = await createListviewWrapper(
      propsData,
      ListviewCustom
    )
    expect(pick(vm.mergedAttrs, Object.keys(propsData))).toEqual(propsData)
    expect(requestSpy.mock).toHaveProperty('calls[0][0].prop_page_index')
    expect(requestSpy.mock).toHaveProperty('calls[0][0].prop_page_size')
  })

  it('requestConfig', async () => {
    const { lvStore } = await createListviewWrapper({}, ListviewCustom)
    expect(lvStore.getRequestConfig()).toHaveProperty(
      'headers',
      globalConfig.requestConfig.headers
    )
  })
})

// describe('Replace component', () => {
//   const createComponent = (name: string) =>
//     defineComponent(
//       markRaw({
//         render: () => h('div', { class: `custom-${name}` }, name),
//       })
//     )

//   const Listview = createListview({
//     replaceComponents: {
//       header: createComponent('header'),
//       filterbar: createComponent('filterbar'),
//       content: createComponent('content'),
//       footer: createComponent('footer'),
//     },
//   })

//   it('replaceComponents', async () => {
//     const { wrapper } = await createListviewWrapper({}, Listview)
//     expect(wrapper.find('div.custom-header').exists()).toBe(true)
//     expect(wrapper.find('div.custom-filterbar').exists()).toBe(true)
//     expect(wrapper.find('div.custom-content').exists()).toBe(true)
//     expect(wrapper.find('div.custom-footer').exists()).toBe(true)
//   })
// })
