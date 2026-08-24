"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "@/i18n/routing";
import { authClient } from "@/lib/auth/auth-client";
import { Heart, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const t = useTranslations("Login");

  useEffect(() => {
    if (session?.user) {
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next || "/");
    }
  }, [router, session?.user]);

  if (session?.user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <main className="public-creem-page relative flex flex-1 items-center justify-center overflow-hidden bg-[var(--songtell-purple)] px-4 py-10 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute -left-18 top-24 hidden h-44 w-44 rotate-12 border-[3px] border-[var(--songtell-ink)] bg-[var(--songtell-theme)] lg:block" />
      <div className="pointer-events-none absolute -right-22 bottom-20 hidden h-56 w-56 -rotate-12 rounded-full border-[3px] border-[var(--songtell-ink)] bg-[#ffef86] lg:block" />

      <section className="relative z-10 w-full max-w-[520px] border-[3px] border-[var(--songtell-ink)] bg-[#fffdfa] p-6 shadow-[6px_6px_0_var(--songtell-ink)] sm:p-10">
        <div className="mb-8 flex items-center justify-between border-b-2 border-[var(--songtell-ink)] pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] sm:text-sm">
            <Heart className="size-4 fill-[var(--songtell-theme)]" aria-hidden="true" />
            Songtell AI
          </div>
          <Sparkles className="size-5 text-[#8f7de5]" aria-hidden="true" />
        </div>

        <div className="flex flex-col space-y-3 text-center">
          <h1 className="font-display text-4xl leading-none tracking-normal sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-base leading-6 text-[#665f5a] sm:text-lg">
            {t("description")}
          </p>
        </div>

        <Suspense fallback={<Loader2 className="mx-auto mt-10 size-5 animate-spin" />}>
          <LoginForm className="mt-9 w-full" />
        </Suspense>
      </section>
    </main>
  );
}
