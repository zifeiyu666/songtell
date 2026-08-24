import { gasoekOne } from "@/app/fonts";
import {
  HeaderActionText,
  headerActionButtonClassName,
} from "@/components/header/HeaderActionText";
import HeaderLinks from "@/components/header/HeaderLinks";
import HeaderShell from "@/components/header/HeaderShell";
import MobileMenu from "@/components/header/MobileMenu";
import { UserAvatar } from "@/components/header/UserAvatar";
import { Button } from "@/components/ui/button";
import { Link as I18nLink } from "@/i18n/routing";
import { getSession } from "@/lib/auth/server";
import { getHeaderNavigationLinks } from "@/lib/cms/article-navigation";
import { user as userSchema } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
type User = typeof userSchema.$inferSelect;

const Header = async () => {
  const locale = await getLocale();
  const [t, headerT, session, headerLinks] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Header"),
    getSession(),
    getHeaderNavigationLinks(locale),
  ]);
  const user = session?.user;

  return (
    <HeaderShell>
      <nav className="pointer-events-auto relative mx-auto flex max-w-[calc(100%-2rem)] items-center justify-between rounded-[24px] border-[3px] border-[var(--songtell-ink)] bg-white px-4 py-2 shadow-[3px_3px_0_var(--songtell-ink)] sm:max-w-[calc(100%-3rem)] sm:px-6 lg:max-w-8xl">
        <I18nLink
          href="/"
          title={t("title")}
          prefetch={true}
          className="absolute left-1/2 flex -translate-x-1/2 items-center space-x-1 lg:static lg:translate-x-0"
        >
          <Image
            src="/logo.png"
            alt=""
            width={202}
            height={144}
            priority
            className="mt-[-6px] h-9 w-[50px] object-contain"
          />
          <span
            className={cn(
              gasoekOne.className,
              "text-[20px] leading-none tracking-wide text-[var(--songtell-ink)]"
            )}
          >
            Songtell
          </span>
        </I18nLink>

        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <HeaderLinks links={headerLinks} variant="adaptive" />
        </div>

        <div className="flex items-center gap-x-2 flex-1 justify-end">
          {/* PC */}
          <div className="hidden lg:flex items-center gap-x-2">
            <Button
              asChild
              className={`${headerActionButtonClassName} songtell-lift-button bg-[var(--songtell-theme)] text-[var(--songtell-ink)]`}
            >
              <I18nLink href="/create-song">
                <HeaderActionText icon={<Music2 className="h-3.5 w-3.5" />}>
                  {headerT("createSong")}
                </HeaderActionText>
              </I18nLink>
            </Button>
            <UserAvatar user={user as User} />
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-x-2">
            <MobileMenu
              links={headerLinks}
              user={user as User}
              variant="adaptive"
            />
          </div>
        </div>
      </nav>
    </HeaderShell>
  );
};

export default Header;
