import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { UserService } from "./userService";

export interface AuthService {
  authorize(authInfo: AuthInfo): Promise<AuthToken | null>;
  verify(token: AuthToken): Promise<TokenData | null>;
}

interface AuthInfo {
  username: string;
  password: string;
}

export interface TokenData {
  username: string;
}

type AuthToken = string;

export class AuthServiceImpl implements AuthService {
  constructor(private JWT_SECRET: string, private userService: UserService) {}

  async authorize(authInfo: AuthInfo): Promise<string | null> {
    const user = await this.userService.getUser(authInfo.username);
    if (user === null) {
      return null;
    }

    const isPasswordMatch = bcrypt.compare(
      authInfo.password,
      user.passwordHash
    );
    if (!isPasswordMatch) {
      return null;
    }

    return await this.createAuthToken({
      username: user.username,
    });
  }

  async verify(token: AuthToken): Promise<TokenData | null> {
    try {
      const extracted = verify(token, this.JWT_SECRET) as TokenData;
      return extracted;
    } catch {
      return null;
    }
  }

  private async createAuthToken(user: TokenData): Promise<AuthToken> {
    const token = sign(
      {
        username: user.username,
      },
      this.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    return token;
  }
}
