import { Repository } from "../repository/types";
import { AuthService, AuthServiceImpl } from "./authService";
import { UserService, UserServiceImpl } from "./userService";

export interface Services {
  auth: AuthService;
  user: UserService;
}

export function createServices(repository: Repository): Services {
  const user = new UserServiceImpl(repository.user);
  const auth = new AuthServiceImpl("SE_CR_ET", user);

  return {
    user,
    auth,
  };
}
