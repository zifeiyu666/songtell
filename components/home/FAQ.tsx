"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  title?: string;
  description?: string;
  items?: FAQItem[];
  ctaTitle?: string;
  ctaDescription?: ReactNode;
  ctaButtonLabel?: string;
  ctaHref?: string;
};

export default function FAQ({
  title,
  description,
  items,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaHref = "/create-song",
}: FAQProps) {
  const t = useTranslations("Landing.FAQ");
  const cta = useTranslations("Landing.CTA");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs: FAQItem[] = items ?? t.raw("items");
  const headingTitle = title ?? t("title");
  const headingDescription = description ?? t("description");
  const cardButtonLabel = ctaButtonLabel ?? cta("button");

  return (
    <section className="home-section-muted border-t-[3px] border-[var(--songtell-ink)] py-20 text-[var(--songtell-ink)] sm:py-24">
      <div className="home-container grid grid-cols-[0.78fr_1.22fr] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div data-testid="faq-section-heading">
          <p className="home-eyebrow">FAQ</p>
          <h2 className="home-title max-w-sm">{headingTitle}</h2>
          <span className="mt-5 block h-1 w-24 bg-[var(--songtell-theme)]" />
          <p className="home-description mt-5 max-w-sm">{headingDescription}</p>
          <div className="mt-12 border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] p-6 shadow-[3px_3px_0_var(--songtell-ink)]">
            <h3 className="font-display text-2xl tracking-[.02em]">Need more help?</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--songtell-ink)]/75">{ctaDescription ?? cta.rich("description", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <MagneticButton href={ctaHref} size="sm" trailingArrow className="mt-6 w-full justify-center border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-ink)] px-5 text-center text-sm font-bold text-white shadow-[2px_2px_0_var(--songtell-ink)] hover:bg-[var(--songtell-ink)]">{cardButtonLabel}</MagneticButton>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            {faqs.map((item) => {
              const isOpen = openItem === item.question;
              const Icon = isOpen ? ChevronUp : ChevronDown;

              return (
                <div key={item.question} className={`border-[3px] border-[var(--songtell-ink)] p-5 shadow-[3px_3px_0_var(--songtell-ink)] transition-colors ${isOpen ? "bg-[var(--songtell-purple)]" : "bg-white"}`}>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-3 text-left text-base font-semibold leading-6 text-[var(--songtell-ink)]"
                    aria-expanded={isOpen}
                    onClick={() => setOpenItem(isOpen ? null : item.question)}
                  >
                    <span>{item.question}</span>
                    <Icon className="size-5 shrink-0 text-[var(--songtell-ink)]" />
                  </button>

                  {isOpen && (
                    <p className="mt-4 border-t-2 border-[var(--songtell-ink)]/30 pt-4 text-sm leading-6 text-[var(--songtell-ink)]/80">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
