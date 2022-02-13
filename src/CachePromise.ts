export default class CachePromise<T = any> {
  private cache?: Promise<T>
  private lastTime?: number
  private expires = 0
  private promiseFun: () => Promise<T>

  constructor(promiseFun: CachePromise['promiseFun'], expires: number = 0) {
    this.promiseFun = promiseFun
    this.expires = expires
  }

  async forceUpdate() {
    this.lastTime = new Date().getTime()
    this.cache = this.promiseFun()
    try {
      return await this.cache
    } catch (e) {
      this.cache = undefined
      throw e
    }
  }

  async get() {
    const { cache, expires, lastTime } = this

    if (
      cache &&
      (expires === 0 || new Date().getTime() - (lastTime as number) < expires)
    ) {
      // 这里其实还可以粗暴地判断 this.cache 是否为空来实现如果上次任务失败了则重试，没失败则复用它的结果
      return cache
    }

    return this.forceUpdate()
  }

  clearCache() {
    this.cache = undefined
  }
}
