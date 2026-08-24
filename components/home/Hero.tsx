import StructuredSongBrief from "@/components/home/StructuredSongBrief";
import WaveDivider from "@/components/home/WaveDivider";
import { Highlighter } from "@/components/ui/highlighter";
import { CheckCircle2, MessageCircleHeart } from "lucide-react";
import { useTranslations } from "next-intl";

const statusSteps = [
  ["01", "Story", "Share the details only you know."],
  ["02", "Lyrics", "Shape the words before you unlock."],
  ["03", "Preview", "Hear an original song in minutes."],
  ["04", "Share", "Open a playable memory they can keep."],
] as const;

export default function Hero() {
  const t = useTranslations("Landing.Hero");
  const descriptionHtml = t.raw("description") as string;
  const trustItems = t.raw("trustItems") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-[var(--songtell-purple)] text-[var(--songtell-ink)]">
      <div className="home-container relative flex min-h-[min(850px,100dvh)] flex-col items-center justify-center px-4 pb-14 pt-28 text-center sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="mb-5 inline-flex items-center gap-2 rounded-md border-[3px] border-[var(--songtell-ink)] bg-white px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--songtell-ink)] shadow-[4px_4px_0_var(--songtell-ink)]">
          <MessageCircleHeart className="size-4" aria-hidden="true" />
          <span>Songtell AI · Personal songs from real stories</span>
        </div>
        <div className="max-w-4xl">
          <h1 className="text-balance font-display text-[clamp(2.4rem,6vw,5.25rem)] font-normal leading-[0.98] tracking-[0.01em] text-[var(--songtell-ink)]">
            <span className="block">{t("titleLine")}</span>
            <span className="block pb-2 text-[var(--songtell-ink)] sm:pb-3">
              <Highlighter action="underline" color="#F5C19E" strokeWidth={4} padding={1} iterations={2} roughness={1.5} animationDuration={700}>{t("titleAccent")}</Highlighter>
            </span>
          </h1>
          <div className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--songtell-muted)] sm:text-lg" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
        <div className="relative mt-9 w-full max-w-[58rem] text-left sm:mt-11">
          <div className="absolute -top-3 left-4 z-20 rounded-sm bg-[var(--songtell-ink)] px-2.5 py-1 font-['Bradley_Hand','Comic_Sans_MS',cursive] text-sm text-white shadow-sm sm:left-7">{t("inputLabel")}</div>
          <StructuredSongBrief />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--songtell-muted)]">
          {trustItems.map((item) => <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-[var(--songtell-blue)]" />{item}</span>)}
        </div>
        <div className="mt-12 grid w-full max-w-5xl grid-cols-2 border-[3px] border-[var(--songtell-ink)] bg-white/70 shadow-[4px_4px_0_var(--songtell-ink)] sm:grid-cols-4">
          {statusSteps.map(([number, title, description], index) => (
            <div key={title} className="relative min-h-[118px] border-[var(--songtell-line)] p-4 text-left sm:min-h-[132px] sm:p-5">
              {index < statusSteps.length - 1 && <span className="absolute right-0 top-7 hidden h-px w-5 bg-[var(--songtell-line)] sm:block" aria-hidden="true" />}
              <span className="text-xs font-semibold text-[var(--songtell-blue)]">{number}</span>
              <h2 className="mt-4 text-sm font-bold text-[var(--songtell-ink)] sm:text-base">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--songtell-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <WaveDivider fill="var(--songtell-paper)" />
    </section>
  );
}
