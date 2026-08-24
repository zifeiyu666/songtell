"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";

export function BlogPostCTA() {
  return (
    <section className="mt-14 border-t border-[#e4ded8] pt-10">
      <p className="text-xl font-medium leading-8 text-black sm:text-xl">
        Ready to turn your story into a song?
      </p>
      <MagneticButton
        href="/create-song"
        size="sm"
        magneticRange={110}
        strength={0.22}
        contentStrength={0.12}
        trailingArrow
        className="mt-5 min-w-[180px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] px-7 text-sm font-bold text-[var(--songtell-ink)] shadow-[3px_3px_0_var(--songtell-ink)] hover:-translate-y-0.5 hover:border-[var(--songtell-ink)] hover:bg-[var(--songtell-theme)] hover:text-[var(--songtell-ink)] sm:min-w-[200px]"
      >
        <span>Create with Songtell</span>
      </MagneticButton>
    </section>
  );
}
