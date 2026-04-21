import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDb } from "./config/db.js";

async function bootstrap() {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(`Athletica API running on http://localhost:${env.PORT}${env.API_PREFIX}`);
  });
}

void bootstrap();
