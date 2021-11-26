import express from "express";
import cors from "cors";
import morgan from "morgan";

interface AppConfig {
  port: number;
}

export async function createApp(config: AppConfig) {
  const app = express();

  app.use(morgan("dev"));
  app.use(cors());

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
