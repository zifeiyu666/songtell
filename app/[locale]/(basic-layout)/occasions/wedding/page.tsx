import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import SongtellOccasionPage from "@/components/marketing/SongtellOccasionPage";

type Params = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({ title: "Personalized Wedding Song | Songtell", description: "Create an original wedding song for your first dance, entrance, vows, or reception from the story only you share.", locale: locale as Locale, path: "/occasions/wedding", availableLocales: ["en"] });
}
export default function WeddingPage() { return <SongtellOccasionPage kind="wedding" />; }
