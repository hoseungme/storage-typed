import { TypedStorage, TypedStorageOptions } from "./any";
import { NumberTypedStorage } from "./number";
import { ArrayTypedStorage } from "./array";

export class TypedStorageFactory {
  public static create<T extends number>(
    key: string,
    initialValue: T,
    options?: TypedStorageOptions<T>
  ): NumberTypedStorage;
  public static create<T extends any[]>(
    key: string,
    initialValue: T,
    options?: TypedStorageOptions<T>
  ): ArrayTypedStorage<T[number]>;
  public static create<T>(key: string, initialValue: T, options?: TypedStorageOptions<T>): TypedStorage<T>;
  public static create(key: string, initialValue: any, options: TypedStorageOptions<any> = {}) {
    const valueType = typeof initialValue;

    if (valueType === "number") {
      return new NumberTypedStorage(key, initialValue, options);
    }

    if (valueType === "object" && initialValue instanceof Array) {
      return new ArrayTypedStorage(key, initialValue, options);
    }

    return new TypedStorage(key, initialValue, options);
  }
}
