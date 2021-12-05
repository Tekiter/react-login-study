import { Router } from "express";
import { AuthService } from "../service/authService";
import { UserService } from "../service/userService";
import { APIError, asyncRoute } from "./utils";

export function defineUserEndpoint(
  router: Router,
  user: UserService,
  auth: AuthService
) {
  router.get(
    "/user",
    asyncRoute(async (req, res) => {
      const authInfo = await extractAuthInfo();
      const userInfo = await user.getUser(authInfo.username);

      if (userInfo) {
        res.status(200).json({
          username: userInfo.username,
          nickname: userInfo.nickname,
        });
        return;
      }

      async function extractAuthInfo() {
        const header = req.headers.authorization;
        if (!(header && header.startsWith("Bearer "))) {
          throw new APIError(401, "unauthorized");
        }

        const accessToken = header.substr("Bearer ".length).trim();

        const authInfo = await auth.verify(accessToken);
        if (authInfo === null) {
          throw new APIError(401, "unauthorized");
        }

        return authInfo;
      }
    })
  );

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
