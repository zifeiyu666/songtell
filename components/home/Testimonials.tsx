"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { isTestimonialsEnabled } from "@/config/features";

export type TestimonialItem = {
  badge: string;
  quote: string;
  author: string;
  avatar?: string;
  cardClassName?: string;
};

const testimonials: TestimonialItem[] = [
  {
    badge: "🌙 Anniversary evening",
    quote:
      "I turned the little details from our first apartment into a soft late-night ballad. It felt personal without being overdone.",
    author: "Maya R. · Portland",
    avatar: "/avatar/avatar7.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "🎈 Birthday toast",
    quote:
      "My sister and I added the phrases our dad always says. The preview gave us a gift we could actually share together.",
    author: "Jonah K. · Manchester",
    avatar: "/avatar/avatar4.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "✨ First dance",
    quote:
      "We built the song around our road-trip stops and a tiny inside joke. Hearing it at the reception made the room feel like ours.",
    author: "Nora & Elias · Toronto",
    avatar: "/avatar/avatar2.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "✈️ Across the miles",
    quote:
      "I sent it before a long flight so my partner could listen on the train home. The lyrics held all the ordinary moments I was missing.",
    author: "Theo S. · Dublin",
    avatar: "/avatar/avatar6.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "👵 Grandmother's story",
    quote:
      "We collected memories from three generations and shaped them into one gentle folk song. She kept asking to hear it again.",
    author: "Clara V. · Melbourne",
    avatar: "/avatar/avatar3.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "🚀 Same-day surprise",
    quote:
      "I had a story, a mood, and an idea before lunch. By dinner I had a private song page ready to share with a note.",
    author: "Priya N. · Austin",
    avatar: "/avatar/avatar1.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "🎸 Indie birthday mix",
    quote:
      "I described the tiny record shop where we met and picked an indie groove. The result sounded like a memory with a chorus.",
    author: "Camila D. · Barcelona",
    avatar: "/avatar/avatar5.jpg",
    cardClassName: "bg-white",
  },
  {
    badge: "🤍 Vow renewal",
    quote:
      "We used a few lines from our original vows and gave them a new melody for our tenth year. It made the renewal feel entirely new.",
    author: "Hannah & Leo · Wellington",
    avatar: "/avatar/avatar8.jpg",
    cardClassName: "bg-white",
  },
];

const BASE_MARQUEE_DURATION = 48;

const RatingStars = () => {
  return (
    <div className="flex shrink-0 items-center gap-0.5 text-primary">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
  return (
    <li className="w-[260px] shrink-0 snap-center list-none sm:w-[300px] lg:w-[340px]">
      <figure
        className={`home-card home-card-hover flex h-full transform-gpu flex-col p-5 sm:p-6 ${testimonial.cardClassName ?? "bg-white"}`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <RatingStars />
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#f8f2ee] px-2.5 py-1 text-[11px] font-medium leading-none text-[#6f625c]">
              {testimonial.badge}
            </span>
          </div>
          <blockquote className="text-sm font-medium leading-6 text-[#3f332c] sm:text-[15px]">
            “{testimonial.quote}”
          </blockquote>
        </div>
        <figcaption className="flex items-center gap-2.5 pt-6">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              width={40}
              height={40}
              sizes="40px"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#f8f2ee]"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
              {testimonial.author.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-[#2b1710]">
              {testimonial.author}
            </p>
            <p className="text-xs text-[#6f625c]">{testimonial.badge}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

type TestimonialsProps = {
  title?: string;
  description?: string;
  items?: TestimonialItem[];
  contentWidthClassName?: string;
};

export default function Testimonials({
  ...props
}: TestimonialsProps) {
  if (!isTestimonialsEnabled) return null;

  return <TestimonialsContent {...props} />;
}

function TestimonialsContent({
  title,
  description,
  items,
  contentWidthClassName = "max-w-7xl",
}: TestimonialsProps) {
  const t = useTranslations("Landing.Testimonials");
  const sectionTestimonials = items ?? testimonials;
  const marqueeTestimonials = [...sectionTestimonials, ...sectionTestimonials];
  const marqueeRef = useRef<HTMLUListElement | null>(null);
  const positionRef = useRef(0);
  const loopWidthRef = useRef(0);
  const baseVelocityRef = useRef(0);
  const isMarqueeHoveredRef = useRef(false);

  useEffect(() => {
    const marquee = marqueeRef.current;

    if (!marquee) return;

    const mobileLayout = window.matchMedia("(max-width: 639px)").matches;

    if (mobileLayout) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("gsap").then((gsapModule) => {
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const setX = gsap.quickSetter(marquee, "x", "px");

      const normalizePosition = () => {
        const loopWidth = loopWidthRef.current;

        if (loopWidth <= 0) return;

        while (positionRef.current <= -loopWidth) {
          positionRef.current += loopWidth;
        }

        while (positionRef.current > 0) {
          positionRef.current -= loopWidth;
        }
      };

      const updateLoopWidth = () => {
        loopWidthRef.current = marquee.scrollWidth / 2;
        baseVelocityRef.current = loopWidthRef.current / BASE_MARQUEE_DURATION;
        normalizePosition();
        setX(positionRef.current);
      };

      updateLoopWidth();
      const tick = (_time: number, deltaTime: number) => {
        const loopWidth = loopWidthRef.current;

        if (loopWidth <= 0) return;
        if (isMarqueeHoveredRef.current) return;

        positionRef.current -= baseVelocityRef.current * (deltaTime / 1000);
        normalizePosition();
        setX(positionRef.current);
      };

      window.addEventListener("resize", updateLoopWidth);
      gsap.ticker.add(tick);

      cleanup = () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", updateLoopWidth);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const handleMarqueeMouseEnter = () => {
    isMarqueeHoveredRef.current = true;
  };

  const handleMarqueeMouseLeave = () => {
    isMarqueeHoveredRef.current = false;
  };

  return (
    <section id="testimonials" className="home-section overflow-hidden">
      <div
        className={`mx-auto ${contentWidthClassName} px-4 sm:px-6 lg:px-8`}
      >
        <div className="home-section-header">
          {/* <FeatureBadge label={t("badge.label")} className="mb-6" /> */}
          <p className="home-eyebrow">{t("badge.label")}</p>
          <h2 className="home-title">{title ?? t("title")}</h2>
          <p className="home-description">
            {description ?? t("description")}
          </p>
        </div>
      </div>
      <div
        className="relative hidden sm:block"
        onMouseEnter={handleMarqueeMouseEnter}
        onMouseLeave={handleMarqueeMouseLeave}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#fffdf9] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#fffdf9] to-transparent sm:w-32" />
        <ul ref={marqueeRef} className="flex w-max items-start gap-4 sm:gap-5">
          {marqueeTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </ul>
      </div>
      <div className="sm:hidden">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectionTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
