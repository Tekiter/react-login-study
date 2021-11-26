import { sign, verify } from "jsonwebtoken";

export interface AuthService {
  createAuthToken(user: TokenData): Promise<AuthToken>;
  extractToken(token: AuthToken): Promise<TokenData | null>;
}

export interface TokenData {
  username: string;
}

type AuthToken = string;

export class AuthServiceImpl implements AuthService {
  constructor(private JWT_SECRET: string) {}

  async createAuthToken(user: TokenData): Promise<AuthToken> {
    const token = sign(
      {
        username: user.username,
      },
      this.JWT_SECRET,
      {
        expiresIn: 60,
      }
    );

    return token;
  }

  async extractToken(token: AuthToken): Promise<TokenData | null> {
    try {
      const extracted = verify(token, this.JWT_SECRET) as TokenData;
      return extracted;
    } catch {
      return null;
    }
  }
}
