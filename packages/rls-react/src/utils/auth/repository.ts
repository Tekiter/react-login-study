export interface AuthRepository {
  saveAuthData(data: AuthData): void;
  getAuthData(): AuthData | null;
}

interface AuthData {
  accessToken: string;
}

const AUTH_TOKEN_KEY = "REACT_AUTH_TOKEN";

export class AuthRepositoryLocalStorage implements AuthRepository {
  saveAuthData(data: AuthData): void {
    const payload = JSON.stringify(data);

    localStorage.setItem(AUTH_TOKEN_KEY, payload);
  }

  getAuthData(): AuthData | null {
    const raw = localStorage.getItem(AUTH_TOKEN_KEY);
    if (raw === null) {
      return null;
    }
    const data = JSON.parse(raw) as AuthData;
    return data;
  }
}
