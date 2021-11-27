import { Router } from "express";
import { UserService } from "../service/userService";
import { asyncRoute } from "./utils";

export function defineUserEndpoint(router: Router, user: UserService) {
  router.post(
    "/user",
    asyncRoute(async (req, res) => {
      interface UserInfo {
        username: string;
        password: string;
        nickname: string;
      }

      const data = req.body as UserInfo;

      await user.createNewUser({
        username: data.username,
        password: data.password,
        nickname: data.nickname,
      });

      res.status(200).json({ success: true });
    })
  );
}
