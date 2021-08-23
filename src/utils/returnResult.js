export function returnResult(res) {
  if (res.ok) {return res.json()}
  // return Promise.reject(new Error(`Статус не ОК (${res.status} ${res.statusText})`))
  return Promise.reject(res)
}