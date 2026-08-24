/**
 * Public Songtell editorial set. Older CMS/local posts stay recoverable, but
 * only these intent-specific articles are exposed on the new site for now.
 */
export const RETAINED_BLOG_SLUGS = [
  "apology-song-ideas",
  "electronic-wedding-songs",
  "long-distance-gift-songs",
  "mother-son-dance-songs",
] as const;

export function isRetainedBlogSlug(slug: string) {
  return RETAINED_BLOG_SLUGS.includes(
    slug.replace(/^\//, "").replace(/^blogs\//, "") as (typeof RETAINED_BLOG_SLUGS)[number],
  );
}
