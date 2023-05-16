import SyncTimer from '.'

describe('setTimeoutSync', () => {
  it('should be called', async () => {
    const fn = jest.fn()

    new SyncTimer(fn)

    expect(fn).not.toBeCalled()

    await new Promise(resolve => setTimeout(resolve))

    expect(fn).toBeCalled()
  })
  it('cancel', async () => {
    const fn = jest.fn()

    const timer = new SyncTimer(fn)

    expect(fn).not.toBeCalled()

    timer.cancel()

    await new Promise(resolve => setTimeout(resolve))

    expect(fn).not.toBeCalled()
  })
  it('async', async () => {
    const fn = jest.fn()

    setTimeout(() => {
      fn(1)
    })

    setTimeout(() => {
      queueMicrotask(() => fn(2))
    })

    setTimeout(() => {
      fn(3)
    })

    expect(fn).not.toBeCalled()

    await new Promise(resolve => {
      setTimeout(resolve)
    })

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, 1)
    expect(fn).nthCalledWith(2, 2)
    expect(fn).nthCalledWith(3, 3)
  })
  it('sync', async () => {
    const fn = jest.fn()

    new SyncTimer(() => {
      fn(1)
    })

    new SyncTimer(() => {
      queueMicrotask(() => fn(2))
    })

    new SyncTimer(() => {
      fn(3)
    })

    expect(fn).not.toBeCalled()

    await new Promise(resolve => {
      setTimeout(resolve)
    })

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, 1)
    expect(fn).nthCalledWith(2, 3)
    expect(fn).nthCalledWith(3, 2)
  })
})
