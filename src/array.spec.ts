import { ArrayTypedStorage } from "./array";
import { generateRandomKey } from "./__test__/helper";

describe("ArrayTypedStorage", () => {
  describe("When calling push", () => {
    it("should push value into current array", () => {
      const typed = new ArrayTypedStorage(generateRandomKey(), [0]);
      typed.push(1);
      expect(typed.get()).toEqual([0, 1]);
    });
  });

  describe("When calling pop", () => {
    it("should pop value from current array", () => {
      const typed = new ArrayTypedStorage(generateRandomKey(), [0]);
      expect(typed.pop()).toBe(0);
      expect(typed.get()).toEqual([]);
    });
  });
});
