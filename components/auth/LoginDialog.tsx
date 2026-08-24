"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callbackPath?: string;
}

export default function LoginDialog({
  open,
  onOpenChange,
  callbackPath,
}: LoginDialogProps) {
  const t = useTranslations("Login");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="creem-login-dialog max-h-[calc(100dvh-2rem)] gap-7 overflow-y-auto border-[3px] border-[var(--songtell-ink)] bg-[#fffdfa] p-6 text-[var(--songtell-ink)] shadow-[5px_5px_0_var(--songtell-ink)] sm:max-w-[520px] sm:p-10">
        <DialogHeader className="gap-3 text-center sm:text-center">
          <DialogTitle className="font-display text-3xl leading-none tracking-normal sm:text-4xl">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-[#665f5a] sm:text-lg">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <Suspense fallback={null}>
          <LoginForm callbackPath={callbackPath} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
