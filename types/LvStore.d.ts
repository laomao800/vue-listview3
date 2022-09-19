import { Ref, UnwrapNestedRefs } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Emitter } from 'mitt'
import { ListviewProps } from './Props'

export interface LvStore {
  emitter: Emitter

  state: {
    pressEnterSearch: ListviewProps['pressEnterSearch']
    filterModel: UnwrapNestedRefs<ListviewProps['filterModel']>
    usePage: ListviewProps['usePage']
    pagePosition: ListviewProps['pagePosition']
    pageSizes: ListviewProps['pageSizes']
    pageAttrs: ListviewProps['pageAttrs']
    currentPage: number
    currentPageSize: ListviewProps['currentPageSize']
    contentHeight: number
    contentLoading: boolean
    /** @default { type: string; text: string } */
    contentMessage: Record<string, any>
    selection: any[]
    contentData: Record<string, any>
  }

  rootEmitProxy: (event: string, payload?: any) => void
  search: (keepInPage?: boolean) => Promise<any>
  setContentMessage: (
    text: string,
    type?: 'warning' | 'info' | 'error',
    cleanData?: boolean
  ) => void
  resetFilterModel: () => void
}
