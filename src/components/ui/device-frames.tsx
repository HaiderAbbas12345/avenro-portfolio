import Image from "next/image";

/*
 * CSS device frames around lightweight SVG/WebP screens. The frames are pure
 * HTML/CSS (no extra image requests), so compositions stay fast.
 */

type ScreenProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function BrowserFrame({
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
  url,
  tone = "light",
}: ScreenProps & { url?: string; tone?: "light" | "dark" }) {
  const chrome =
    tone === "dark" ? "bg-night-raised border-white/10" : "bg-[#fafaf8] border-line";
  return (
    <figure
      className={`overflow-hidden rounded-xl border shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)] ${chrome} ${className}`}
    >
      <div className={`flex h-8 items-center gap-1.5 border-b px-3 sm:h-9 ${tone === "dark" ? "border-white/10" : "border-line"}`} aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        {url && (
          <span
            className={`mx-auto hidden h-5 w-1/3 items-center justify-center truncate rounded-md px-3 font-mono text-[10px] sm:flex ${
              tone === "dark" ? "bg-white/5 text-white/50" : "bg-sunken text-ink-subtle"
            }`}
          >
            {url}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        sizes={sizes}
        className="aspect-[16/10] h-auto w-full bg-white object-cover object-top"
      />
    </figure>
  );
}

export function PhoneFrame({ src, alt, priority, sizes = "260px", className = "" }: ScreenProps) {
  return (
    <figure
      className={`rounded-[2.25rem] bg-[#1b1d22] p-[7px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.85rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={390}
          height={844}
          priority={priority}
          sizes={sizes}
          className="aspect-[390/844] h-auto w-full object-cover object-top"
        />
        <span
          aria-hidden="true"
          className="absolute top-2 left-1/2 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-[#1b1d22]"
        />
      </div>
    </figure>
  );
}

/** Desktop screen with an overlapping phone — the standard project showcase. */
export function DeviceComposition({
  screen,
  screenAlt,
  mobile,
  mobileAlt,
  url,
  priority,
  tone = "light",
}: {
  screen: string;
  screenAlt: string;
  mobile?: string;
  mobileAlt?: string;
  url?: string;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div className={`relative ${mobile ? "pr-[14%] pb-[6%]" : ""}`}>
      <BrowserFrame src={screen} alt={screenAlt} url={url} priority={priority} tone={tone} />
      {mobile && mobileAlt && (
        <PhoneFrame
          src={mobile}
          alt={mobileAlt}
          priority={priority}
          sizes="(min-width: 1024px) 200px, 25vw"
          className="absolute right-0 bottom-0 w-[24%] min-w-[84px]"
        />
      )}
    </div>
  );
}
