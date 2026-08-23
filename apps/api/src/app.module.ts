import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateEnv } from "./config/env";
import { DatabaseModule } from "./database/database.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Read from the app directory regardless of where the process was
      // launched from, so `turbo run start` at the repo root behaves the same
      // as running this app directly.
      envFilePath: [".env.local", ".env"],
      // Boot fails on a bad environment rather than surfacing it as a runtime
      // error on whichever request happens to need the missing value first.
      validate: validateEnv,
    }),
    DatabaseModule,
    HealthModule,
    CoursesModule,
  ],
})
export class AppModule {}
