"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      gap={12}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#151311",
          "--normal-text": "#ffbe99",
          "--normal-border": "#322e2a",
          "--success-bg": "#151311",
          "--success-border": "#245c42",
          "--success-text": "#63d296",
          "--info-bg": "#151311",
          "--info-border": "#285b86",
          "--info-text": "#69b8ef",
          "--warning-bg": "#151311",
          "--warning-border": "#76571f",
          "--warning-text": "#f0bd54",
          "--error-bg": "#151311",
          "--error-border": "#813939",
          "--error-text": "#f07979",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "!w-[min(400px,calc(100vw-32px))] !rounded-xl !border !px-5 !py-4 !shadow-[0_18px_42px_rgba(0,0,0,0.38)]",
          content: "!gap-4",
          icon: "!size-5",
          title:
            "!text-[15px] !font-semibold !leading-5 !tracking-[-0.01em] !text-[#f7f3ed]",
          description: "!mt-1 !text-sm !font-normal !leading-5 !text-[#b8b1aa]",
          closeButton:
            "!border-[#3a3530] !bg-[#1d1a18] !text-[#b8b1aa] hover:!bg-[#2a2622] hover:!text-[#f7f3ed]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
