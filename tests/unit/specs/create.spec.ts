import { describe, it, expect, vi } from 'vitest'
import { defineComponent, markRaw, h } from 'vue'
import { pick } from 'lodash-es'
import axios from 'axios'
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

describe('Create api', () => {
  it('Create ListviewPreset component', async () => {
    const { wrapper: wOrigin } = await createListviewWrapper({}, Listview)
    const { wrapper: wNormal } = await createListviewWrapper({}, ListviewNormal)
    const { wrapper: wCustom } = await createListviewWrapper({}, ListviewCustom)
    expect(
      wOrigin.findComponent({ name: 'ListviewPreset' }).exists()
    ).toBeFalsy()
    expect(
      wNormal.findComponent({ name: 'ListviewPreset' }).exists()
    ).toBeTruthy()
    expect(
      wCustom.findComponent({ name: 'ListviewPreset' }).exists()
    ).toBeTruthy()
  })

  it('Apply global config', async () => {
    const { requestSpy, lvStore } = await createListviewWrapper(
      {},
      ListviewCustom
    )
    expect(requestSpy.mock).toHaveProperty('calls[0][0].global_page_index')
    expect(requestSpy.mock).toHaveProperty('calls[0][0].global_page_size')
    expect(lvStore.state.contentData).toHaveProperty('addon')
    expect(lvStore.state.contentData).toHaveProperty('items')
    expect(lvStore.state.contentData).toHaveProperty('total')
  })

  it('requestConfig', async () => {
    const spy = vi.fn(axios.create())
    vi.spyOn(axios, 'create').mockImplementation(() => spy as any)

    await createListviewWrapper(
      { requestHandler: undefined, requestUrl: '/mock/list' },
      ListviewCustom
    )

    expect(spy.mock).toHaveProperty(
      'calls[0][0].headers',
      globalConfig.requestConfig.headers
    )
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
    const { wrapper, requestSpy } = await createListviewWrapper(
      propsData,
      ListviewCustom
    )
    const curProps = pick(
      wrapper.findComponent({ name: 'ListviewMain' }).props(),
      Object.keys(propsData)
    )
    expect(curProps).toEqual(propsData)
    expect(requestSpy.mock).toHaveProperty('calls[0][0].prop_page_index')
    expect(requestSpy.mock).toHaveProperty('calls[0][0].prop_page_size')
  })
})

describe('Replace component', () => {
  const createComponent = (name: string) =>
    defineComponent(
      markRaw({
        inheritAttrs: false,
        render: () => h('div', { class: `custom-${name}` }, name),
      })
    )

  const Listview = createListview({
    replaceComponents: {
      header: createComponent('header'),
      filterbar: createComponent('filterbar'),
      content: createComponent('content'),
      footer: createComponent('footer'),
    },
  })

  it('replaceComponents', async () => {
    const { wrapper } = await createListviewWrapper({}, Listview)
    expect(wrapper.find('div.custom-header').exists()).toBe(true)
    expect(wrapper.find('div.custom-filterbar').exists()).toBe(true)
    expect(wrapper.find('div.custom-content').exists()).toBe(true)
    expect(wrapper.find('div.custom-footer').exists()).toBe(true)
  })
})
