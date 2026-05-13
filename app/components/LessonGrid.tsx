"use client";

import Link from "next/link";
import { useSyncProgress } from "@/lib/useSyncProgress";
import { CHARS, LESSONS, charsForLesson } from "@/lib/chars";
import { getStat, isMastered, isLessonComplete } from "@/lib/progress";

const COLOR_THEMES = {
  blue: {
    swatch: "bg-clever-blue",
    chip: "text-clever-blue bg-clever-sky",
    border: "border-clever-blue/20 hover:border-clever-blue/50",
  },
  orange: {
    swatch: "bg-clever-orange",
    chip: "text-clever-orange bg-clever-orange/15",
    border: "border-clever-orange/25 hover:border-clever-orange/55",
  },
  sun: {
    swatch: "bg-clever-sun",
    chip: "text-clever-ink bg-clever-sun/40",
    border: "border-clever-sun/40 hover:border-clever-sun",
  },
  mint: {
    swatch: "bg-clever-mint",
    chip: "text-clever-ink bg-clever-mint/25",
    border: "border-clever-mint/30 hover:border-clever-mint/60",
  },
  navy: {
    swatch: "bg-clever-navy",
    chip: "text-white bg-clever-navy",
    border: "border-clever-navy/20 hover:border-clever-navy/50",
  },
} as const;

export function LessonGrid() {
  const version = useSyncProgress();
  // Treat the first render (tick=0) as "no progress" so SSR and the first
  // client render produce identical markup — real numbers fade in on tick 1+.
  const mounted = version > 0;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {LESSONS.map((lesson, idx) => {
        const chars = charsForLesson(lesson.id);
        const mastered = mounted
          ? chars.filter((c) => isMastered(getStat(c.char))).length
          : 0;
        const done = mounted && isLessonComplete(lesson.id);
        const theme = COLOR_THEMES[lesson.color as keyof typeof COLOR_THEMES];
        return (
          <li key={`${lesson.id}-${version}`}>
            <Link
              href={`/lesson/${lesson.id}`}
              className={`group block rounded-2xl border-2 ${theme.border} bg-clever-paper p-6 transition-all hover:-translate-y-0.5 card-soft`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${theme.chip}`}
                >
                  <span className={`hex-dot ${theme.swatch}`} aria-hidden />
                  Lesson {String(idx + 1).padStart(2, "0")}
                </span>
                {done && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-clever-mint">
                    ✓ Complete
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="char-hero text-[44px] leading-none text-clever-ink"
                  aria-hidden
                >
                  {lesson.subtitle}
                </span>
                <h3 className="char-hero text-[22px] leading-tight">
                  {lesson.name}
                </h3>
              </div>
              <p className="text-[14.5px] leading-relaxed text-clever-muted">
                {lesson.blurb}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {chars.slice(0, 6).map((c) => (
                    <span
                      key={c.char}
                      className="char-hero inline-flex items-center justify-center w-9 h-9 rounded-lg bg-clever-sky/60 border border-clever-paper text-[20px]"
                    >
                      {c.char}
                    </span>
                  ))}
                  {chars.length > 6 && (
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-clever-paper border border-clever-sky text-[12px] text-clever-muted font-medium">
                      +{chars.length - 6}
                    </span>
                  )}
                </div>
                <span className="text-[12px] text-clever-muted">
                  {mastered}/{chars.length} mastered
                </span>
              </div>
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href="/practice"
          className="group flex h-full flex-col justify-between rounded-2xl border-2 border-dashed border-clever-orange/40 bg-clever-orange/5 p-6 hover:border-clever-orange/70"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-clever-orange/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-clever-orange">
              <span className="hex-dot bg-clever-orange" aria-hidden />
              Mixed Practice
            </span>
            <h3 className="char-hero text-[22px] leading-tight mt-3">
              All {CHARS.length} characters, your weakest first.
            </h3>
            <p className="text-[14.5px] leading-relaxed text-clever-muted mt-2">
              Spaced repetition: characters you struggle with come back more
              often than ones you nail.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-clever-orange font-medium">
            Start a drill <span aria-hidden>→</span>
          </span>
        </Link>
      </li>
    </ul>
  );
}
