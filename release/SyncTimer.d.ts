export default class SyncTimer {
    #private;
    constructor(callback: Function, timeout?: number);
    cancel(): void;
}
