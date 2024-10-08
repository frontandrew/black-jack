// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringIndexed = Record<string, any>

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const value = data[key]
    const endLine = index < keys.length - 1 ? '&' : ''

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (resultArr, arrData, itemIndex) => ({
          ...resultArr,
          [`${key}[${itemIndex}]`]: arrData,
        }),
        {}
      )

      return `${result}${queryStringify(arrayValue)}${endLine}`
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (resultObj, objKey) => ({
          ...resultObj,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {}
      )

      return `${result}${queryStringify(objValue)}${endLine}`
    }

    return `${result}${key}=${value}${endLine}`
  }, '')
}
