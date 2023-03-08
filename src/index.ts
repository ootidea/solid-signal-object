import { Accessor, createSignal, Setter, Signal } from 'solid-js'
import { SignalOptions } from 'solid-js/types/reactive/signal'

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

export function createSignalObject<T>(value: T, options?: SignalOptions<T>): SignalObject<T> {
  return new SignalObject<T>(createSignal(value, options))
}
