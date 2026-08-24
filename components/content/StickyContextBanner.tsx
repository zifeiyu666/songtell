"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

export function StickyContextBanner({ text, occasion = "wedding", genre = "edm" }: { text: string; occasion?: string; genre?: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <div className="sticky top-0 z-30 border-b-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] px-4 py-3 text-[var(--songtell-ink)] shadow-[0_3px_0_var(--songtell-ink)]"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3 text-sm"><p className="font-semibold">{text}</p><div className="flex shrink-0 items-center gap-3"><Link href={`/create-song?occasion=${occasion}&genre=${genre}`} className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[.1em] sm:inline-flex">Create yours <ArrowRight className="size-3.5" /></Link><button type="button" aria-label="Dismiss banner" onClick={() => setVisible(false)}><X className="size-4" /></button></div></div></div>;
}
