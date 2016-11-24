'use strict';

/**
 * Created by awei on 2016/8/2.
 */
function Cache(getAfterCache, timeOut) {
  this.cache = {
    promise: '',
    createTime: ''
  };
  this.getAfterCache = getAfterCache;
  this.timeOut = timeOut;
}
Cache.prototype = {
  get: function get() {
    var _this = this;

    return new Promise(function (resolve) {
      var cache = _this.cache;
      if (cache.promise && (_this.timeOut === 0 || new Date() - cache.createTime < _this.timeOut)) return resolve(cache.promise);
      var promise = _this.getAfterCache().then(function (rs) {
        if (_this.timeOut !== 0) _this.cache.createTime = new Date();
        return rs;
      });
      _this.set(promise);
      resolve(promise);
    });
  },
  set: function set(cachePromise) {
    this.cache.promise = cachePromise;
    this.cache.createTime = new Date();
  }
};
module.exports = Cache;