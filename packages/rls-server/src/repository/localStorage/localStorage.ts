import { LocalStorage } from "node-localstorage";
import fs from "fs";

export class LocalStorageStore {
  private ls: LocalStorage;

  constructor(storeLocation: string) {
    fs.mkdirSync(storeLocation);
    this.ls = new LocalStorage(storeLocation);
  }

  findAll<T>(key: string): T[] {
    const ret = this.ls.getItem(key);

    if (!ret) {
      return [];
    }

    const data = JSON.parse(ret) as T[];

    return data;
  }

  add<T>(key: string, value: T): void {
    const arr = this.findAll<T>(key);
    arr.push(value);
    this.ls.setItem(key, JSON.stringify(arr));
  }
}
