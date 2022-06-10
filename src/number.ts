import { TypedStorage } from "./any";

export class NumberTypedStorage extends TypedStorage<number> {
  public increase() {
    const current = this.get();
    if (current !== null) {
      this.set(current + 1);
    }
  }

  public decrease() {
    const current = this.get();
    if (current !== null) {
      this.set(current - 1);
    }
  }
}
