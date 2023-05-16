import { __classPrivateFieldSet, __classPrivateFieldGet } from 'tslib';

var _SyncTimer_timers, _SyncTimer_callback, _SyncTimer_index;
const scope = {};
class SyncTimer {
    constructor(callback, timeout) {
        _SyncTimer_timers.set(this, void 0);
        _SyncTimer_callback.set(this, void 0);
        _SyncTimer_index.set(this, void 0);
        __classPrivateFieldSet(this, _SyncTimer_callback, callback, "f");
        const timers = scope[timeout];
        if (timers) {
            __classPrivateFieldSet(this, _SyncTimer_timers, timers, "f");
            __classPrivateFieldSet(this, _SyncTimer_index, timers.length, "f");
            scope[timeout].push(this);
        }
        else {
            __classPrivateFieldSet(this, _SyncTimer_index, 0, "f");
            const timers = scope[timeout] = __classPrivateFieldSet(this, _SyncTimer_timers, [this], "f");
            setTimeout(() => {
                timers.forEach(timer => {
                    if (timer) {
                        __classPrivateFieldGet(timer, _SyncTimer_callback, "f").call(timer);
                    }
                });
            }, timeout);
            setTimeout(() => {
                scope[timeout] = undefined;
            });
        }
    }
    cancel() {
        __classPrivateFieldGet(this, _SyncTimer_timers, "f")[__classPrivateFieldGet(this, _SyncTimer_index, "f")] = null;
    }
}
_SyncTimer_timers = new WeakMap(), _SyncTimer_callback = new WeakMap(), _SyncTimer_index = new WeakMap();

export { SyncTimer as default };
