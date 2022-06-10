import { TypedStorageFactory } from "./factory";
import { NumberTypedStorage } from "./number";
import { TypedStorage } from "./any";
import { generateRandomKey } from "./__test__/helper";

describe("TypedStorageFactory", () => {
  describe("When creating with number value", () => {
    it("should return instance of NumberTypedStorage", () => {
      const typed = TypedStorageFactory.create(generateRandomKey(), 0);
      expect(typed).toBeInstanceOf(NumberTypedStorage);
    });
  });

  describe("When creating with any other value", () => {
    it("should return instance of TypedStorage", () => {
      const typed = TypedStorageFactory.create(generateRandomKey(), null);
      expect(typed).toBeInstanceOf(TypedStorage);
    });
  });
});
