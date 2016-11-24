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
    return new Promise(resolve => {
      var cache = this.cache
      if (cache.promise && (this.timeOut === 0 || new Date() - cache.createTime < this.timeOut)) return resolve(cache.promise)
      var promise = this.getAfterCache().then(rs => {
        if (this.timeOut !== 0) this.cache.createTime = new Date()
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
