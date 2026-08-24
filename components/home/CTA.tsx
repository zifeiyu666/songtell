import { Link as I18nLink } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("Landing.CTA");
  const hero = useTranslations("Landing.Hero");

  return (
    <section id="cta" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-ink)] p-8 text-white shadow-[4px_4px_0_var(--songtell-ink)] sm:p-12 md:p-16">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
              <h2 className="text-balance font-display text-4xl font-normal leading-[1.02] tracking-[0.02em] sm:text-5xl md:text-6xl">
                <span className="block">{hero("titleLine")}</span>
                <span className="block text-white">
                  {hero("titleAccent")}
                </span>
              </h2>

              <p className="cta-subtitle mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                {t.rich("description", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row">
                <I18nLink
                  href="/create-song"
                  className="songtell-lift-button inline-flex items-center gap-2 border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] px-6 py-3 text-base font-bold text-[var(--songtell-ink)] shadow-[3px_3px_0_var(--songtell-ink)]"
                  prefetch={true}
                >
                  {t("button")}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </I18nLink>
              </div></div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[36%] lg:grid-cols-1">
                <p className="border-2 border-white/20 bg-white/5 p-3 text-sm text-white/70">
                  {t("trustText")}
                </p>
                <div className="grid gap-3 text-sm font-medium text-white/70">
                  <div className="text-xs font-medium">
                    {t("features.deploy")}
                  </div>
                  <div className="text-xs font-medium">
                    {t("features.production")}
                  </div>
                  <div className="text-xs font-medium">
                    {t("features.updates")}
                  </div>
                  <div className="text-xs font-medium">
                    {t("features.i18n")}
                  </div>
                </div>
              </div></div>
        </div>
      </div>
    </section>
  );
}
