import { describe, expect, it } from 'vitest'

import { createListviewWrapper } from '../helpers'

describe('Table content', () => {
  it('Column render', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper } = await createListviewWrapper({ tableColumns })
    expect(wrapper.findAllComponents({ name: 'ElTableColumn' }).length).toBe(
      // 加上选择列
      tableColumns.length + 1
    )
  })

  it('Column custom render', async () => {
    const tableColumns = [
      { render: () => <div class="custom-column-render"></div> },
    ]
    const { wrapper } = await createListviewWrapper({ tableColumns })
    expect(wrapper.find('div.custom-column-render').exists()).toBe(true)
  })

  it('Row select', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, lvStore } = await createListviewWrapper({
      tableColumns,
    })
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowWrapper.at(1).find('td').element.click()
    await rowWrapper.at(2).find('td').element.click()
    // expect(storeWrapper.emitted('update:selection')!.length).toBe(2)
    expect(lvStore.state.selection.length).toBe(2)
    expect(wrapper.findAll('tr.lv-row--selected').length).toBe(2)
  })

  it('Row selectable', async () => {
    document.body.innerHTML = '<div id="app"></div>'
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, lvStore } = await createListviewWrapper(
      {
        tableColumns,
        tableSelectionColumn: {
          selectable: (_row, index) => index !== 1,
        },
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      { attachTo: document.getElementById('app')! }
    )
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowWrapper.at(0).find('.el-checkbox').trigger('click')
    await rowWrapper.at(1).find('.el-checkbox').trigger('click')
    await rowWrapper.at(2).find('.el-checkbox').trigger('click')

    // expect(storeWrapper.emitted('update:selection')?.length).toBe(2)
    expect(lvStore.state.selection.length).toBe(2)
    expect(wrapper.findAll('tr.lv-row--selected').length).toBe(2)
  })

  it('Row single select', async () => {
    document.body.innerHTML = '<div id="app"></div>'
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, lvStore } = await createListviewWrapper(
      {
        tableColumns,
        tableSelectionColumn: 'single',
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      { attachTo: document.getElementById('app')! }
    )
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowWrapper.at(1).find('.el-radio').trigger('click')
    await rowWrapper.at(2).find('.el-radio').trigger('click')

    // expect(storeWrapper.emitted('update:selection')!.length).toBe(2)
    expect(lvStore.state.selection.length).toBe(1)
    expect(wrapper.findAll('tr.lv-row--selected').length).toBe(1)
  })
})
