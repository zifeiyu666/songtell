import SongtellOccasionPage from "@/components/marketing/SongtellOccasionPage";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({ title: "Custom Anniversary Song | Songtell", description: "Turn your shared memories into a custom anniversary song with original lyrics, a melody, and a playable page to keep.", locale: locale as Locale, path: "/occasions/anniversary", availableLocales: ["en"] });
}
export default function AnniversaryPage() { return <SongtellOccasionPage kind="anniversary" />; }
