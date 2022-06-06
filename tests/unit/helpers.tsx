import type { ListviewProps } from '~/types'
import { vi } from 'vitest'
import { mount, MountingOptions } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { get, set } from 'lodash-es'
import { Listview } from '@/index'

export async function createListviewWrapper(
  propsData: Partial<ListviewProps> = {},
  component: any = Listview,
  opts: MountingOptions<any> = {}
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

  const wrapper = mount(component, {
    global: { plugins: [ElementPlus] },
    propsData: {
      requestHandler: requestSpy,
      ...propsData,
    },
    ...opts,
  })

  const vm = wrapper.vm as any
  const storeWrapper = wrapper.findComponent({ ref: 'storeProviderRef' })
  const storeVm = storeWrapper.vm

  await wait()
  return { requestSpy, wrapper, vm, storeWrapper, storeVm }
}

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const mockDataList = Array(10)
  .fill(undefined)
  .map((row, index) => ({ id: index, name: `row${index}` }))

export function mountWithEl(component: any, opts: MountingOptions<any> = {}) {
  const plugins = get(opts, 'global.plugins', [])
  plugins.push(ElementPlus)
  set(opts, 'global.plugins', plugins)

  return mount(component, opts)
}
