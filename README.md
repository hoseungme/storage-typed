## storage-typed

Web Storage only accepts string value so you should write this verbose code everytime:

```typescript
// get
try {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
} catch (e) {
  /* ... */
}

// set
window.localStorage.setItem(key, JSON.stringify(value));
```

And it does not provide any type-specific operation. (e.g. increasing number value, push to array)

```typescript
// increasing count
const count = JSON.parse(window.localStorage.getItem(key));
window.localStorage.setItem(key, JSON.stringify(count + 1));

// push to array
const arr = JSON.parse(window.localStorage.getItem(key));
window.localStorage.setItem(key, JSON.stringify([...arr, value]));
```

So `storage-typed` resolves all things above.

```typescript
const count = TypedStorageFactory.create("count", 0); // NumberTypedStorage
count.increase();
count.get(); // 1

const arr = TypedStorageFactory.create("array", ["foo"]); // ArrayTypedStorage
arr.pop(); // "foo"
arr.push("bar");
arr.get(); // ["bar"]

/* and any other types... */
```

## API References

- [TypedStorageFactory](#typedstoragefactory)
- [TypedStorage](#typedstorage)
  - [TypedStorageOptions](#typedstorageoptions)
- [NumberTypedStorage](#numbertypedstorage)
- [BooleanTypedStorage](#booleantypedstorage)
- [ArrayTypedStorage](#arraytypedstorage)

### TypedStorageFactory

Creates TypedStorage by type of passed initial value. [Note test code.](./src/factory.spec.ts)

```typescript
TypedStorageFactory.create<T>(key, initialValue, options);
```

- create: `(key, initialValue, options) => TypedStorage<T> | NumberTypedStorage | BooleanTypedStorage | ArrayTypedStorage<T[number]>`
  - returns instanceof `TypedStorage` by type of passed initial value
  - parameters
    - key: `string`
      - required
      - unique key for value
    - initialValue: `T`
      - required
      - any value which `TypedStorage` will be initialized with
    - options: `TypedStorageOptions<T>`
      - optional
      - [note TypedStorageOptions](#typedstorageoptions)

### TypedStorage

Provides JSON parsing/stringifying. [Note test code.](./src/any.spec.ts)

```typescript
const storage = new TypedStorage<T>(key, initialValue, options);
storage.get();
storage.set(value);
```

- constructor: `(key, initialValue, options) => TypedStorage<T>`

  - returns instanceof `TypedStorage` by type of passed initial value
  - parameters
    - key: `string`
      - required
      - unique key for value
    - initialValue: `T`
      - required
      - any value which `TypedStorage` will be initialized with
    - options: `TypedStorageOptions<T>`
      - optional
      - [note TypedStorageOptions](#typedstorageoptions)

- get: `() => T`

  - returns current value

- set: `(next) => void`
  - sets current value to passed value
  - parameters
    - next: `T`
      - required
      - next value

#### TypedStorageOptions

```typescript
interface TypedStorageOptions<T> {
  storage?: Storage;
}
```

- storage: `Storage`
  - `Storage` which `TypedStorage` will use

### NumberTypedStorage

Extends number-specific methods based on `TypedStorage` API. [Note test code.](./src/number.spec.ts)

```typescript
const storage = new NumberTypedStorage(key, initialValue, options);
storage.increase();
storage.decrease();
```

- constructor: `(key, initialValue, options) => TypedStorage<number>`

  - returns instanceof `TypedStorage` by type of passed initial value
  - parameters
    - key: `string`
      - required
      - unique key for value
    - initialValue: `number`
      - required
      - any value which `NumberTypedStorage` will be initialized with
    - options: `TypedStorageOptions<number>`
      - optional
      - [note TypedStorageOptions](#typedstorageoptions)

- increase: `() => void`

  - adds 1 to current value

- decrease: `() => void`
  - subtracts 1 from current value

### BooleanTypedStorage

Extends boolean-specific methods based on `TypedStorage` API. [Note test code.](./src/boolean.spec.ts)

```typescript
const storage = new BooleanTypedStorage(key, initialValue, options);
storage.toggle();
storage.true();
storage.false();
```

- constructor: `(key, initialValue, options) => TypedStorage<boolean>`

  - returns instanceof `TypedStorage` by type of passed initial value
  - parameters
    - key: `string`
      - required
      - unique key for value
    - initialValue: `boolean`
      - required
      - any value which `BooleanTypedStorage` will be initialized with
    - options: `TypedStorageOptions<boolean>`
      - optional
      - [note TypedStorageOptions](#typedstorageoptions)

- toggle: `() => void`

  - reverses current value

- true: `() => void`

  - sets current value to true

- false: `() => void`
  - sets current value to false

### ArrayTypedStorage

Extends number-specific methods based on `TypedStorage` API. [Note test code.](./src/array.spec.ts)

```typescript
const storage = new ArrayTypedStorage<T>(key, initialValue, options);
storage.push(value);
storage.pop();
```

- constructor: `(key, initialValue, options) => TypedStorage<T[]>`

  - returns instanceof `TypedStorage` by type of passed initial value
  - parameters
    - key: `string`
      - required
      - unique key for value
    - initialValue: `T[]`
      - required
      - any value which `NumberTypedStorage` will be initialized with
    - options: `TypedStorageOptions<T[]>`
      - optional
      - [note TypedStorageOptions](#typedstorageoptions)

- push: `(value: T) => void`

  - appends value to the end of current array

- pop: `() => T | null`
  - removes last value of current array. if it is empty, `pop` returns null.
