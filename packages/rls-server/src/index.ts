import { createApp } from "./app";

async function main() {
  const app = await createApp({
    port: 5000,
  });

  await app.start();

  console.log("[INFO]: App Started");
}

main();
