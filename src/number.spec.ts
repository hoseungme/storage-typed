import { NumberTypedStorage } from "./number";
import { generateRandomKey } from "./__test__/helper";

describe("NumberTypedStorage", () => {
  describe("When calling increase", () => {
    it("should add 1 to current value", () => {
      const typed = new NumberTypedStorage(generateRandomKey(), 0);
      typed.increase();
      expect(typed.get()).toBe(1);
    });
  });

  describe("When calling decrease", () => {
    it("should subtract 1 from current value", () => {
      const typed = new NumberTypedStorage(generateRandomKey(), 0);
      typed.decrease();
      expect(typed.get()).toBe(-1);
    });
  });
});
