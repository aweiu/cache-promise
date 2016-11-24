# cache-promise
用于缓存promise对象

## 安装
```
npm install cache-promise
```
## 使用
```
import CachePromise from 'cache-promise'
// 实例化
// 参数1: promise方法 参数2: 缓存时效（毫秒，传0则永久缓存）
var accessToken = new CachePromise(() => httpClient.get('http://xxx.com/token'), 30000)
// 调用实例对象的get方法。优先取缓存，过期重新获取
accessToken.get()
    .then(accessToken => console.log(accessToken))
```
