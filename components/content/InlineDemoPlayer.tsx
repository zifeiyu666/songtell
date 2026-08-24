"use client";

import { Pause, Play, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = { title: string; subtitle: string; accent?: string };

export function InlineDemoPlayer({ title, subtitle, accent = "var(--songtell-theme)" }: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  function toggle() {
    if (playing) {
      setPlaying(false);
      if (timer.current) clearInterval(timer.current);
      return;
    }
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioContext.current ??= new AudioContextClass();
      const ctx = audioContext.current;
      const now = ctx.currentTime;
      [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        gain.gain.setValueAtTime(0, now + index * 0.22);
        gain.gain.linearRampToValueAtTime(0.08, now + index * 0.22 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.22 + 0.2);
        oscillator.connect(gain).connect(ctx.destination);
        oscillator.start(now + index * 0.22);
        oscillator.stop(now + index * 0.22 + 0.22);
      });
    }
    setPlaying(true); setProgress(0);
    timer.current = setInterval(() => setProgress((value) => {
      if (value >= 100) { if (timer.current) clearInterval(timer.current); setPlaying(false); return 0; }
      return value + 4;
    }), 600);
  }

  return <div className="my-8 border-[3px] border-[var(--songtell-ink)] bg-white p-4 shadow-[3px_3px_0_var(--songtell-ink)] sm:p-5"><div className="flex items-center gap-3"><button type="button" onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play ${title}`} className="flex size-11 shrink-0 items-center justify-center rounded-md border-[3px] border-[var(--songtell-ink)] text-[var(--songtell-ink)] shadow-[2px_2px_0_var(--songtell-ink)] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: accent }}>{playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}</button><div className="min-w-0 flex-1"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--songtell-muted)]"><Radio className="size-3.5" /> Songtell Demo</div><p className="mt-1 truncate text-base font-bold text-[var(--songtell-ink)]">{title}</p><p className="text-sm text-[var(--songtell-muted)]">{subtitle}</p></div><span className="text-xs font-semibold text-[var(--songtell-muted)]">0:15</span></div><div className="mt-4 h-1.5 overflow-hidden border border-[var(--songtell-ink)] bg-[var(--songtell-paper)]"><div className="h-full transition-[width] duration-500" style={{ width: `${progress}%`, backgroundColor: accent }} /></div></div>;
}
