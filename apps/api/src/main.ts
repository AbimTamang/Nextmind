import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const logger = new Logger("Bootstrap");

  app.use(helmet());
  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new HttpExceptionFilter());
  /**
   * Deliberately no global ValidationPipe. Nest defaults it to
   * class-validator, which would be a second validation system beside the
   * Zod schemas in @nextminds/contracts - and only the Zod ones are shared
   * with the web app, so only they can guarantee both sides agree. Handlers
   * opt in with ZodValidationPipe instead.
   */

  /**
   * credentials: true is required for the session cookie to survive the
   * cross-origin hop from the web app. It only works against an explicit origin
   * list - a wildcard origin with credentials is rejected by every browser - so
   * CORS_ORIGINS must name each deployed frontend.
   */
  app.enableCors({
    origin: config.get<string[]>("CORS_ORIGINS"),
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  });

  // Graceful shutdown: lets DatabaseModule close the pool before the process
  // exits, so rolling deploys do not pin connections on the database.
  app.enableShutdownHooks();

  if (config.get<string>("NODE_ENV") !== "production") {
    const doc = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("Next Minds API")
        .setDescription("Backend for the Next Minds platform")
        .setVersion("1.0")
        .build(),
    );
    SwaggerModule.setup("api/docs", app, doc);
  }

  const port = config.get<number>("PORT") ?? 4000;
  await app.listen(port);
  logger.log(`API listening on http://localhost:${port}/api/v1`);
}

void bootstrap();
