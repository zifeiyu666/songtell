import { getPublicPricingPlans } from "@/actions/prices/public";
import PricingCTA from "@/components/pricing/PricingCTA";
import { type FinalSongPlayerData } from "@/components/song/FinalSongPlayer";
import { MusicVideoStudioCta } from "@/components/song/MusicVideoStudioCta";
import { type WallArtSongOption } from "@/components/song/WallArtEditorDrawer";
import { WallArtStudioCta } from "@/components/song/WallArtStudioCta";
import { DEFAULT_LOCALE } from "@/i18n/routing";
import type { UnlockSongContext } from "@/lib/ai/song-unlock-after-payment";
import { pricingPlans as pricingPlansSchema } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { PricingPlanFeature, PricingPlanLangJsonb } from "@/types/pricing";
import {
  Check,
  Download,
  Headphones,
  ImageIcon,
  RefreshCw,
  ShieldCheck,
  Video,
  X
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

type PricingPlan = typeof pricingPlansSchema.$inferSelect;

type DisplayPlan = {
  buttonText: string;
  cardDescription: string;
  cardTitle: string;
  displayPrice: string;
  features: PricingPlanFeature[];
  highlightText?: string;
  id: string;
  isHighlighted?: boolean | null;
  originalPrice?: string | null;
  paymentType?: string | null;
  priceSuffix?: string | null;
  staticCta?: string;
  tone: "single" | "pro" | "platinum";
};

type InteractiveAddOn = {
  ctaLabel: string;
  description: string;
  icon: typeof Video;
  originalPrice: string;
  promoLabel: string;
  suffix: string;
  title: string;
  trigger: "music-video" | "wall-art";
};

type StaticAddOn = {
  description: string;
  icon: typeof Video;
  originalPrice: string;
  promoLabel: string;
  suffix: string;
  title: string;
};

function isInteractiveAddOn(
  item: InteractiveAddOn | StaticAddOn,
): item is InteractiveAddOn {
  return "trigger" in item;
}

const fallbackPlans: DisplayPlan[] = [
  {
    buttonText: "Start with one song",
    cardDescription: "One song, one occasion, no subscription.",
    displayPrice: "$29.99",
    features: [
      { description: "One song only", included: true, bold: true },
      {
        description: "Personalised lyrics crafted for your occasion",
        included: true,
      },
      { description: "Personalised sharing page", included: true },
      { description: "MP3 Download", included: false },
      { description: "Video gift", included: false },
      { description: "Wall art", included: false },
    ],
    id: "fallback-single-song",
    cardTitle: "Single Song",
    paymentType: "one_time",
    priceSuffix: "one-time",
    staticCta: "One-time payment",
    tone: "single",
  },
  {
    buttonText: "Go Pro",
    cardDescription: "Monthly songs & video gifts, studio quality.",
    displayPrice: "$39.99",
    features: [
      { description: "Create 3 songs monthly", included: true, bold: true },
      { description: "2 video styles per month", included: true },
      { description: "2 wall art per month", included: true },
      { description: "Download songs in MP3 format", included: true },
      { description: "Studio-quality vocals & production", included: true },
      {
        description: "Personalised lyrics crafted for your occasion",
        included: true,
      },
      { description: "Personalised sharing page", included: true },
      { description: "Unique album artwork", included: true },
      { description: "Cancel anytime", included: true },
    ],
    highlightText: "Most Popular",
    id: "fallback-pro",
    isHighlighted: true,
    cardTitle: "Pro",
    paymentType: "recurring",
    priceSuffix: "month",
    staticCta: "Go Pro",
    tone: "pro",
  },
  {
    buttonText: "Go Platinum - Best Value",
    cardDescription: "Unlimited songs + videos. Everything in Pro, and more.",
    displayPrice: "$199.99",
    features: [
      { description: "Create Unlimited songs", included: true, bold: true },
      { description: "10 video styles per month", included: true },
      { description: "10 wall art per month", included: true },
      { description: "Download songs in MP3 format", included: true },
      { description: "Studio-quality vocals & production", included: true },
      {
        description: "Personalised lyrics crafted for your occasion",
        included: true,
      },
      { description: "Personalised sharing page", included: true },
      { description: "Unique album artwork", included: true },
    ],
    highlightText: "Best Value",
    id: "fallback-platinum",
    cardTitle: "Platinum",
    paymentType: "recurring",
    priceSuffix: "year",
    staticCta: "Go Platinum - Best Value",
    tone: "platinum",
  },
];

const addOns: Array<InteractiveAddOn | StaticAddOn> = [
  {
    description:
      "Transform your custom song into a breathtaking visual story with your own memories. ",
    ctaLabel: "Open video studio",
    icon: Video,
    originalPrice: "$23.99",
    promoLabel: "FREE ADD-ON",
    suffix: "per video",
    title: "Cinematic Lyric Video",
    trigger: "music-video",
  },
  {
    description:
      "A high-resolution digital design of your custom song lyrics. Ready to download, print, and frame",
    ctaLabel: "Open wall art studio",
    icon: ImageIcon,
    originalPrice: "$7.99",
    promoLabel: "FREE ADD-ON",
    suffix: "per print",
    title: "Digital Lyrics Wall Art",
    trigger: "wall-art",
  },
  {
    description:
      "Get a high-quality MP3 download of your custom song . Keep it offline and play it on any device forever.",
    icon: Download,
    originalPrice: "$7",
    promoLabel: "FREE ADD-ON",
    suffix: "per song",
    title: "Studio-Quality MP3",
  },
];

const trustItems = [
  {
    description: "Safe and instant verification via Creem",
    icon: ShieldCheck,
    title: "Secure Checkout",
  },
  {
    description: "Tweak your track for free until you’re completely satisfied.",
    icon: RefreshCw,
    title: "100% Satisfaction",
  },
  {
    description: "We're always here if you need a hand along the way",
    icon: Headphones,
    title: "Dedicated Support",
  },
];

export default async function PricingAll({
  isAuthenticated = false,
  musicVideoSongOptions = [],
  unlockSongContext,
  wallArtSongOptions = [],
}: {
  isAuthenticated?: boolean;
  musicVideoSongOptions?: FinalSongPlayerData[];
  unlockSongContext?: UnlockSongContext | null;
  wallArtSongOptions?: WallArtSongOption[];
} = {}) {
  const locale = await getLocale();
  const t = await getTranslations("Pricing");
  const featureList = (key: "single" | "pro" | "platinum") =>
    (t.raw(`fallbackPlans.${key}.features`) as string[]).map((description, index) => ({
      description,
      included: key === "single" ? index < 3 : true,
      bold: index === 0,
    }));
  const localizedFallbackPlans: DisplayPlan[] = [
    { ...fallbackPlans[0], cardTitle:t("fallbackPlans.single.title"), cardDescription:t("fallbackPlans.single.description"), buttonText:t("fallbackPlans.single.button"), priceSuffix:t("fallbackPlans.single.suffix"), staticCta:t("fallbackPlans.single.cta"), features:featureList("single") },
    { ...fallbackPlans[1], cardTitle:t("fallbackPlans.pro.title"), cardDescription:t("fallbackPlans.pro.description"), buttonText:t("fallbackPlans.pro.button"), priceSuffix:t("fallbackPlans.pro.suffix"), staticCta:t("fallbackPlans.pro.cta"), highlightText:t("fallbackPlans.pro.highlight"), features:featureList("pro") },
    { ...fallbackPlans[2], cardTitle:t("fallbackPlans.platinum.title"), cardDescription:t("fallbackPlans.platinum.description"), buttonText:t("fallbackPlans.platinum.button"), priceSuffix:t("fallbackPlans.platinum.suffix"), staticCta:t("fallbackPlans.platinum.cta"), highlightText:t("fallbackPlans.platinum.highlight"), features:featureList("platinum") },
  ];
  const localizedAddOns: Array<InteractiveAddOn | StaticAddOn> = [
    { ...addOns[0], title:t("addOns.video.title"), description:t("addOns.video.description"), ctaLabel:t("addOns.video.cta"), suffix:t("addOns.video.suffix"), promoLabel:t("addOns.video.promo") } as InteractiveAddOn,
    { ...addOns[1], title:t("addOns.wallArt.title"), description:t("addOns.wallArt.description"), ctaLabel:t("addOns.wallArt.cta"), suffix:t("addOns.wallArt.suffix"), promoLabel:t("addOns.wallArt.promo") } as InteractiveAddOn,
    { ...addOns[2], title:t("addOns.mp3.title"), description:t("addOns.mp3.description"), suffix:t("addOns.mp3.suffix"), promoLabel:t("addOns.mp3.promo") },
  ];
  const localizedTrustItems = [
    { ...trustItems[0], title:t("trust.checkout.title"), description:t("trust.checkout.description") },
    { ...trustItems[1], title:t("trust.satisfaction.title"), description:t("trust.satisfaction.description") },
    { ...trustItems[2], title:t("trust.support.title"), description:t("trust.support.description") },
  ];
  const result = await getPublicPricingPlans();
  const dbPlans = result.success ? result.data || [] : [];

  if (process.env.NODE_ENV !== "production" && locale === "ja") {
    for (const plan of dbPlans) {
      if (!(plan.langJsonb as PricingPlanLangJsonb)?.ja) {
        console.warn(`[pricing] Missing langJsonb.ja for public plan ${plan.id}`);
      }
    }
  }

  if (!result.success) {
    console.error("Failed to fetch public pricing plans:", result.error);
  }

  const displayPlans = dbPlans.length
    ? dbPlans.slice(0, 3).map((plan, index) =>
        toDisplayPlan(plan, locale, index)
      )
    : localizedFallbackPlans;

  return (
    <section id="pricing" className="bg-[#fff8e9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 py-6 lg:grid-cols-3 lg:items-stretch lg:py-8">
          {displayPlans.map((plan, index) => (
            <PricingGiftCard
              isFeatured={index === 1}
              key={plan.id}
              notIncludedLabel={t("notIncluded")}
              plan={plan}
              unlockSongContext={unlockSongContext}
            />
          ))}
        </div>

        <section className="mt-14 border-2 border-black bg-white px-4 py-10 shadow-[5px_5px_0_#000] sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center border-2 border-black bg-[#ffdc56] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-black">
              {t("promotion.badge")}
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-black sm:text-4xl md:text-5xl">
              {t("promotion.title")} <span className="text-[#c75326]">{t("promotion.titleAccent")}</span>
            </h2>
            <p className="mt-3 text-lg font-bold text-black sm:text-xl">
              {t("promotion.lead")}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/65 sm:text-base">
              {t("promotion.description")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {localizedAddOns.map((item) => {
              const Icon = item.icon;
              const hasOverlayCta = isInteractiveAddOn(item);

              return (
                <article
                  className="group relative cursor-pointer overflow-hidden border-2 border-black bg-[#fffdf7] p-6 shadow-[4px_4px_0_#000] transition-transform duration-200 hover:-translate-y-1"
                  key={item.title}
                >
                  {hasOverlayCta && (
                    <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center bg-[linear-gradient(180deg,rgba(255,253,247,0)_0%,rgba(255,253,247,0.86)_45%,#fffdf7_100%)] px-5 pb-6 pt-16 opacity-100 transition duration-300 sm:px-6 sm:pb-7 sm:pt-20 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                      <div className="pointer-events-auto flex w-full justify-center sm:translate-y-3 sm:transition sm:duration-300 sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
                        {item.trigger === "music-video" ? (
                          <MusicVideoStudioCta
                            className="inline-flex h-12 w-full items-center justify-center gap-2 border-2 border-black bg-[#ffdc56] px-4 text-base font-normal text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#ffe578] hover:shadow-[2px_2px_0_#000]"
                            isAuthenticated={isAuthenticated}
                            label={item.ctaLabel}
                            songOptions={musicVideoSongOptions}
                          />
                        ) : (
                          <WallArtStudioCta
                            className="inline-flex h-12 w-full items-center justify-center gap-2 border-2 border-black bg-[#ffdc56] px-4 text-base font-normal text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#ffe578] hover:shadow-[2px_2px_0_#000]"
                            isAuthenticated={isAuthenticated}
                            label={item.ctaLabel}
                            songOptions={wallArtSongOptions}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute right-[-3.5rem] top-6 z-10 rotate-45 bg-[#ffdc56] px-14 py-2 text-sm font-black uppercase tracking-[0.08em] text-black">
                    {t("promotion.freeNow")}
                  </div>

                  <div className="mb-6 flex size-12 items-center justify-center border-2 border-black bg-[#ffdc56] text-black transition-transform duration-200 group-hover:rotate-6">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="pr-16 text-2xl font-black leading-tight text-black">
                    {item.title}
                  </h3>
                  <p className="mt-4 min-h-24 text-base leading-7 text-black/65">
                    {item.description}
                  </p>

                  <div className="mt-8 border-t-2 border-black pt-5">
                    <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                      <span className="text-xl font-black tracking-normal text-black/45 line-through">
                        {t("promotion.from")} {item.originalPrice}
                      </span>
                      <span className="text-4xl font-black leading-none tracking-normal text-black">
                        $0
                      </span>
                      <span className="pb-1 text-sm font-bold text-black">
                        {item.suffix}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.08em] text-[#c75326]">
                      ({item.promoLabel})
                    </p>
                    <div className="mt-4 h-2 w-full border-2 border-black bg-white">
                      <div className="h-full w-2/3 bg-[#ffdc56] transition-all duration-500 group-hover:w-full" />
                    </div>
                    {hasOverlayCta ? (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-black/55">
                        {t("promotion.interactiveHint")}
                      </p>
                    ) : (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-black/55">
                        {t("promotion.automaticHint")}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-0 border-2 border-black bg-white sm:grid-cols-3">
          {localizedTrustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="group cursor-pointer border-b-2 border-black px-5 py-5 transition-colors duration-200 hover:bg-[#ffdc56] sm:border-b-0 sm:border-r-2 last:sm:border-r-0"
                key={item.title}
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 size-5 shrink-0 text-black transition-transform duration-200 group-hover:scale-110" />
                  <div>
                    <h3 className="text-sm font-black text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-black/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
}

function toDisplayPlan(
  plan: PricingPlan,
  locale: string,
  index: number
): DisplayPlan & { rawPlan: PricingPlan } {
  const localized =
    (plan.langJsonb as PricingPlanLangJsonb)?.[locale] ||
    (plan.langJsonb as PricingPlanLangJsonb)?.[DEFAULT_LOCALE];
  const fallbackTone = index === 0 ? "single" : index === 1 ? "pro" : "platinum";
  const planFeatures = Array.isArray(plan.features)
    ? (plan.features as PricingPlanFeature[])
    : [];

  return {
    buttonText: localized?.buttonText || plan.buttonText || "Get started",
    cardDescription:
      localized?.cardDescription || plan.cardDescription || "",
    cardTitle: localized?.cardTitle || plan.cardTitle || "Plan",
    displayPrice: localized?.displayPrice || plan.displayPrice || "",
    features: localized?.features || planFeatures,
    highlightText: localized?.highlightText || plan.highlightText || undefined,
    id: plan.id,
    isHighlighted: plan.isHighlighted,
    originalPrice: localized?.originalPrice || plan.originalPrice,
    paymentType: plan.paymentType,
    priceSuffix:
      localized?.priceSuffix?.replace(/^\/+/, "") ||
      plan.priceSuffix?.replace(/^\/+/, ""),
    rawPlan: plan,
    tone: plan.isHighlighted ? "pro" : fallbackTone,
  };
}

function PricingGiftCard({
  isFeatured = false,
  notIncludedLabel,
  plan,
  unlockSongContext,
}: {
  isFeatured?: boolean;
  notIncludedLabel: string;
  plan: DisplayPlan & { rawPlan?: PricingPlan };
  unlockSongContext?: UnlockSongContext | null;
}) {
  const isPro = isFeatured || plan.tone === "pro";
  const isPlatinum = plan.tone === "platinum";
  const includedFeatures = plan.features.filter((feature) => feature.included);
  const excludedFeatures = plan.features.filter((feature) => !feature.included);

  return (
    <article
      style={{ backgroundColor: isPro ? "#ffdc56" : "#fffdf7" }}
      className={cn(
        "relative flex min-h-[520px] cursor-pointer flex-col border-2 border-black p-5 shadow-[4px_4px_0_#000] transition-transform duration-200 hover:-translate-y-1 sm:p-6",
        isPro
          ? "z-10 text-black lg:-my-5 lg:min-h-[568px] lg:py-7"
          : isPlatinum
            ? "text-black"
            : "text-black"
      )}
    >
      {plan.highlightText && (
        <div
          className={cn(
            "absolute left-6 top-6 border-2 border-black bg-black px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-white",
            isPro
              ? "bg-black text-white"
              : "bg-[#c75326] text-white"
          )}
        >
          {plan.highlightText}
        </div>
      )}

      <p
        className={cn(
          "text-xs font-black uppercase tracking-[0.12em] text-black/55",
          plan.highlightText && "mt-11"
        )}
      >
        {plan.cardTitle}
      </p>
      <h3
        className={cn(
          "mt-3 min-h-20 text-2xl font-black leading-tight text-black"
        )}
      >
        {plan.cardDescription}
      </h3>

      <div
        className={cn(
          "my-5 border-t-2 border-black"
        )}
      />

      <div>
        <div className="flex items-end gap-2">
          <span
            className={cn(
              "text-4xl font-black tracking-normal text-black"
            )}
          >
            {plan.displayPrice}
          </span>
          {plan.originalPrice && (
            <span
              className={cn(
                "pb-1 text-sm font-semibold text-black/45 line-through"
              )}
            >
              {plan.originalPrice}
            </span>
          )}
          {plan.priceSuffix && (
            <span
              className={cn(
                "ml-1 text-xs font-bold text-black/60"
              )}
            >
              / {plan.priceSuffix}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "my-5 border-t-2 border-black"
        )}
      />

      {plan.staticCta && (
        <span
          className={cn(
            "mb-5 inline-flex w-fit border-2 border-black bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-black",
            isPro
              ? "bg-black text-white"
              : "bg-white text-black"
          )}
        >
          {plan.staticCta}
        </span>
      )}

      <ul className="space-y-3">
        {includedFeatures.map((feature, index) => (
          <FeatureLine
            feature={feature}
            isPro={isPro}
            key={`${feature.description}-${index}`}
          />
        ))}
      </ul>

      {excludedFeatures.length > 0 && (
        <div className="mt-5 border-t-2 border-black pt-4">
          <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-black/55">
          {notIncludedLabel}
          </p>
          <ul className="space-y-2.5">
            {excludedFeatures.map((feature, index) => (
              <FeatureLine
                feature={feature}
                isExcluded
                isPro={isPro}
                key={`${feature.description}-${index}`}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-6">
        {plan.rawPlan ? (
          <PricingCTA
            buttonClassName={cn(
              "h-10 border-2 border-black text-sm font-black shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#000]",
              isPro
                ? "bg-black text-white hover:bg-black/85"
                : isPlatinum
                  ? "bg-[#ffdc56] text-black hover:bg-[#ffe578]"
                  : "bg-[#ffdc56] text-black hover:bg-[#ffe578]"
            )}
            localizedPlan={{
              buttonText: plan.buttonText,
            }}
            plan={plan.rawPlan}
            unlockSongContext={unlockSongContext}
          />
        ) : (
          <button
            className={cn(
              "inline-flex h-10 w-full items-center justify-center border-2 border-black bg-[#ffdc56] text-sm font-black text-black shadow-[3px_3px_0_#000]",
              isPro
                ? "bg-black text-white"
                : "bg-[#ffdc56] text-black"
            )}
            type="button"
          >
            {plan.buttonText}
          </button>
        )}
      </div>
    </article>
  );
}

function FeatureLine({
  feature,
  isExcluded = false,
  isPro,
}: {
  feature: PricingPlanFeature;
  isExcluded?: boolean;
  isPro: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-start gap-2.5 text-sm font-medium leading-5",
        isExcluded
          ? "text-black/40 line-through"
          : isPro
            ? "text-black"
            : "text-black"
      )}
    >
      {isExcluded ? (
        <X className="mt-0.5 size-4 shrink-0 text-black/40" />
      ) : (
        <Check
          className={cn(
            "mt-0.5 size-4 shrink-0",
            "text-black"
          )}
        />
      )}
      <span className={feature.bold ? "font-black" : ""}>
        {feature.description}
      </span>
    </li>
  );
}
