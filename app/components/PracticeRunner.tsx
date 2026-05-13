"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KeyHint } from "@/app/components/KeyHint";
import { CHARS, type AccentChar } from "@/lib/chars";
import { getStat, recordHit } from "@/lib/progress";
import { useSyncProgress } from "@/lib/useSyncProgress";
import { ALL_NAMES } from "@/lib/words";

/**
 * Pick a character to drill next using Leitner-box weighting:
 * lower box → seen more often. Unseen characters get top priority.
 *
 * Weights: box 1 → 6×, box 2 → 4×, box 3 → 2×, box 4 → 1×, box 5 → 0.5×.
 * Optionally avoid repeating the most-recent char back-to-back.
 */
function pickNextChar(pool: AccentChar[], avoid?: string): AccentChar {
  const weighted: { c: AccentChar; w: number }[] = pool.map((c) => {
    const s = getStat(c.char);
    if (s.attempts === 0) return { c, w: 8 };
    const baseW = [6, 4, 2, 1, 0.5][s.box - 1] ?? 1;
    return { c, w: baseW };
  });
  const filtered =
    avoid && weighted.some((x) => x.c.char !== avoid)
      ? weighted.filter((x) => x.c.char !== avoid)
      : weighted;
  const total = filtered.reduce((acc, x) => acc + x.w, 0);
  let r = Math.random() * total;
  for (const x of filtered) {
    r -= x.w;
    if (r <= 0) return x.c;
  }
  return filtered[filtered.length - 1].c;
}

/** Build a static index of names by character. Computed once. */
const NAMES_BY_CHAR: Record<string, string[]> = (() => {
  const idx: Record<string, string[]> = {};
  for (const c of CHARS) idx[c.char] = [];
  for (const name of ALL_NAMES) {
    for (const c of CHARS) {
      if (name.includes(c.char)) idx[c.char].push(name);
    }
  }
  return idx;
})();

function pickNameFor(char: string, avoid?: string): string | null {
  const candidates = NAMES_BY_CHAR[char] ?? [];
  if (candidates.length === 0) return null;
  const filtered =
    avoid && candidates.some((n) => n !== avoid)
      ? candidates.filter((n) => n !== avoid)
      : candidates;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function PracticeRunner() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-clever-sky/70">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(50% 70% at 80% 0%, #FFE478 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 sm:px-10 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="hex-dot bg-clever-orange" aria-hidden />
            <span className="text-[12px] uppercase tracking-[0.22em] text-clever-orange font-semibold">
              Mixed practice
            </span>
          </div>
          <h1 className="char-hero text-[40px] sm:text-[52px] leading-[1.05] tracking-tight">
            Learn the letter. <span className="brand-underline">Use it in a name.</span>
          </h1>
          <p className="prose-soft mt-5 max-w-2xl text-[17px] text-clever-muted">
            Each round picks one character from your weakest pile, reminds you
            how to type it, then asks you to type a real name that contains
            it. Get the character right inside the name and it climbs one box
            up your spaced-repetition ladder.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 sm:px-10 pb-16">
        <PracticeRound />
        <BoxProgress />
      </div>
    </div>
  );
}

// ---------------- Practice round ----------------

type Round = { focus: AccentChar; name: string };

function PracticeRound() {
  const v = useSyncProgress();
  const [round, setRound] = useState<Round | null>(null);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"none" | "hit" | "miss">("none");
  const [streak, setStreak] = useState(0);
  const [session, setSession] = useState({ hits: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  // Pick the first round on mount (client-only so randomness doesn't
  // mismatch SSR).
  useEffect(() => {
    if (!round) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRound(buildRound(undefined, undefined));
    }
  }, [round]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [round]);

  const advance = useCallback(() => {
    setRound((prev) => buildRound(prev?.focus.char, prev?.name));
    setValue("");
    setFeedback("none");
  }, []);

  const submit = useCallback(() => {
    if (!round) return;
    const typed = value.normalize("NFC");
    const target = round.name.normalize("NFC");
    const focus = round.focus.char;

    // What matters for the Leitner box is whether the FOCUS character was
    // typed correctly inside the name. We compare the focus char positions.
    const focusOK = (() => {
      // Find every index of `focus` in the target name.
      for (let i = 0; i < target.length; i++) {
        if (target[i].toLowerCase() === focus.toLowerCase()) {
          if (typed[i] !== target[i]) return false;
        }
      }
      return true;
    })();

    recordHit(focus, focusOK);
    const overallOK = typed.trim().toLowerCase() === target.toLowerCase();
    setSession((s) => ({
      hits: s.hits + (overallOK ? 1 : 0),
      total: s.total + 1,
    }));

    if (overallOK) {
      setFeedback("hit");
      setStreak((s) => s + 1);
      setTimeout(advance, 460);
    } else {
      setFeedback("miss");
      setStreak(0);
      setTimeout(() => setFeedback("none"), 360);
    }
  }, [advance, round, value]);

  const overlay = useMemo(() => {
    if (!round) return null;
    const typed = value.normalize("NFC");
    return round.name.split("").map((ch, i) => {
      const got = typed[i];
      const ok = got !== undefined && got.toLowerCase() === ch.toLowerCase();
      const wrong = got !== undefined && !ok;
      const isFocus = ch.toLowerCase() === round.focus.char.toLowerCase();
      return (
        <span
          key={i}
          className={`${
            ok
              ? "text-clever-mint"
              : wrong
                ? "text-clever-orange"
                : isFocus
                  ? "text-clever-blue"
                  : "text-clever-faint"
          } ${isFocus && !ok && !wrong ? "underline decoration-clever-blue/50 decoration-[3px] underline-offset-[6px]" : ""}`}
        >
          {ch}
        </span>
      );
    });
  }, [round, value]);

  void v;
  if (!round) return null;

  const acc =
    session.total === 0 ? 0 : Math.round((session.hits / session.total) * 100);
  const { focus, name } = round;

  return (
    <div className="pt-12 fade-up">
      {/* The letter to remember */}
      <div className="rounded-3xl bg-clever-sky/40 border border-clever-sky p-8 sm:p-10 mb-6 relative">
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-wider text-clever-muted">
          Streak
          <span className="rounded-full bg-clever-paper px-2 py-0.5 text-clever-ink font-semibold">
            {streak}
          </span>
        </div>
        <div className="absolute right-5 top-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-wider text-clever-muted">
          Accuracy
          <span className="rounded-full bg-clever-paper px-2 py-0.5 text-clever-ink font-semibold">
            {acc}%
          </span>
        </div>
        <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center pt-4">
          <span
            key={focus.char + session.total}
            className="char-hero leading-none text-clever-ink fade-up"
            style={{ fontSize: "clamp(5rem, 16vw, 9rem)" }}
            aria-label={focus.name}
          >
            {focus.char}
          </span>
          <div className="text-left max-w-md">
            <p className="text-[11px] uppercase tracking-[0.22em] text-clever-blue font-semibold mb-1">
              Today&apos;s letter
            </p>
            <h2 className="char-hero text-[26px] leading-tight mb-2">
              {focus.name}
            </h2>
            <p className="text-[14.5px] text-clever-muted mb-4">
              Used in {focus.languages.slice(0, 3).join(", ")}.
            </p>
            <p className="text-[11px] uppercase tracking-wider text-clever-muted mb-2">
              On a Mac
            </p>
            <KeyHint input={focus.mac} size="md" char={focus.char} />
            {focus.mac.note && (
              <p className="mt-2 text-[12px] text-clever-muted italic">
                {focus.mac.note}
              </p>
            )}
            <details className="mt-3 text-[13px]">
              <summary className="cursor-pointer text-clever-muted hover:text-clever-ink">
                Why this character?
              </summary>
              <p className="mt-2 text-clever-muted italic">{focus.mnemonic}</p>
            </details>
          </div>
        </div>
      </div>

      {/* Now type the name */}
      <div className="rounded-3xl bg-clever-mint/15 border border-clever-mint/30 p-8 sm:p-12 text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-clever-mint font-semibold mb-3">
          Now type this name →
        </p>
        <p className="text-[13px] text-clever-muted mb-6">
          The <span className="text-clever-blue font-semibold">blue letter</span> is the one you just learned. Get it right.
        </p>
        <p
          className={`char-hero leading-tight mb-8 transition-colors ${
            feedback === "hit"
              ? "pop"
              : feedback === "miss"
                ? "shake"
                : ""
          }`}
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 4rem)" }}
        >
          {overlay}
        </p>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="typer w-full max-w-xl mx-auto text-center text-[26px] py-4 rounded-2xl border-2 border-clever-mint/40 bg-white focus:border-clever-mint focus:outline-none"
          aria-label={`Type the name ${name}`}
        />
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={submit}
            className="rounded-full bg-clever-blue px-6 py-3 text-white font-medium shadow-md shadow-clever-blue/20 hover:shadow-lg"
          >
            Check ✓
          </button>
          <button
            onClick={advance}
            className="text-[14px] text-clever-muted hover:underline"
          >
            New letter →
          </button>
        </div>
      </div>
    </div>
  );
}

/** Build a fresh round. Picks a focus character and a name containing it.
 *  Falls back to any other letter that does have a name if needed. */
function buildRound(avoidChar?: string, avoidName?: string): Round {
  // Up to 8 attempts to find a focus char that has at least one name.
  for (let i = 0; i < 8; i++) {
    const focus = pickNextChar(CHARS, avoidChar);
    const name = pickNameFor(focus.char, avoidName);
    if (name) return { focus, name };
  }
  // Final fallback: pick any char that has names.
  const fallback =
    CHARS.find((c) => (NAMES_BY_CHAR[c.char] ?? []).length > 0) ?? CHARS[0];
  const name = pickNameFor(fallback.char) ?? ALL_NAMES[0];
  return { focus: fallback, name };
}

// ---------------- Box progress ----------------

function BoxProgress() {
  const v = useSyncProgress();
  const buckets = useMemo(() => {
    const b: Record<number, AccentChar[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
    // Before mount, everything sits in "Unseen" so SSR and first client render
    // produce identical markup (no hydration mismatch).
    if (v === 0) {
      b[0] = [...CHARS];
      return b;
    }
    for (const c of CHARS) {
      const s = getStat(c.char);
      const k = s.attempts === 0 ? 0 : s.box;
      b[k].push(c);
    }
    return b;
  }, [v]);

  return (
    <section className="mt-16">
      <h2 className="char-hero text-[26px] leading-tight mb-2">Your Leitner ladder.</h2>
      <p className="text-clever-muted text-[15px] mb-6">
        Five boxes. A character climbs when you type it correctly inside the
        name, and tumbles back to box 1 when you miss it. The goal: shepherd
        everything into box 5.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {([0, 1, 2, 3, 4, 5] as const).map((k) => (
          <div
            key={k}
            className="rounded-2xl border border-clever-sky bg-clever-paper p-4 min-h-[140px]"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-clever-muted font-semibold">
                {k === 0 ? "Unseen" : `Box ${k}`}
              </span>
              <span className="text-[13px] text-clever-faint">{buckets[k].length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {buckets[k].map((c) => (
                <span
                  key={c.char}
                  className="char-hero text-[20px] w-7 h-7 inline-flex items-center justify-center rounded-md bg-clever-sky/50"
                  title={c.name}
                >
                  {c.char}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-[14px] text-clever-blue hover:underline font-medium"
        >
          ← Back to lessons
        </Link>
      </div>
    </section>
  );
}
