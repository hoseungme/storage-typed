// please see https://github.com/HoseungJang/storage-cover if you want to know about what is this code

const isSSR = typeof window === "undefined";

export function wrapLocalStorage(): Storage {
  return isSSR ? createInmemoryStorage() : wrapStorage(window.localStorage);
}

function wrapStorage(storage: Storage): Storage {
  if (!isSupported(storage)) {
    return createInmemoryStorage();
  }
  return {
    getItem: (key) => {
      return storage.getItem(key);
    },
    setItem: (key, value) => {
      storage.setItem(key, value);
    },
    removeItem: (key) => {
      storage.removeItem(key);
    },
    clear: () => {
      storage.clear();
    },
    key: (index) => {
      return storage.key(index);
    },
    get length() {
      return storage.length;
    },
  };
}

function createInmemoryStorage(): Storage {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key) => {
      return storage[key] ?? null;
    },
    setItem: (key, value) => {
      storage[key] = value;
    },
    removeItem: (key) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
    key: (index) => {
      return Object.keys(storage)[index] ?? null;
    },
    get length() {
      return Object.keys(storage).length;
    },
  };
}

function isSupported(storage: Storage) {
  try {
    const key = new Array(4)
      .fill(null)
      .map(() => Math.random().toString(36).slice(2))
      .join("");
    storage.setItem(key, key);
    const result = storage.getItem(key) === key;
    storage.removeItem(key);
    return result;
  } catch (e) {
    return false;
  }
}
