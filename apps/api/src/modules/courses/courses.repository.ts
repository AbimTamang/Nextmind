import { Injectable } from "@nestjs/common";
import { Category, Course } from "@nextminds/db";
import type { CourseCardDto, CourseDetailDto } from "./courses.dto";

/**
 * The only layer that knows Sequelize exists.
 *
 * It also does the mapping to plain objects, so no model instance - and no ORM
 * type - ever leaves this file. That containment is what makes swapping the ORM
 * a per-domain change, and it prevents the failure the previous app shipped:
 * handing a full model to the view and serialising 190KB of course markdown
 * into every page payload.
 */
@Injectable()
export class CoursesRepository {
  /** Card-level columns only. Deliberately excludes contentMd/faqs/curriculum. */
  private static readonly CARD_ATTRIBUTES = [
    "id", "slug", "title", "categoryId", "description", "shortDesc",
    "tools", "badge", "color", "students", "duration", "level", "price",
  ];

  async findPublishedCards(): Promise<CourseCardDto[]> {
    const rows = await Course.findAll({
      where: { published: true },
      attributes: CoursesRepository.CARD_ATTRIBUTES,
      include: [{ model: Category, as: "category", attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });
    return rows.map((c) => toCard(c));
  }

  async findPublishedBySlug(slug: string): Promise<CourseDetailDto | null> {
    const c = await Course.findOne({
      where: { slug, published: true },
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });
    if (!c) return null;
    return {
      ...toCard(c),
      contentMd: c.contentMd ?? null,
      whoIsItFor: c.whoIsItFor ?? [],
      skills: c.skills ?? [],
      curriculum: c.curriculum ?? [],
      faqs: c.faqs ?? [],
      imageUrl: c.imageUrl ?? null,
      metaTitle: c.metaTitle ?? null,
      metaDescription: c.metaDescription ?? null,
    };
  }
}

/** Local because it is a detail of how this table maps, not a shared concern. */
function toCard(c: Course): CourseCardDto {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    category: c.category?.name ?? "General",
    description: c.description,
    shortDesc: c.shortDesc || c.description,
    tools: c.tools ?? [],
    badge: c.badge ?? null,
    color: c.color ?? "#00c29a",
    students: c.students,
    duration: c.duration,
    level: c.level,
    price: c.price,
  };
}
