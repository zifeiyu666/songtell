"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "@/i18n/routing";
import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
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
    <div className="public-creem-page flex flex-1 items-center justify-center py-20">
      <div className="flex flex-col space-y-6 border-[3px] border-[var(--songtell-ink)] bg-white p-7 shadow-[3px_3px_0_var(--songtell-ink)]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        <Suspense fallback={<Loader2 className="w-4 h-4 animate-spin" />}>
          <LoginForm className="w-[300px]" />
        </Suspense>
      </div>
    </div>
  );
}
