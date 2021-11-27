import { createApp } from "./app";

async function main() {
  const PORT = 5000;

  const app = await createApp({
    port: PORT,
  });

  await app.start();

  console.log(`[INFO]: App Started [http://localhost:${PORT}]`);
}

main();
