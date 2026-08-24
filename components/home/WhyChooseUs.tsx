import {
  Heart,
  Mic2,
  Palette,
  Share2,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const reasonIcons: LucideIcon[] = [Zap, Mic2, Heart, Sparkles, Palette, Share2];
const iconBackgrounds = [
  "bg-[#fff7df]",
  "bg-[#eee8fb]",
  "bg-[#fff0f3]",
  "bg-[#f3eafb]",
  "bg-[#fff1e8]",
  "bg-[#fff7df]",
];
const cardBackgrounds = [
  "bg-[var(--songtell-theme)]",
  "bg-[var(--songtell-purple)]",
  "bg-[#5964eb]",
  "bg-[#72c97a]",
  "bg-[var(--songtell-theme)]",
  "bg-[var(--songtell-purple)]",
];

export default function WhyChooseUs() {
  const t = useTranslations("Landing.WhyChooseUs");
  const reasons = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="home-section">
      <div className="home-container">
        <div className="home-section-header">
          <p className="home-eyebrow">{t("eyebrow")}</p>
          <h2 className="home-title">{t("title")}</h2>
          <p className="home-description !max-w-5xl">{t("description")}</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reasonIcons[index % reasonIcons.length];
            const isBlueCard = index === 2;

            return (
              <li
                key={reason.title}
                className={`flex min-h-44 items-start gap-4 rounded-md border-[3px] border-[var(--songtell-ink)] p-4 shadow-[4px_4px_0_var(--songtell-ink)] sm:p-5 ${cardBackgrounds[index % cardBackgrounds.length]}`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-md border-[3px] border-[var(--songtell-ink)] shadow-[2px_2px_0_var(--songtell-ink)] ${iconBackgrounds[index % iconBackgrounds.length]}`}
                >
                  <Icon className="size-6 stroke-[2] text-[var(--songtell-ink)]" aria-hidden="true" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3
                    className={`text-lg font-bold leading-tight sm:text-xl ${isBlueCard ? "text-white" : "text-[var(--songtell-ink)]"}`}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-5 ${isBlueCard ? "text-white/90" : "text-[var(--songtell-muted)]"}`}
                  >
                    {reason.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
