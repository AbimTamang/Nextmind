/**
 * The wire format for courses.
 *
 * Declared here rather than inferred from the model on purpose. Inferring leaks
 * Sequelize's types across the package boundary - TypeScript rejects it outright
 * in a pnpm workspace (TS2742), which is a useful early warning that the ORM is
 * escaping the layer meant to contain it. Writing the shape by hand also means
 * adding a column to the table cannot silently widen the public API.
 */
export interface CourseCardDto {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDesc: string;
  tools: string[];
  badge: string | null;
  color: string;
  students: number;
  duration: string;
  level: string;
  price: number;
}

export interface CourseDetailDto extends CourseCardDto {
  contentMd: string | null;
  whoIsItFor: string[];
  skills: string[];
  curriculum: unknown[];
  faqs: unknown[];
  imageUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}
