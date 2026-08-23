import { Injectable, NotFoundException } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";
import type { CourseCardDto, CourseDetailDto } from "./courses.dto";

/** Business rules only - no ORM, no HTTP. */
@Injectable()
export class CoursesService {
  constructor(private readonly repo: CoursesRepository) {}

  listCards(): Promise<CourseCardDto[]> {
    return this.repo.findPublishedCards();
  }

  async getBySlug(slug: string): Promise<CourseDetailDto> {
    const course = await this.repo.findPublishedBySlug(slug);
    if (!course) throw new NotFoundException(`No published course with slug "${slug}"`);
    return course;
  }
}
