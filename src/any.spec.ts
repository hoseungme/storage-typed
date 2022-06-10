import { TypedStorage } from "./any";
import { createInmemoryStorage } from "./base";
import { generateRandomKey } from "./__test__/helper";

describe("TypedStorage", () => {
  describe("When initializing", () => {
    it("should be initialized with given value", () => {
      expect(new TypedStorage(generateRandomKey(), "foo").get()).toBe("foo");
    });

    it("should be initialized with given storage", () => {
      const storage = createInmemoryStorage();
      const key = generateRandomKey();
      new TypedStorage(key, 1234, { storage });
      expect(JSON.parse(storage.getItem(key)!)).toBe(1234);
    });
  });

  describe("When calling get", () => {
    it("should return current value", () => {
      const typed = new TypedStorage(generateRandomKey(), ["foo"]);
      expect(typed.get()).toEqual(["foo"]);
    });
  });

  describe("When calling set", () => {
    it("should change current value into given new value", () => {
      const typed = new TypedStorage(generateRandomKey(), "foo");
      typed.set("bar");
      expect(typed.get()).toBe("bar");
    });
  });
});
