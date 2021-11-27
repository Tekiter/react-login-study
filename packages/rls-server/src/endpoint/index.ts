import { Router } from "express";
import { Services } from "../service";
import { defineAuthEndpoint } from "./authEndpoint";
import { defineUserEndpoint } from "./userEndpoint";

export function getAPIRouter(services: Services) {
  const router = Router();
  defineAuthEndpoint(router, services.auth);
  defineUserEndpoint(router, services.user);
  return router;
}
