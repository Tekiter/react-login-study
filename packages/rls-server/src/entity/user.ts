export interface User {
  username: string;
  nickname: string;
  passwordHash: string;
  role: "user" | "admin";
}
