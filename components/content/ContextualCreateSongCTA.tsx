import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = { occasion?: string; genre?: string; title?: string; description?: string };

export function ContextualCreateSongCTA({ occasion = "wedding", genre = "acoustic", title = "Give them the song only your story could create.", description = "Start with a memory, a name, or the words you have never quite found a way to say." }: Props) {
  const href = `/create-song?occasion=${encodeURIComponent(occasion)}&genre=${encodeURIComponent(genre)}`;
  return <section className="my-12 border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-section-purple)] p-6 text-[var(--songtell-ink)] shadow-[3px_3px_0_var(--songtell-ink)] sm:p-9"><div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em]">Make it yours</p><h2 className="mt-3 max-w-xl font-display text-3xl leading-tight tracking-[.02em] sm:text-4xl">{title}</h2><p className="mt-3 max-w-xl leading-7 text-[var(--songtell-ink)]/75">{description}</p></div><Link href={href} className="inline-flex items-center justify-center gap-2 border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] px-5 py-3 text-sm font-bold text-[var(--songtell-ink)] shadow-[3px_3px_0_var(--songtell-ink)] transition-transform hover:-translate-y-0.5">Create your song <ArrowRight className="size-4" /></Link></div></section>;
}
