import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const stepKeys = ["story", "preview", "gift", "deliver"] as const;

const richTextComponents = {
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};

export default function HowItWorks() {
  const t = useTranslations("Landing.HowItWorks");
  const steps = stepKeys.map((stepKey, index) => ({
    kicker: String(index + 1).padStart(2, "0"),
    title: t(`steps.${stepKey}.title`),
    description: t.rich(`steps.${stepKey}.description`, richTextComponents),
  }));

  return (
    <HowItWorksSection
      sectionClassName="home-section-muted isolate"
      containerClassName="max-w-7xl px-4 sm:px-6 lg:px-8"
      eyebrowClassName="home-eyebrow"
      titleClassName="home-title"
      descriptionClassName="home-description [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-[#2b1710]"
      cardClassName="min-h-52 text-center sm:min-h-56"
      kickerClassName="rounded-md bg-[var(--songtell-blue)] text-white"
      stepTitleClassName="text-[var(--songtell-ink)]"
      stepDescriptionClassName="text-sm leading-7 text-[var(--songtell-muted)] [&_strong]:font-semibold [&_strong]:text-inherit"
      mobileCarousel
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={
        <div data-how-it-works-description>
          {t.rich("description", richTextComponents)}
        </div>
      }
      steps={steps}
      backgroundSlot={
        <div
          aria-hidden="true"
          data-how-it-works-geometry
          className="pointer-events-none absolute inset-0 -z-10"
        >
        </div>
      }
    />
  );
}
