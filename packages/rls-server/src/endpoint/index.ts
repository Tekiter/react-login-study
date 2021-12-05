import { ErrorRequestHandler, Router } from "express";
import { Services } from "../service";
import { defineAuthEndpoint } from "./authEndpoint";
import { defineUserEndpoint } from "./userEndpoint";
import { APIError } from "./utils";

export function getAPIRouter(services: Services) {
  const router = Router();
  defineAuthEndpoint(router, services.auth);
  defineUserEndpoint(router, services.user, services.auth);

  router.use(errorHandler);

  return router;
}

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  if (err instanceof APIError) {
    res.status(err.status).json({ message: err.message });
  } else {
    next(err);
  }
};
