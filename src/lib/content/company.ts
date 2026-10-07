/**
 * Company-level content shared across pages: how we work, engagement models,
 * industries and standards. Edit here — the pages read from these lists.
 *
 * Everything below must stay true. Standards are commitments, not statistics.
 */

export const serviceGroups = [
  {
    id: "design",
    name: "Design",
    description: "Research, UX and interface design that makes software clear and easy to use.",
  },
  {
    id: "build",
    name: "Build",
    description: "Websites, web applications and SaaS products, engineered to be fast and maintainable.",
  },
  {
    id: "partner",
    name: "Partner & Support",
    description: "Extra engineering capacity for agencies and teams, and long-term care after launch.",
  },
] as const;

export type ServiceGroupId = (typeof serviceGroups)[number]["id"];
export const serviceGroupIds = serviceGroups.map((g) => g.id) as ServiceGroupId[];

export const processSteps = [
  {
    title: "Discover",
    description: "We learn how your business works, who the users are and what success looks like, then agree a written scope.",
  },
  {
    title: "Design",
    description: "Information architecture, wireframes and interface design, validated with you before build begins.",
  },
  {
    title: "Build",
    description: "Development in short cycles on a live preview, with regular demos so there are no surprises.",
  },
  {
    title: "Launch",
    description: "Careful release with testing, analytics, SEO checks and monitoring in place from day one.",
  },
  {
    title: "Grow",
    description: "Ongoing support, improvements and new features based on how the product is actually used.",
  },
] as const;

export const engagementModels = [
  {
    title: "Fixed-scope project",
    bestFor: "Websites, redesigns and well-defined first releases",
    description:
      "A written scope, timeline and price agreed up front. Ideal when you know what you need and want cost certainty.",
    points: ["Clear deliverables and milestones", "Fixed price per phase", "Post-launch support period included"],
  },
  {
    title: "Dedicated product team",
    bestFor: "SaaS products and evolving web applications",
    description:
      "A consistent Avenro team working through your roadmap in regular cycles, with priorities you set each sprint.",
    points: ["Monthly capacity you can plan around", "Roadmap-driven priorities", "Design and engineering together"],
  },
  {
    title: "Agency partnership",
    bestFor: "Agencies and studios delivering for their own clients",
    description:
      "White-label design-to-code and development under your brand, inside your process, with non-solicitation as standard.",
    points: ["Works under your brand", "Joins your tools and workflow", "Pilot project to start"],
  },
] as const;

export const industries = [
  {
    name: "Home & local services",
    description: "Websites and scheduling tools for roofing, cleaning, HVAC and other service businesses.",
    image: "/images/photos/industry-home-services.jpg",
    imageAlt: "Workers renovating the roof of a two-storey house with scaffolding along the front",
  },
  {
    name: "Professional services",
    description: "Credible, lead-focused websites and client portals for consultancies, firms and advisors.",
    image: "/images/photos/industry-professional-services.jpg",
    imageAlt: "An advisor meeting with two clients at a desk in a bright office",
  },
  {
    name: "Startups & SaaS",
    description: "MVPs, product interfaces and marketing sites for founders moving from idea to traction.",
    image: "/images/photos/industry-startups.jpg",
    imageAlt: "Developers working at shared desks with monitors in a loft-style office",
  },
  {
    name: "Agencies & studios",
    description: "Reliable white-label development for design, marketing and branding agencies.",
    image: "/images/photos/industry-agencies.jpg",
    imageAlt: "A creative team at a table with laptops, one person holding up a color swatch fan",
  },
  {
    name: "Healthcare & wellness",
    description: "Accessible websites and booking experiences for clinics and wellness providers.",
    image: "/images/photos/industry-healthcare.jpg",
    imageAlt: "Two medical professionals working with a tablet and laptop at a glass desk",
  },
  {
    name: "E-commerce & retail",
    description: "Fast storefronts, product pages and internal tools for growing online brands.",
    image: "/images/photos/industry-ecommerce.jpg",
    imageAlt: "Hands packing paper into a white shipping box for an online order",
  },
] as const;

/** Commitments we make on every project. Keep these true. */
export const standards = [
  { value: "2 days", label: "We reply to every inquiry within two business days." },
  { value: "100%", label: "You own the code, designs and accounts we create for you." },
  { value: "WCAG 2.2", label: "We design and test to AA accessibility guidelines." },
  { value: "Weekly", label: "Progress updates and working previews throughout." },
] as const;

export const companyFaqs = [
  {
    question: "What does Avenro do?",
    answer:
      "Avenro is a software and digital product company. We design and build business websites, custom web applications and SaaS products, provide UI/UX design, partner with agencies as a white-label development team, and support products after launch.",
  },
  {
    question: "Where are you based, and which clients do you work with?",
    answer:
      "Avenro is remote-first and works with clients in the United States, the United Kingdom, Europe and other English-speaking markets. We agree overlap hours with every client so calls and reviews happen in your working day.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. After an initial conversation we send a written proposal with a clear price, timeline and list of deliverables. Our guide to website costs explains the main factors.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most business websites take four to eight weeks from agreed scope to launch. First releases of web applications and SaaS products typically take two to four months, depending on complexity.",
  },
  {
    question: "Do we own the work?",
    answer:
      "Yes. Code lives in your repositories and runs on accounts in your name. Once a project is paid for, the code, designs and content are yours.",
  },
  {
    question: "Can you help after launch?",
    answer:
      "Yes. Every project includes a post-launch support period, and our maintenance and support service covers updates, monitoring, performance and ongoing improvements.",
  },
] as const;
