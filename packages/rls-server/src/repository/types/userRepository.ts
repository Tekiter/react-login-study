import { User } from "../../entity/user";

export interface UserRepository {
  getUserByUsername(username: string): Promise<User | null>;
  isUserExists(username: string): Promise<boolean>;
  addNewUser(user: User): Promise<void>;
}
