import type { ListviewProps, LvStore } from '~/types'

import { reactive, ref, unref, watch } from 'vue'
import { createInjectionState } from '@vueuse/shared'
import axios, { AxiosRequestConfig } from 'axios'
import { pickBy } from 'lodash-es'
import { isFunction, isPlainObject, isString } from 'is-what'
import mitt from 'mitt'
import {
  warn,
  dataMapping,
  isValidFieldValue,
  ensurePromise,
  toDisplayString,
} from '@/utils'

const [useProvideLvStore, _useLvStore] = createInjectionState(
  (props: ListviewProps) => {
    let abortController!: AbortController
    const emitter = mitt()

    // state
    const contentHeight = ref(undefined as unknown as number)
    const contentLoading = ref(false)
    const selection = ref<any[]>([])
    const currentPage = ref(1)
    const currentPageSize = ref(props.pageSize)
    const contentData = ref<Record<string, any>>({ items: [], total: 0 })
    const contentMessage = ref({ type: '', text: '' })
    const filterModel = reactive(props.filterModel)

    watch(selection, () => emitter.emit('update:selection', unref(selection)))
    watch(currentPage, () => search(true))
    watch(currentPageSize, () => search())
    watch(
      () => props.contentMessage,
      (newVal) => {
        if (isString(newVal)) {
          setContentMessage(newVal)
        } else if (isPlainObject(newVal)) {
          const { type, text } = newVal
          setContentMessage(text, type)
        }
      },
      { immediate: true }
    )

    function rootEmitProxy(event: string, payload?: any) {
      return emitter.emit('root-emit', { event, payload })
    }

    // actions
    function doRequest() {
      if (!props.requestUrl && !props.requestHandler) {
        warn('请先配置 requestUrl 或 requestHandler 以发起数据请求')
        return Promise.resolve()
      }

      rootEmitProxy('before-request')

      contentLoading.value = true
      const requestData = getRequestData()
      // transformRequestData 有可能返回 false 以阻止提交动作，可用于提交前验证等
      if (requestData === false) {
        rootEmitProxy('request-valid-error')
        /* istanbul ignore next */
        contentLoading.value = false
        return Promise.resolve()
      }

      return (
        handleRequest(requestData)
          // 自定义 requestHandler 与内置请求响应都通过验证流程
          .then(validateResponseData)
          .then((data: any) => {
            if (isFunction(props.transformResponseData)) {
              data = props.transformResponseData(data)
            }
            contentData.value = getContentData(data)
            contentLoading.value = false
            rootEmitProxy('request-success')
          })
          .catch(handleResponseError)
          .finally(() => rootEmitProxy('requested'))
      )
    }

    function getContentData(data = {}) {
      return props.contentDataMap
        ? dataMapping(data, props.contentDataMap)
        : data
    }

    function cleanContentData() {
      contentData.value = getContentData()
    }

    function handleRequest(data: any) {
      let responseDataPromise: Promise<any>

      if (isFunction(props.requestHandler)) {
        // 自定义请求方法
        responseDataPromise = ensurePromise(props.requestHandler(data))
      } else {
        // 多次点击“搜索”会取消前面的请求，以最后一次的请求为准
        abortController?.abort()

        const requestConfig = getRequestConfig(data)
        const axiosService = axios.create()(requestConfig)
        responseDataPromise = axiosService.then((res) => res.data)
      }
      return responseDataPromise
    }

    function validateResponseData(data: any): Promise<any> {
      const validateFn = props.validateResponse
      if (!isFunction(validateFn) || validateFn(data)) {
        setContentMessage('')
        return Promise.resolve(data)
      } else {
        return Promise.reject(data)
      }
    }

    function handleResponseError(error: any) {
      if (!axios.isCancel(error)) {
        const resolveErrorMessageFn = props.resolveResponseErrorMessage
        let errorMessage = error
        try {
          errorMessage = isFunction(resolveErrorMessageFn)
            ? resolveErrorMessageFn(error)
            : error
        } catch (e) {}
        errorMessage = toDisplayString(errorMessage)
        setContentMessage(errorMessage, 'error')
        cleanContentData()
        contentLoading.value = false
        rootEmitProxy('request-error', error)
      }
      return error
    }

    function getRequestConfig(
      data: AxiosRequestConfig['data'] | AxiosRequestConfig['params']
    ): AxiosRequestConfig {
      const requestConfig: AxiosRequestConfig = {
        url: props.requestUrl,
        method: props.requestMethod,
        withCredentials: true,
        ...props.requestConfig,
      }

      if (/post/i.test(requestConfig.method || '')) {
        requestConfig.data = data
      } else {
        requestConfig.params = data
      }

      abortController = new AbortController()
      requestConfig.signal = abortController.signal

      return requestConfig
    }

    function getRequestData() {
      let data: Record<string, any> | boolean = props.filterModel || {} // { ...(props.filterModel || {}) }

      // 删除提交数据中的无效数据
      data = pickBy(data, (val) => isValidFieldValue(val))

      let indexKey = 'page_index'
      let sizeKey = 'page_size'
      const usePage = props.usePage
      if (usePage) {
        if (isPlainObject(usePage)) {
          indexKey = usePage['pageIndex'] || indexKey
          sizeKey = usePage['pageSize'] || sizeKey
        }
        data[indexKey] = unref(currentPage)
        data[sizeKey] = unref(currentPageSize)
      }

      if (isFunction(props.transformRequestData)) {
        // transformRequestDataFn 支持返回 promise
        data = props.transformRequestData(data)
      }

      return data
    }

    function setContentMessage(text = '', type = '', cleanData = false) {
      contentMessage.value = { text, type }
      cleanData && cleanContentData()
    }

    function search(keepInPage = false) {
      if (!keepInPage) {
        currentPage.value = 1
      }
      return doRequest()
    }

    props.autoload && search()

    const lvStore: LvStore = {
      contentHeight,
      contentLoading,
      contentMessage,
      selection,
      contentData,
      emitter,
      search,
      setContentMessage,
      rootEmitProxy,

      currentPage,
      currentPageSize,
      pressEnterSearch: props.pressEnterSearch,
      filterModel,
      usePage: props.usePage,
      pagePosition: props.pagePosition,
      pageSizes: props.pageSizes,
      pageAttrs: props.pageAttrs,
    }

    return lvStore
  }
)

function useLvStore() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return _useLvStore()!
}

export { useProvideLvStore, useLvStore }
