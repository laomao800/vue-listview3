import { vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { ListviewProps } from '~/types'
import { Listview } from '@/index'

export async function createListviewWrapper(
  propsData: Partial<ListviewProps> = {}
) {
  const requestSpy = vi.fn(() =>
    Promise.resolve({
      success: true,
      result: {
        items: mockDataList,
        total_count: 40,
      },
    })
  )

  // const Listview = { render }

  const wrapper = mount(Listview, {
    global: { plugins: [ElementPlus] },
    propsData: {
      requestHandler: requestSpy,
      ...propsData,
    },
  })
  const vm = wrapper.vm as any
  const storeWrapper = wrapper.findComponent({ name: 'StoreProvider' })
  const storeVm = wrapper.findComponent({ name: 'StoreProvider' }).vm as any

  await wait()
  return { requestSpy, wrapper, vm, storeWrapper, storeVm }
}

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const mockDataList = Array(10)
  .fill(undefined)
  .map((row, index) => ({ id: index, name: `row${index}` }))

export function removeElCascaderHtmlId(html: string) {
  return html.replace(/id="cascader-menu-\d+-\d+"/, '')
}

export function mountWithEl(c: any, o: Parameters<typeof mount>[1] = {}) {
  const plugins = o?.global?.plugins || []
  return mount(c, {
    ...o,
    global: { plugins: [ElementPlus, ...plugins] },
  })
}
