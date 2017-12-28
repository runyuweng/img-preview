export function isObject(t) {
  return Object.prototype.toString.call(t) === '[object Object]'
}

export function isArray(t) {
  return Object.prototype.toString.call(t) === '[object Array]'
}

export function isString(t) {
  return Object.prototype.toString.call(t) === '[object String]'
}
