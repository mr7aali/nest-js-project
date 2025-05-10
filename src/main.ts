import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "https://localhost:3000"], // Allow frontend origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // If you need cookies or auth headers
    // allowedHeaders: "Content-Type, Authorization",
  });
  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
