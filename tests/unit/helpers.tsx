import { MountingOptions, mount } from '@vue/test-utils'
import { vi } from 'vitest'

import type { ListviewProps, LvStore } from '~/types'

import { Listview } from '@/index'

export async function createListviewWrapper(
  attrs: Partial<ListviewProps> = {},
  component: any = Listview,
  opts: MountingOptions<any> = {}
) {
  const requestSpy = vi.fn(() =>
    Promise.resolve({
      success: true,
      result: {
        items: mockDataList,
        total: 40,
      },
    })
  )

  const wrapper = mount(component, {
    attrs: {
      requestHandler: requestSpy,
      ...attrs,
    },
    ...opts,
  })

  const vm = wrapper.vm
  const lvStore: LvStore = wrapper.findComponent({ name: 'ListviewLayout' }).vm
    .lvStore

  // 此处需以 setTimeout 等待 lvStore 内部初始化及挂载后如 contentData 等的数据请求写入
  await new Promise((resolve) => setTimeout(resolve))

  return { requestSpy, wrapper, vm, lvStore }
}

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const mockDataList = Array(10)
  .fill(undefined)
  .map((_row, index) => ({ id: index, name: `row${index}` }))
