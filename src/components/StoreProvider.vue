<template>
  <ElConfigProvider :locale="zhCn">
    <slot />
  </ElConfigProvider>
</template>

<script lang="tsx" setup>
import { getCurrentInstance, onMounted, ref, unref, watch } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import axios, { AxiosRequestConfig } from 'axios'
import { cloneDeep, merge, pickBy } from 'lodash-es'
import { isFunction, isPlainObject, isString } from 'is-what'
import {
  warn,
  dataMapping,
  isValidFieldValue,
  ensurePromise,
  toDisplayString,
} from '@/utils'

defineOptions({
  // abstract: true,

  provide() {
    return {
      lvStore: this,
    }
  },

  inheritAttrs: false,
})

const props = defineProps({
  // Data request
  pressEnterSearch: { type: Boolean, default: true },
  autoload: { type: Boolean, default: true },
  requestUrl: { type: String, default: '' },
  requestMethod: { type: String, default: 'post' },
  requestConfig: { type: Object, default: () => ({}) },
  filterModel: { type: Object, default: () => ({}) },

  // Adv request
  requestHandler: { type: Function, default: null },
  transformRequestData: { type: Function, default: null },

  // Adv response
  transformResponseData: { type: Function, default: null },
  contentDataMap: {
    type: Object,
    default: () => ({
      items: 'result.items',
      total: 'result.total',
    }),
  },

  // Request error handler
  contentMessage: { type: [Object, String], default: null },
  validateResponse: { type: Function, default: null },
  resolveResponseErrorMessage: { type: Function, default: null },

  // Pager
  usePage: { type: [Object, Boolean], default: true },
  pageSize: { type: Number, default: 20 },
  pageSizes: { type: Array, default: () => [20, 50, 100] },
  pageProps: { type: Object, default: () => ({}) },
  pagePosition: { type: String, default: 'left' },
})
const emit = defineEmits(['update:selection', 'root-emit'])

const contentHeight = ref(null)
const contentLoading = ref(false)
const selection = ref([])
const currentPage = ref(1)
const currentPageSize = ref(props.pageSize)
const contentData = ref<Record<string, any>>({ items: [], total: 0 })
const internalContentMessage = ref<{
  type: string | null
  text: string | null
}>({ type: null, text: null })

watch(selection, () => emit('update:selection', unref(selection)))
watch([currentPage, currentPageSize], () => search())
watch(
  () => props.contentMessage,
  () => {
    if (isString(props.contentMessage)) {
      setContentMessage(props.contentMessage)
    } else if (isPlainObject(props.contentMessage)) {
      const { type, text } = props.contentMessage
      setContentMessage(text, type)
    }
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  props.autoload && search()
})

function doRequest() {
  if (!props.requestUrl && !props.requestHandler) {
    return warn('未配置 requestUrl 或 requestHandler ，无法发起数据请求。')
  }

  $rootEmitProxy('before-request')

  contentLoading.value = true
  const requestData = getRequestData()
  // transformRequestData 有可能返回 false 以阻止提交动作，可用于提交前验证等
  if (requestData === false) {
    $rootEmitProxy('request-valid-error')
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
        $rootEmitProxy('request-success')
      })
      .catch(handleResponseError)
      .finally(() => $rootEmitProxy('requested'))
  )
}

function getContentData(data = {}) {
  return props.contentDataMap ? dataMapping(data, props.contentDataMap) : data
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
    /* istanbul ignore next */
    // @ts-ignore
    // this._requestCancelToken && this._requestCancelToken()

    const requestConfig = getRequestConfig(data)
    const axiosService = axios.create()(requestConfig)
    responseDataPromise = axiosService.then((res) => res.data)
  }
  return responseDataPromise
}

function validateResponseData(data: any): Promise<any> {
  const validateFn = props.validateResponse
  if (!isFunction(validateFn) || validateFn(data)) {
    setContentMessage(null)
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
    $rootEmitProxy('request-error', error)
  }
  return error
}

function getRequestConfig(
  data: AxiosRequestConfig['data'] | AxiosRequestConfig['params']
): AxiosRequestConfig {
  const requestConfig = merge(
    {
      url: props.requestUrl,
      method: props.requestMethod,
      withCredentials: true,
    },
    props.requestConfig
  ) as AxiosRequestConfig

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (/post/i.test(requestConfig.method!)) {
    requestConfig.data = data
  } else {
    requestConfig.params = data
  }

  // requestConfig.cancelToken = new axios.CancelToken((cancel) => {
  //   // @ts-ignore
  //   this._requestCancelToken = cancel
  // })

  return requestConfig
}

function getRequestData(): Record<string, any> | boolean {
  let data = cloneDeep(props.filterModel)

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
  } else {
    delete data[indexKey]
    delete data[sizeKey]
  }

  if (isFunction(props.transformRequestData)) {
    // transformRequestDataFn 支持返回 promise
    data = props.transformRequestData(data)
  }

  return data
}

function setContentMessage(
  text: string | null = null,
  type: string | null = null,
  cleanData = false
) {
  internalContentMessage.value = { text, type }
  cleanData && cleanContentData()
}

function $rootEmitProxy(rootEventName: string, ...args: any[]) {
  const vm = getCurrentInstance()?.proxy
  emit('root-emit', rootEventName, vm, ...args)
}

function search(keepInPage = false) {
  if (!keepInPage) {
    currentPage.value = 1
  }
  return doRequest()
}

defineExpose({
  $rootEmitProxy,
  search,
})
</script>
