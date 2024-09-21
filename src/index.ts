import {
  type Accessor,
  type EffectFunction,
  type MemoOptions,
  type Setter,
  type Signal,
  type SignalOptions,
  createMemo,
  createSignal,
} from 'solid-js'

export class SignalObject<T> {
  readonly get: Accessor<T>
  readonly set: Setter<T>

  constructor([get, set]: Signal<T>) {
    this.get = get
    this.set = set
  }

  get value() {
    return this.get()
  }

  set value(newValue: T) {
    this.set(() => newValue)
  }

  update<U extends T>(f: (prev: T) => U) {
    return this.set(f)
  }

  toSignal(): Signal<T> {
    return [this.get, this.set]
  }
}

export function createSignalObject<T>(): SignalObject<T | undefined>
export function createSignalObject<T>(value: T, options?: SignalOptions<T>): SignalObject<T>
export function createSignalObject<T>(value?: T, options?: SignalOptions<T | undefined>) {
  return new SignalObject(createSignal(value, options))
}

export class AccessorObject<T> {
  readonly get: Accessor<T>

  constructor(get: Accessor<T>) {
    this.get = get
  }

  get value() {
    return this.get()
  }
}

export function createMemoObject<Next extends Prev, Prev = Next>(
  fn: EffectFunction<undefined | NoInfer<Prev>, Next>,
): AccessorObject<Next>
export function createMemoObject<Next extends Prev, Init = Next, Prev = Next>(
  fn: EffectFunction<Init | Prev, Next>,
  value: Init,
  options?: MemoOptions<Next>,
): AccessorObject<Next>
export function createMemoObject(fn: any, value?: any, option?: any) {
  return new AccessorObject(createMemo(fn, value, option))
}
