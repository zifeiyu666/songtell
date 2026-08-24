import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageHeroProps = {
  badge?: {
    icon?: ReactNode;
    label: string;
  };
  backgroundClassName?: string;
  className?: string;
  containerClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  titleLines: string[];
  underline?: {
    colorClassName?: string;
    phrase: string;
  };
};

export function PageHero({
  badge,
  backgroundClassName,
  className,
  containerClassName,
  description,
  descriptionClassName,
  titleClassName,
  titleLines,
  underline,
}: PageHeroProps) {
  return (
    <section className={cn("creem-page-hero w-full", backgroundClassName, className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40",
          containerClassName
        )}
      >
        <div className="max-w-5xl">
          {badge && (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black uppercase text-primary shadow-sm">
              {badge.icon}
              {badge.label}
            </p>
          )}

          <h1
            className={cn(
              "mt-5 max-w-5xl text-balance font-display text-5xl font-normal leading-[0.98] tracking-[0.01em] text-[var(--songtell-ink)] md:text-7xl",
              titleClassName
            )}
          >
            {titleLines.map((line, index) => (
              <span className="block" key={`${line}-${index}`}>
                {renderLine(line, underline)}
              </span>
            ))}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg leading-8 text-[var(--songtell-muted)]",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function renderLine(
  line: string,
  underline?: PageHeroProps["underline"]
) {
  if (!underline || !line.includes(underline.phrase)) {
    return line;
  }

  const [before, after] = line.split(underline.phrase, 2);

  return (
    <>
      {before}
      <span className="relative inline-block pb-1.5 md:pb-2">
        <span className="relative z-10">{underline.phrase}</span>
        <svg
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-4 w-full md:h-5",
            underline.colorClassName ?? "text-[#f6c157]"
          )}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 100 18"
        >
          <path
            d="M2 12.5C19 10.2 32 10.9 49 12.5C64 14 80 14.2 98 11.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.8"
            opacity="0.82"
          />
          <path
            d="M28 15.2C41 12.8 57 12.6 72 14.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.4"
            opacity="0.58"
          />
        </svg>
      </span>
      {after}
    </>
  );
}
