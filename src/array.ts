import { TypedStorage } from "./any";

export class ArrayTypedStorage<T extends any> extends TypedStorage<T[]> {
  public push(value: T) {
    const current = this.get() ?? [];
    current.push(value);
    this.set(current);
  }

  public pop(): T | null {
    const current = this.get();
    if (current && current.length > 0) {
      const value = current.pop()!;
      this.set(current);
      return value;
    }
    return null;
  }
}
