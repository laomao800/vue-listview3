import { Ref } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ContentMessageObject {
  text: string
  type: 'warning' | 'info' | 'error'
}

export declare class LvStore {
  // Props
  // /** @default true */
  // pressEnterSearch: boolean
  // /** @default true */
  // autoload: boolean
  // requestUrl: AxiosRequestConfig['url']
  // requestMethod: AxiosRequestConfig['method']
  filterModel: AxiosRequestConfig['data'] | AxiosRequestConfig['params']
  // requestConfig: AxiosRequestConfig
  // /** @default null */
  // requestHandler: null | ((reqData: Record<string, any>) => any)
  // /** @default null */
  // transformRequestData: null | ((reqData: Record<string, any>) => any)
  // /** @default null */
  // transformResponseData: null | ((reqData: Record<string, any>) => any)
  // contentDataMap: Record<string, string>
  // contentMessage: string | { text: string; type: 'warning' | 'info' | 'error' }
  // /** @default null */
  // validateResponse: null | ((res: AxiosResponse) => boolean)
  // /** @default null */
  // resolveResponseErrorMessage: null | ((err: any) => any)
  // /** @default true */
  // usePage: boolean | { pageIndex: string; pageSize: string }
  // pageSize: number
  // pageSizes: number[]
  // pageProps: Record<string, any>
  // pagePosition: 'left' | 'right'

  // Data
  contentHeight: Ref<number>
  contentLoading: Ref<boolean>
  selection: Ref<any[]>
  currentPage: Ref<number>
  currentPageSize: Ref<number>
  contentData: Ref<Record<string, any>>
  internalContentMessage: Ref<ContentMessageObject>

  // Methods
  rootEmitProxy: (eventName: string, ...args: any[]) => void
  search: (keepInPage?: boolean) => Promise<any>
  setContentMessage: (
    text: string,
    type?: ContentMessageObject['type'],
    cleanData?: boolean
  ) => void
}
