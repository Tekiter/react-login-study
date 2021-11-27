import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createRepository } from "./repository/localStorage";
import { createServices } from "./service";
import { getAPIRouter } from "./endpoint";

interface AppConfig {
  port: number;
}

export async function createApp(config: AppConfig) {
  const app = express();

  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  const repository = createRepository();
  const services = createServices(repository);
  const router = getAPIRouter(services);

  app.use("/api", router);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "올바르지 않은 경로입니다." });
  });

  async function start() {
    return new Promise((resolve) => {
      app.listen(config.port, () => {
        resolve(undefined);
      });
    });
  }

  return {
    start,
  };
}
