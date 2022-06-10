import { wrapLocalStorage } from "./base";

export interface TypedStorageOptions<T> {
  storage?: Storage;
}

export class TypedStorage<T> {
  private readonly key: string;
  private readonly storage: Storage;

  constructor(key: string, initialValue: T, options: TypedStorageOptions<T> = {}) {
    this.key = key;
    this.storage = options.storage ?? wrapLocalStorage();

    // TypedStorage.get returns value after JSON.parse
    // but Storage.getItem returns string or null
    // so we should use Storage.getItem to recognize intended null value
    if (this.storage.getItem(this.key) === null) {
      this.set(initialValue);
    }
  }

  private serialize(value: T): string {
    return JSON.stringify(value);
  }

  private deserialize(value: string): T | null {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public get(): T | null {
    const item = this.storage.getItem(this.key);
    return item ? this.deserialize(item) : null;
  }

  public set(next: T): void {
    this.storage.setItem(this.key, this.serialize(next));
  }

  public clear(): void {
    this.storage.removeItem(this.key);
  }
}
