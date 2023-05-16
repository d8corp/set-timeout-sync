type Timers = (SyncTimer | null)[]

const scope: Record<number, Timers> = {}

export default class SyncTimer {
  readonly #timers: Timers
  readonly #callback: Function
  readonly #index

  constructor (callback: Function, timeout?: number) {
    this.#callback = callback

    const timers = scope[timeout]

    if (timers) {
      this.#timers = timers
      this.#index = timers.length
      scope[timeout].push(this)
    } else {
      this.#index = 0
      const timers = scope[timeout] = this.#timers = [this]

      setTimeout(() => {
        timers.forEach(timer => {
          if (timer) {
            timer.#callback()
          }
        })
      }, timeout)

      setTimeout(() => {
        scope[timeout] = undefined
      })
    }
  }

  cancel () {
    this.#timers[this.#index] = null
  }
}
