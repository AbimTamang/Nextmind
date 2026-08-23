import { Global, Module, type OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
// Importing the package is what wires the model associations - they run at
// module scope behind an idempotent guard, so there is no init call to make.
import { sequelize } from "@nextminds/db";

export const SEQUELIZE = Symbol("SEQUELIZE");

/**
 * Owns the single Sequelize connection for the process.
 *
 * Global because every domain module needs it and threading an import through
 * each one adds nothing. The pool is closed on shutdown so that a rolling
 * deploy does not leave connections pinned on the database - Neon's pooler
 * counts them against a fairly low ceiling.
 */
@Global()
@Module({
  providers: [
    {
      provide: SEQUELIZE,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const logger = new Logger("Database");
        await sequelize.authenticate();
        logger.log(`Connected (${config.get<string>("NODE_ENV")})`);
        return sequelize;
      },
    },
  ],
  exports: [SEQUELIZE],
})
export class DatabaseModule implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await sequelize.close();
  }
}
