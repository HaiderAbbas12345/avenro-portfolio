import Image from "next/image";

/*
 * Social proof components. They render nothing until real data is passed in.
 * Only add testimonials and logos that are genuine and used with permission.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export function TestimonialBlock({ testimonial }: { testimonial?: Testimonial }) {
  if (!testimonial) return null;
  return (
    <figure className="max-w-3xl">
      <blockquote className="text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 text-sm text-ink-muted">
        <span className="font-medium text-ink">{testimonial.name}</span>, {testimonial.role}, {testimonial.company}
      </figcaption>
    </figure>
  );
}

export type ClientLogo = { name: string; src: string; width: number; height: number };

export function LogoGrid({ logos = [], title = "Trusted by" }: { logos?: ClientLogo[]; title?: string }) {
  if (!logos.length) return null;
  return (
    <div>
      <h2 className="eyebrow text-center">{title}</h2>
      <ul className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <li key={logo.name} className="flex justify-center">
            <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-8 w-auto opacity-70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
