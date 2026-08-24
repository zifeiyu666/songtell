import { SiteConfig } from "@/types/siteConfig";

const DEFAULT_SITE_URL = "https://songtell.art";

function resolveBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (process.env.NODE_ENV === "production" && !configuredUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set in production.");
  }

  return configuredUrl || DEFAULT_SITE_URL;
}

export const BASE_URL = resolveBaseUrl();

const GITHUB_URL = ''
const TWITTER_URL = ''
const YOUTUBE_URL = ''
const INSTAGRAM_URL = ''
const TIKTOK_URL = ''
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL
const EMAIL_URL = 'hello@songtell.art'

export const siteConfig: SiteConfig = {
  name: "Songtell",
  tagLine: "Turn the words you cannot say into a song.",
  description: "Songtell turns a personal story into an original song you can preview, share, and keep. Create a personalized music gift for anniversaries, weddings, confessions, and gratitude.",
  url: BASE_URL,
  authors: [
    {
      name: "Songtell",
      url: BASE_URL,
    }
  ],
  creator: '@songtellart',
  socialLinks: {
    github: GITHUB_URL,
    twitter: TWITTER_URL,
    youtube: YOUTUBE_URL,
    instagram: INSTAGRAM_URL,
    tiktok: TIKTOK_URL,
    discord: DISCORD_URL,
    email: EMAIL_URL,
    // add more social links here
  },
  themeColors: 'white',
  defaultNextTheme: 'light', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // apple-touch-icon.png
  },
}
