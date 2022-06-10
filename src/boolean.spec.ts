import { BooleanTypedStorage } from "./boolean";
import { generateRandomKey } from "./__test__/helper";

describe("BooleanTypedStorage", () => {
  describe("When calling toggle", () => {
    it("should reverse current value", () => {
      const typed = new BooleanTypedStorage(generateRandomKey(), false);
      typed.toggle();
      expect(typed.get()).toBe(true);
    });
  });

  describe("When calling true", () => {
    it("should set current value to true", () => {
      const typed = new BooleanTypedStorage(generateRandomKey(), false);
      typed.true();
      expect(typed.get()).toBe(true);
    });
  });

  describe("When calling false", () => {
    it("should set current value to false", () => {
      const typed = new BooleanTypedStorage(generateRandomKey(), true);
      typed.false();
      expect(typed.get()).toBe(false);
    });
  });
});
