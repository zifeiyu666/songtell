"use client";

type HeaderShellProps = {
  children: React.ReactNode;
};

export default function HeaderShell({ children }: HeaderShellProps) {
  return (
    <header className="group/header pointer-events-none fixed inset-x-0 top-0 z-50 w-full bg-transparent px-3 pt-3 text-[var(--songtell-ink)] sm:px-5 sm:pt-4">
      {children}
    </header>
  );
}
