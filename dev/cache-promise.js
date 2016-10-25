/**
 * Created by awei on 2016/8/2.
 */
function Cache (getAfterCache, timeOut) {
  this.cache = {
    promise: '',
    createTime: ''
  }
  this.getAfterCache = getAfterCache
  this.timeOut = timeOut
}
Cache.prototype = {
  get () {
    return new Promise((resolve) => {
      var cache = this.cache
      if (cache.promise && new Date() - cache.createTime < this.timeOut) return resolve(cache.promise)
      var promise = this.getAfterCache().then((rs) => {
        this.cache.createTime = new Date()
        return rs
      })
      this.set(promise)
      resolve(promise)
    })
  },
  set (cachePromise) {
    this.cache.promise = cachePromise
    this.cache.createTime = new Date()
  }
}
export default Cache
