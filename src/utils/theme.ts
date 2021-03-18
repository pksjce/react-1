import isEmpty from 'lodash.isempty'
import isObject from 'lodash.isobject'
import chroma from 'chroma-js'

export function fontStack(fonts: string[]): string {
  return fonts.map(font => (font.includes(' ') ? `"${font}"` : font)).join(', ')
}

// The following functions are a temporary measure for splitting shadow values out from the colors object.
// Eventually, we will push these structural changes upstream to primer/primitives so this data manipulation
// will not be needed.

export function isShadowValue<T extends string>(value: T): boolean {
  return typeof value === 'string' && /(inset\s|)([0-9.empx\s]+){1,4}rgb[a]?\(.*\)/.test(value)
}

export function isColorValue<T extends string>(value: T): boolean {
  return chroma.valid(value)
}

type FilterableObject<T extends unknown> = string | string[] | Record<string, T>
export function filterObject<T>(
  obj: FilterableObject<T>,
  predicate: <T extends string>(value: T) => boolean
): Record<string, T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Filter arrays
    if (value instanceof Array) {
      value = value.filter(predicate)
      // Filter (nested) objects
    } else if (isObject(value)) {
      value = filterObject((value as unknown) as Record<string, T>, predicate)
      // Filter primitive values
    } else if (!predicate(value)) {
      value = undefined
    }
    // Retain any values that were not filtered out
    return {...acc, ...(!isEmpty(value) && {[key]: value})}
  }, {} as Record<string, T>)
}
