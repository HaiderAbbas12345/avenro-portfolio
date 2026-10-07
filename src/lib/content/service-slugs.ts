/** Service identifiers shared by articles, projects and service pages. */
export const serviceSlugs = [
  "ui-ux-design",
  "websites",
  "web-applications",
  "saas-product-development",
  "development-partnerships",
  "maintenance-support",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];
