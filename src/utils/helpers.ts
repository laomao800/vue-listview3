import type { FilterField } from '~/types'
import { isPlainObject, isEmpty, isFunction, isNil } from 'lodash-es'
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
  if (Array.isArray(val) || isPlainObject(val)) {
    return !isEmpty(val)
  }
  return !isNil(val) && val !== ''
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

export function isPromise(obj: any): obj is Promise<any> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

export function hasOwn(obj: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function hasRenderFn<T>(item: any): item is T {
  return isPlainObject(item) && isFunction(item.render)
}

export function ensurePromise<T>(data: T) {
  return isPromise(data) ? data : Promise.resolve(data)
}

/* istanbul ignore next */
export function noop() {
  // noop
}

export function resolveOptions(
  optionsConfig: any,
  done: (options: any[]) => void
) {
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
  return optionsPromise
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
