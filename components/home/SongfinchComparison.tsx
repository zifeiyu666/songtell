import { Check, ChevronLeft, ChevronRight, Crown, X } from "lucide-react";
import { useTranslations } from "next-intl";

type ComparisonRow = {
  feature: string;
  songfinch: string;
  us: string;
};

export default function SongfinchComparison() {
  const t = useTranslations("Landing.SongfinchComparison");
  const rows = t.raw("rows") as ComparisonRow[];

  return (
    <section
      id="songfinch-comparison"
      className="relative overflow-hidden bg-[var(--songtell-purple)] px-4 py-20 text-[var(--songtell-ink)] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-20 [background-image:linear-gradient(135deg,transparent_25%,var(--songtell-ink)_25%,var(--songtell-ink)_27%,transparent_27%,transparent_50%,var(--songtell-ink)_50%,var(--songtell-ink)_52%,transparent_52%,transparent_75%,var(--songtell-ink)_75%,var(--songtell-ink)_77%,transparent_77%)] [background-size:42px_42px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl leading-[0.98] tracking-[0.02em] sm:text-6xl">
            {t.rich("title", {
              us: (chunks) => <span>{chunks}</span>,
              vs: (chunks) => (
                <span className="mx-2 inline-block text-[var(--songtell-ink)]/55 sm:mx-3">
                  {chunks}
                </span>
              ),
              songfinch: (chunks) => <span>{chunks}</span>,
            })}
          </h2>
          <div className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--songtell-ink)]/75 sm:text-lg">
            {t.rich("subtitle", {
              strong: (chunks) => (
                <strong className="font-black text-[var(--songtell-ink)]">
                  {chunks}
                </strong>
              ),
              price: (chunks) => <span className="font-black">{chunks}</span>,
              underline: (chunks) => (
                <span className="font-black underline decoration-2 underline-offset-4">
                  {chunks}
                </span>
              ),
            })}
          </div>
        </div>

        <div className="mt-12 overflow-visible border-[3px] border-[var(--songtell-ink)] bg-white shadow-[4px_4px_0_var(--songtell-ink)] sm:mt-16">
          <div className="grid grid-cols-1 border-b-[3px] border-[var(--songtell-ink)] md:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]">
            <div className="flex items-center justify-center bg-[#e6e5e3] px-5 py-5 text-center text-xl font-black sm:text-2xl md:justify-start md:text-left">
              <span>{t("tableHeaders.songfinch")}</span>
            </div>
            <div className="flex items-center justify-center border-y-[3px] border-[var(--songtell-ink)] bg-white px-4 py-5 text-center text-xs font-black uppercase tracking-[0.14em] md:border-x-[3px] md:border-y-0">
              <span className="inline-flex items-center gap-2">
                <ChevronLeft className="size-4" />
                {t("tableHeaders.feature")}
                <ChevronRight className="size-4" />
              </span>
            </div>
            <div className="relative flex items-center justify-center bg-[#23c5a4] px-5 py-5 text-center text-xl font-black sm:text-2xl md:justify-start md:text-left">
              <Crown
                aria-hidden="true"
                className="absolute -top-5 left-1/2 size-9 -translate-x-1/2 -rotate-6 fill-[var(--songtell-theme)] text-[var(--songtell-ink)] sm:-top-6 sm:size-11"
              />
              <span>{t("tableHeaders.us")}</span>
            </div>
          </div>

          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-1 border-b-[3px] border-[var(--songtell-ink)] last:border-b-0 md:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]"
            >
              <div className="flex items-start gap-4 bg-[#f1f0ee] px-5 py-6 sm:px-7">
                <X
                  aria-hidden="true"
                  className="mt-0.5 size-8 shrink-0 stroke-[3] text-[#ed9f79]"
                />
                <p className="text-sm font-medium leading-6 sm:text-base">
                  {row.songfinch}
                </p>
              </div>
              <div className="flex items-center justify-center border-y-[3px] border-dashed border-[var(--songtell-ink)] bg-white px-4 py-4 text-center md:border-x-[3px] md:border-y-0">
                <span className="text-base font-black sm:text-lg">
                  {row.feature}
                </span>
              </div>
              <div className="flex items-start gap-4 bg-[#e9fff9] px-5 py-6 sm:px-7">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-8 shrink-0 stroke-[3] text-[#50c96f]"
                />
                <p className="text-sm font-medium leading-6 sm:text-base">
                  {row.us}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
