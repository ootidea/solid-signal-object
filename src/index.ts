import { Accessor, createSignal, Setter, Signal, SignalOptions } from 'solid-js'

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
