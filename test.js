const { default: CachePromise } = require('./dist/CachePromise')
function test() {
  console.log('test')
  return new Promise((resolve, reject) => setTimeout(() => resolve('23'), 1000))
}
const cache = new CachePromise(test)
cache.get().then((rs) => console.log(rs))
cache.get().then((rs) => console.log(rs))
setTimeout(() => cache.get(), 2000)