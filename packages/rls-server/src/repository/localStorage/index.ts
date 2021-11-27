import { Repository } from "../types";
import { LocalStorageStore } from "./localStorage";
import { UserRepositoryLS } from "./userRepositoryLS";

export function createRepository(): Repository {
  const store = new LocalStorageStore("data/db");

  const user = new UserRepositoryLS(store);

  return {
    user,
  };
}
