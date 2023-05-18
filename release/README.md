# sync-timer

&nbsp;

[![NPM](https://img.shields.io/npm/v/sync-timer.svg)](https://www.npmjs.com/package/sync-timer)
[![downloads](https://img.shields.io/npm/dm/sync-timer.svg)](https://www.npmtrends.com/sync-timer)
[![changelog](https://img.shields.io/badge/Changelog-⋮-brightgreen)](https://changelogs.xyz/sync-timer)
[![license](https://img.shields.io/npm/l/sync-timer)](https://github.com/d8corp/sync-timer/blob/main/LICENSE)

## Abstract

This library gives new way to create macrotasks.
`setTimeout` does not ensure callback calls in the same macrotask,
this is the difference.
This library make you sure callback with the same delay will be run in the same queue.

[![stars](https://img.shields.io/github/stars/d8corp/sync-timer?style=social)](https://github.com/d8corp/sync-timer/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/sync-timer?style=social)](https://github.com/d8corp/sync-timer/watchers)

## Install

```shell
npm i sync-timer
```

## Usage

`SyncTimer` has the same arguments as `setTimeout`,
but this is a class.

```typescript
import SyncTimer from 'sync-timer'

const timer = new SyncTimer(() => {
  console.log('Hello World!')
}, 1000)

timer.cancel()
```

If you try the next example, you get this logs:

`1`, `2`, `3`

```typescript
setTimeout(() => {
  console.log(1)
})

setTimeout(() => {
  queueMicrotask(() => {
    console.log(2)
  })
})

setTimeout(() => {
  console.log(3)
})
```

That's because of each `setTimeout` creates separate macrotask with own microtasks queue.

`SyncTimer` calls every timer (used in the same macrotask with the same timeout) in one macrotask.

```typescript
new SyncTimer(() => {
  console.log(1)
})

new SyncTimer(() => {
  queueMicrotask(() => {
    console.log(2)
  })
})

new SyncTimer(() => {
  console.log(3)
})
```

returns `1`, `3`, `2`

## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/sync-timer/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/sync-timer)](https://github.com/d8corp/sync-timer/issues)
