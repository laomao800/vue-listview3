import {
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isFunction,
  isNull,
  isPlainObject,
  isPromise,
  isUndefined,
} from 'is-what'
import type { Ref } from 'vue'
import { inject, unref } from 'vue'

import type {
  FilterField,
  FilterFieldConfig,
  LvStore,
  SelectOption,
} from '~/types'

import { get } from '@/utils'
export { default as parseSize } from '@laomao800/parse-size'

/**
 * 根据映射表设置的结构提取数据并返回一个新对象
 *
 * dataMapping({
 *   result: {
 *     results: [1, 2, 3]
 *   }
 * }, {
 *   items: 'result.results'
 * })
 *
 * -> { items: [1, 2, 3] }
 *
 * @param {Object} data 目标数据
 * @param {Object} dataMap 映射表
 */
export function dataMapping(
  data: Record<string, any> = {},
  dataMap: Record<string, any> = {}
) {
  const result: Record<string, any> = {}

  if (isPlainObject(dataMap)) {
    Object.keys(dataMap).forEach((key) => {
      try {
        const dataKey = key.toString()
        const dataValue = get(data, dataMap[key])
        result[dataKey] = dataValue
      } catch (e) {}
    })
  }

  return result
}

/**
 * 判断值是否为搜索栏内合法的值，通过验证的值才可继续作为参数随请求提交
 */
export function isValidFieldValue(val: any): val is FilterField {
  if (isEmptyArray(val) || isEmptyObject(val)) {
    return false
  }
  return !isNull(val) && !isUndefined(val) && !isEmptyString(val)
}

export function nodeParents(node: Element, selector: string) {
  const allMatchs = Array.from(document.querySelectorAll(selector))
  if (allMatchs.length === 0) {
    return null
  }
  function find(curNode: Element): Element | null {
    const parentNode = curNode.parentNode as Element | null
    if (parentNode) {
      if (allMatchs.includes(parentNode)) {
        return parentNode
      } else if (parentNode.parentNode) {
        return find(parentNode)
      }
    }
    return null
  }
  return find(node)
}

export function hasOwn(obj: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function ensurePromise<T>(data: T) {
  return isPromise(data) ? data : Promise.resolve(data)
}

type FilterFieldOptions = FilterFieldConfig['options']
export function resolveOptions(
  optionsConfig: FilterFieldOptions | Ref<FilterFieldOptions>
): Promise<SelectOption[]> {
  optionsConfig = unref(optionsConfig)

  if (Array.isArray(optionsConfig)) {
    return Promise.resolve(optionsConfig)
  }

  if (isPromise(optionsConfig)) {
    return optionsConfig.then((options) =>
      Array.isArray(options) ? options : []
    )
  }

  if (isFunction(optionsConfig)) {
    return ensurePromise(optionsConfig()).then((options) =>
      Array.isArray(options) ? options : []
    )
  }

  return Promise.resolve([])
}

const objectToString = Object.prototype.toString
export const toDisplayString = (val: unknown): string => {
  return val == null
    ? ''
    : Array.isArray(val) ||
      (isPlainObject(val) &&
        ((val as any).toString === objectToString ||
          !isFunction((val as any).toString)))
    ? JSON.stringify(val, null, 2)
    : String(val)
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useLvStore = () => inject<LvStore>('lvStore')!

export const isObjType = <T>(payload: any): payload is T =>
  isPlainObject(payload)
