# cache-promise
用于缓存异步任务

## 安装
```
npm install cache-promise
```
## 使用
```
// const { default: CachePromise } = require('CachePromise')
import CachePromise from 'cache-promise'

// 参数1: promise方法。如果调用该方法发生错误则不会缓存
// 参数2: 缓存时效，默认：0（毫秒，传 0 则永久缓存）
var accessToken = new CachePromise(() => httpClient.get('http://xxx.com/token'), 30000)
// 调用实例对象的 get 方法。优先取缓存，过期重新获取
accessToken.get()
    .then(accessToken => console.log(accessToken))
```
## 其他
值得一提的是插件会最大可能复用上次的异步任务
```
import CachePromise from 'cache-promise'

function test() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const cache = new CachePromise(test)
// test 方法只会被执行一次
cache.get()
cache.get() // 此时会等待上次 get 结束，并复用其结果
```
在上述场景中，理论上本插件还可以实现当第一次的 `cache.get` 出错的时候，第二次的 `cache.get` 就不再复用它的结果，重新调用 test 去获取最新结果。

不过感觉是个伪需求，暂时只记录一下。