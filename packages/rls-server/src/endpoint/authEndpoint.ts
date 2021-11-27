import { Router } from "express";
import { AuthService } from "../service/authService";
import { asyncRoute } from "./utils";

export function defineAuthEndpoint(router: Router, authService: AuthService) {
  router.post(
    "/authorize",
    asyncRoute(async (req, res) => {
      interface AuthInfo {
        username: string;
        password: string;
      }

      const info = req.body as AuthInfo;

      if (!info.username || !info.password) {
        res.status(400).json({ message: "입력값 필드가 올바르지 않습니다." });

        return;
      }

      const authToken = await authService.authorize({
        username: info.username,
        password: info.password,
      });

      if (authToken === null) {
        res.status(403).json({ message: "로그인 실패" });
      } else {
        res.status(200).json({ accessToken: authToken });
      }
    })
  );
}
