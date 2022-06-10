import { TypedStorage } from "./any";

export class BooleanTypedStorage extends TypedStorage<boolean> {
  public toggle() {
    const current = this.get();
    if (current !== null) {
      this.set(!current);
    }
  }

  public true() {
    this.set(true);
  }

  public false() {
    this.set(false);
  }
}
