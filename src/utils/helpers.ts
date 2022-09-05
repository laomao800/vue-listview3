import type { Ref } from 'vue'
import type { FilterField, LvStore } from '~/types'
import { inject, unref } from 'vue'
import {
  isPlainObject,
  isFunction,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNull,
  isUndefined,
  isPromise,
} from 'is-what'
import { get } from '@/utils'
import { default as _parseSize } from '@laomao800/parse-size-with-unit'

export function parseSize(...args: Parameters<typeof _parseSize>) {
  return _parseSize(...args) || void 0
}

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

type FilterFieldOptions = FilterField['options']
export function resolveOptions(
  optionsConfig: FilterFieldOptions | Ref<FilterFieldOptions>,
  done: (options: any[]) => void
) {
  optionsConfig = unref(optionsConfig)
  let optionsPromise = null
  if (optionsConfig) {
    if (Array.isArray(optionsConfig)) {
      optionsPromise = Promise.resolve(optionsConfig)
    } else if (isFunction(optionsConfig)) {
      optionsPromise = ensurePromise(optionsConfig(done))
    } else if (isPromise(optionsConfig)) {
      optionsPromise = optionsConfig
    }
  }
  return ensurePromise(optionsPromise).then(done)
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

export const useLvStore = () => inject<LvStore>('lvStore')!
