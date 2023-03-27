# solid-signal-object

This package provides `createSignalObject` function and `SignalObject<T>` type, which can avoid a [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) issue of SolidJS's built-in Signal.  
It also offers `createMemoObject` and `AccessorObject<T>` in a similar manner.  

## Example

```typescript
import { createSignalObject } from "solid-signal-object"

const text = createSignalObject<string | undefined>(undefined)

// call getter function
console.log(text.value) // undefined

// call setter function
text.value = 'something'
console.log(text.value) // something

if (text.value !== undefined) {
  // The type of text.value is narrowed to string.
  // So, there are no errors with strict type checking.
  console.log(text.value.length)
}
```

## Definition of `SignalObject<T>`

```typescript
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
```
