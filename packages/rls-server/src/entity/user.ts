export interface User {
  username: string;
  nickname: string;
  password_hash: string;
  role: "user" | "admin";
}
