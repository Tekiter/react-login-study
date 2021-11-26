import bcrypt from "bcrypt";
import { User } from "../entity/user";
import { UserRepository } from "../repository/types/userRepository";

export interface UserService {
  createNewUser(userInfo: CreateUserInfo): Promise<void>;
  getUser(username: string): Promise<User | null>;
}

interface CreateUserInfo {
  username: string;
  nickname: string;
  password: string;
}

export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  async createNewUser(userInfo: CreateUserInfo): Promise<void> {
    const user: User = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password_hash: await this.hashPassword(userInfo.password),
      role: "user",
    };

    await this.userRepository.addNewUser(user);
  }

  async getUser(username: string): Promise<User | null> {
    const user = await this.userRepository.getUserByUsername(username);

    if (user === null) {
      return null;
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
