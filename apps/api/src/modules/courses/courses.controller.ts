import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CoursesService } from "./courses.service";

@ApiTags("courses")
@Controller("courses")
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  @ApiOkResponse({ description: "Card-level fields for every published course." })
  list() {
    return this.courses.listCards();
  }

  @Get(":slug")
  @ApiOkResponse({ description: "Full detail for one published course." })
  bySlug(@Param("slug") slug: string) {
    return this.courses.getBySlug(slug);
  }
}
