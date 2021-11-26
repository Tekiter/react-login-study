import { User } from "../../entity/user";
import { UserRepository } from "../types/userRepository";
import { LocalStorageStore } from "./localStorage";

const USER_KEY = "Users";

export class UserRepositoryLS implements UserRepository {
  constructor(private store: LocalStorageStore) {}

  async getUserByUsername(username: string): Promise<User | null> {
    const items = this.store.findAll<User>(USER_KEY);
    const user = items.find((item) => item.username === username);

    return user ?? null;
  }

  async isUserExists(username: string): Promise<boolean> {
    return (await this.getUserByUsername(username)) !== null;
  }

  async addNewUser(user: User): Promise<void> {
    this.store.add(USER_KEY, user);
  }
}
