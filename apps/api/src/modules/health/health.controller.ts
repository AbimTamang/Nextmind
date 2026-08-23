import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  type HealthIndicatorResult,
} from "@nestjs/terminus";
import { ApiTags } from "@nestjs/swagger";
import { sequelize } from "@nextminds/db";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  /**
   * Liveness only - answers as long as the process is up. Kept free of the
   * database check so a database blip cannot cause the orchestrator to kill
   * otherwise-healthy instances and turn a degraded API into an outage.
   */
  @Get("live")
  live() {
    return { status: "ok", uptime: process.uptime() };
  }

  /** Readiness - is this instance fit to receive traffic right now? */
  @Get("ready")
  @HealthCheck()
  ready() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => {
        try {
          await sequelize.authenticate();
          return { database: { status: "up" } };
        } catch (e) {
          return {
            database: { status: "down", message: e instanceof Error ? e.message : "unknown" },
          };
        }
      },
    ]);
  }
}
