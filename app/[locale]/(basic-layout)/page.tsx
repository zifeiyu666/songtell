import HomeComponent from "@/components/home";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

const homepageKeywords = [
  "personalized song",
  "personalized songs",
  "personalized song gift",
  "custom song",
  "custom song gift",
  "song from your story",
];

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    keywords: homepageKeywords,
    locale: locale as Locale,
    path: "/",
  });
}

export default async function Home({ params }: MetadataProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Landing.FAQ" });
  const faqs = t.raw("items") as Array<{ question: string; answer: string }>;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeComponent />
    </>
  );
}
