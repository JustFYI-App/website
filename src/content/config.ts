/**
 * Content Collection Configuration
 *
 * Defines the schema and structure for Markdown content files.
 * Content is organized by language in the pages collection.
 */

import { defineCollection, z } from 'astro:content';

/**
 * Schema for page frontmatter
 *
 * All Markdown pages should include these fields in their frontmatter.
 * Note: 'slug' is a reserved field in Astro, so we use 'pageSlug' instead.
 */
const pageSchema = z.object({
  // Page title (used in <title> and <h1>)
  title: z.string(),

  // Page description (used in meta description)
  description: z.string(),

  // Language code (en, de, es, fr, pt)
  lang: z.enum(['en', 'de', 'es', 'fr', 'pt']),

  // Page slug (URL path without language prefix)
  // Using pageSlug since 'slug' is reserved in Astro content collections
  pageSlug: z.string().optional(),

  // Last updated date (for legal pages like Privacy Policy)
  lastUpdated: z.date().optional(),

  // Whether to show table of contents
  showToc: z.boolean().default(false),

  // Custom meta image for Open Graph
  ogImage: z.string().optional(),

  // Whether this page should be indexed by search engines
  noIndex: z.boolean().default(false),

  // Page-specific keywords for SEO
  keywords: z.array(z.string()).optional(),

  // Sort order for navigation (lower = first)
  order: z.number().default(100),
});

/**
 * Pages collection
 *
 * Markdown content files organized by language.
 * Structure: src/content/pages/{lang}/{page}.md
 *
 * Examples:
 * - src/content/pages/en/home.md
 * - src/content/pages/de/privacy-policy.md
 * - src/content/pages/es/faq.md
 */
const pages = defineCollection({
  type: 'content',
  schema: pageSchema,
});

/**
 * FAQ collection schema for structured FAQ data
 *
 * This can be used if FAQs need to be structured separately
 * from the main FAQ page content.
 */
const faqSchema = z.object({
  // Question text
  question: z.string(),

  // Answer text (can include Markdown)
  answer: z.string(),

  // FAQ category (Privacy, Usage, Technical, Safety)
  category: z.enum(['privacy', 'usage', 'technical', 'safety']),

  // Language code
  lang: z.enum(['en', 'de', 'es', 'fr', 'pt']),

  // Sort order within category
  order: z.number().default(100),
});

/**
 * Export all collections
 */
export const collections = {
  pages,
};

/**
 * Export schema types for use in components
 */
export type PageFrontmatter = z.infer<typeof pageSchema>;
export type FAQItem = z.infer<typeof faqSchema>;

/**
 * Helper to extract page slug from content entry ID
 * ID format: "en/about.md" -> returns "about"
 */
export function getPageSlugFromId(id: string): string {
  // Remove the .md extension and language prefix
  const withoutExtension = id.replace(/\.md$/, '');
  const parts = withoutExtension.split('/');
  return parts[parts.length - 1];
}
