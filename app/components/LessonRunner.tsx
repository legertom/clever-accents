"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CharBadge } from "@/app/components/CharBadge";
import { KeyHint } from "@/app/components/KeyHint";
import { type AccentChar } from "@/lib/chars";
import { markLessonComplete, recordHit } from "@/lib/progress";
import { WORDS_BY_LESSON } from "@/lib/words";

type Lesson = {
  id: string;
  name: string;
  subtitle: string;
  blurb: string;
  motivation: string;
};

type Phase = "meet" | "drill" | "words" | "done";

export function LessonRunner({
  lesson,
  chars,
  nextLessonId,
  prevLessonId,
}: {
  lesson: Lesson;
  chars: AccentChar[];
  nextLessonId: string | null;
  prevLessonId: string | null;
}) {
  const [phase, setPhase] = useState<Phase>("meet");

  return (
    <div>
      <LessonHeader lesson={lesson} phase={phase} chars={chars} />
      <div className="mx-auto max-w-4xl px-6 sm:px-10 pb-16">
        {phase === "meet" && (
          <MeetPhase chars={chars} onDone={() => setPhase("drill")} />
        )}
        {phase === "drill" && (
          <DrillPhase chars={chars} onDone={() => setPhase("words")} />
        )}
        {phase === "words" && (
          <WordsPhase
            lessonId={lesson.id}
            chars={chars}
            onDone={() => {
              markLessonComplete(lesson.id);
              setPhase("done");
            }}
          />
        )}
        {phase === "done" && (
          <DonePhase
            lesson={lesson}
            chars={chars}
            nextLessonId={nextLessonId}
            prevLessonId={prevLessonId}
          />
        )}
      </div>
    </div>
  );
}

// ---------------- Header ----------------

function LessonHeader({
  lesson,
  phase,
  chars,
}: {
  lesson: Lesson;
  phase: Phase;
  chars: AccentChar[];
}) {
  const stepIndex =
    phase === "meet" ? 0 : phase === "drill" ? 1 : phase === "words" ? 2 : 3;

  return (
    <section className="relative overflow-hidden border-b border-clever-sky/70">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(50% 70% at 80% 0%, #DAEBFF 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 sm:px-10 pt-10 pb-8">
        <div className="flex items-baseline gap-4 flex-wrap">
          <span
            className="char-hero text-[56px] leading-none text-clever-blue"
            aria-hidden
          >
            {lesson.subtitle}
          </span>
          <h1 className="char-hero text-[36px] sm:text-[44px] leading-tight tracking-tight">
            {lesson.name}
          </h1>
        </div>
        <p className="prose-soft mt-4 max-w-2xl text-[17px] text-clever-muted">
          {lesson.motivation}
        </p>
        <div className="mt-7 flex items-center gap-3">
          <Step n={1} label="Meet" active={stepIndex === 0} done={stepIndex > 0} />
          <Arrow />
          <Step n={2} label="Drill" active={stepIndex === 1} done={stepIndex > 1} />
          <Arrow />
          <Step n={3} label="Words" active={stepIndex === 2} done={stepIndex > 2} />
          <Arrow />
          <Step n={4} label="Done" active={stepIndex === 3} done={stepIndex > 3} />
          <span className="ml-auto text-[13px] text-clever-muted">
            {chars.length} characters
          </span>
        </div>
      </div>
    </section>
  );
}

function Step({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium uppercase tracking-wider transition-colors ${
        done
          ? "bg-clever-mint/20 text-clever-ink"
          : active
            ? "bg-clever-blue text-white"
            : "bg-clever-paper text-clever-muted border border-clever-sky"
      }`}
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/30 text-[11px]">
        {done ? "✓" : n}
      </span>
      {label}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="text-clever-faint">→</span>
  );
}

// ---------------- Meet Phase ----------------

function MeetPhase({ chars, onDone }: { chars: AccentChar[]; onDone: () => void }) {
  return (
    <div className="space-y-12 pt-12 fade-up">
      <div>
        <h2 className="char-hero text-[28px] leading-tight mb-2">Meet the characters.</h2>
        <p className="text-clever-muted text-[15px]">
          Read each one, mouth the example name, and notice the shape. The
          Mac shortcut is shown so it starts living in your fingers, not just
          your eyes.
        </p>
      </div>
      <ul className="space-y-10">
        {chars.map((c, i) => (
          <li key={c.char} className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start">
            <CharBadge c={c} size="xl" tone={i % 2 === 0 ? "sky" : "paper"} />
            <div>
              <div className="flex items-baseline gap-3 flex-wrap mb-2">
                <h3 className="char-hero text-[28px] leading-tight">{c.name}</h3>
                {c.upper && (
                  <span className="text-clever-faint text-[16px]">
                    capital: <span className="char-hero text-clever-ink">{c.upper}</span>
                  </span>
                )}
              </div>
              <p className="text-[15px] text-clever-muted mb-3">
                Used in {c.languages.join(", ")}.
              </p>
              <p className="prose-soft text-[16.5px] leading-relaxed mb-5">
                <span className="font-semibold text-clever-ink">Mnemonic:</span>{" "}
                {c.mnemonic}
              </p>
              <p className="text-[14px] uppercase tracking-wider text-clever-muted mb-2">
                On a Mac
              </p>
              <KeyHint input={c.mac} char={c.char} />
              {c.mac.note && (
                <p className="mt-3 text-[13px] text-clever-muted italic">{c.mac.note}</p>
              )}
              <p className="text-[14px] uppercase tracking-wider text-clever-muted mt-6 mb-2">
                In the wild
              </p>
              <p
                className="char-hero text-[22px] leading-relaxed text-clever-ink"
              >
                {c.examples.slice(0, 3).join("  ·  ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-clever-sky pt-8 flex items-center justify-between flex-wrap gap-4">
        <p className="text-clever-muted text-[15px]">
          Familiar? Let&apos;s build the muscle memory.
        </p>
        <button
          onClick={onDone}
          className="inline-flex items-center gap-2 rounded-full bg-clever-blue px-6 py-3 text-white font-medium shadow-md shadow-clever-blue/25 hover:shadow-lg"
        >
          Start drilling <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

// ---------------- Drill Phase ----------------

const HITS_PER_CHAR = 3;

function DrillPhase({ chars, onDone }: { chars: AccentChar[]; onDone: () => void }) {
  // For each char track how many correct hits the user has logged in this phase.
  const [hitsByChar, setHitsByChar] = useState<Record<string, number>>(() =>
    Object.fromEntries(chars.map((c) => [c.char, 0])),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "hit" | "miss">("none");
  const inputRef = useRef<HTMLInputElement>(null);

  const totalNeeded = chars.length * HITS_PER_CHAR;
  const totalDone = Object.values(hitsByChar).reduce((a, b) => a + b, 0);
  const currentChar = chars[currentIdx];
  const charDone = hitsByChar[currentChar.char] >= HITS_PER_CHAR;
  // Hide the keyboard hint once the user has 2+ correct hits on this char in
  // this lesson — recall is stronger than recognition. Pure derived state.
  const showHint = (hitsByChar[currentChar.char] ?? 0) < 2;

  // Auto-focus the input whenever the current char changes.
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIdx]);

  const advance = useCallback(() => {
    // Find next unfinished char, wrapping around.
    for (let off = 1; off <= chars.length; off++) {
      const idx = (currentIdx + off) % chars.length;
      if (hitsByChar[chars[idx].char] < HITS_PER_CHAR) {
        setCurrentIdx(idx);
        return;
      }
    }
    // All done
    onDone();
  }, [chars, currentIdx, hitsByChar, onDone]);

  const handleInput = useCallback(
    (value: string) => {
      if (!value) return;
      const last = value[value.length - 1];
      const correct = last.toLowerCase() === currentChar.char.toLowerCase();
      recordHit(currentChar.char, correct);
      if (correct) {
        setFeedback("hit");
        const newCount = (hitsByChar[currentChar.char] ?? 0) + 1;
        const nextHits = { ...hitsByChar, [currentChar.char]: newCount };
        setHitsByChar(nextHits);
        // Clear the input after a brief moment
        setTimeout(() => {
          setFeedback("none");
          if (newCount >= HITS_PER_CHAR) {
            // Move on — find next or finish
            let advanced = false;
            for (let off = 1; off <= chars.length; off++) {
              const idx = (currentIdx + off) % chars.length;
              if (nextHits[chars[idx].char] < HITS_PER_CHAR) {
                setCurrentIdx(idx);
                advanced = true;
                break;
              }
            }
            if (!advanced) onDone();
          }
          if (inputRef.current) inputRef.current.value = "";
        }, 220);
      } else {
        setFeedback("miss");
        setTimeout(() => {
          setFeedback("none");
          if (inputRef.current) inputRef.current.value = "";
          inputRef.current?.focus();
        }, 320);
      }
    },
    [currentChar, currentIdx, chars, hitsByChar, onDone],
  );

  return (
    <div className="pt-12 fade-up">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
        <h2 className="char-hero text-[28px] leading-tight">Drill mode.</h2>
        <p className="text-clever-muted text-[14px]">
          {totalDone} / {totalNeeded} reps
        </p>
      </div>
      <p className="text-clever-muted text-[15px] mb-10">
        Type each character three times. The keyboard hint hides after two
        correct hits in a row — recall is stronger than recognition.
      </p>

      <div className="rounded-3xl bg-clever-sky/40 border border-clever-sky p-10 sm:p-14 text-center relative overflow-hidden">
        <p className="text-[13px] uppercase tracking-[0.22em] text-clever-blue font-semibold mb-6">
          Type this →
        </p>
        <div
          key={`${currentChar.char}-${hitsByChar[currentChar.char]}`}
          className={`char-hero leading-none mb-2 transition-colors ${
            feedback === "hit" ? "text-clever-mint pop" : feedback === "miss" ? "text-clever-orange shake" : "text-clever-ink"
          }`}
          style={{ fontSize: "10rem" }}
        >
          {currentChar.char}
        </div>
        <p className="text-[15px] text-clever-muted mb-8">
          {currentChar.name} · used in {currentChar.languages[0]}
        </p>

        <input
          ref={inputRef}
          type="text"
          autoFocus
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="typer w-32 mx-auto text-center text-[40px] py-3 rounded-2xl border-2 border-clever-blue/30 bg-white focus:border-clever-blue focus:outline-none"
          aria-label={`Type the character ${currentChar.char}`}
          onChange={(e) => handleInput(e.currentTarget.value)}
        />

        <div className="mt-8 min-h-[3rem]">
          {showHint ? (
            <div className="inline-flex flex-col items-center gap-2">
              <p className="text-[12px] uppercase tracking-wider text-clever-muted">
                Press these keys
              </p>
              <KeyHint input={currentChar.mac} size="lg" char={currentChar.char} />
            </div>
          ) : (
            <p className="text-[13px] text-clever-muted italic">
              Hint hidden — see if your fingers remember.
            </p>
          )}
        </div>

        <div className="absolute right-5 top-5 flex flex-col items-end gap-1">
          <span className="text-[11px] uppercase tracking-wider text-clever-muted">
            This rep
          </span>
          <div className="flex gap-1">
            {Array.from({ length: HITS_PER_CHAR }).map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < (hitsByChar[currentChar.char] ?? 0)
                    ? "bg-clever-mint"
                    : "bg-clever-paper border border-clever-sky"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center flex-wrap gap-3">
        <p className="text-[13px] uppercase tracking-wider text-clever-muted w-full">
          Characters in this lesson
        </p>
        <div className="flex flex-wrap gap-2">
          {chars.map((c, i) => {
            const done = (hitsByChar[c.char] ?? 0) >= HITS_PER_CHAR;
            const active = i === currentIdx;
            return (
              <button
                key={c.char}
                onClick={() => setCurrentIdx(i)}
                aria-label={`Switch to ${c.name}`}
                className={`char-hero inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all ${
                  active
                    ? "border-clever-blue bg-clever-paper"
                    : done
                      ? "border-clever-mint/60 bg-clever-mint/15 text-clever-muted line-through decoration-clever-mint"
                      : "border-clever-sky bg-clever-paper hover:border-clever-blue/40"
                }`}
              >
                {c.char}
              </button>
            );
          })}
        </div>
        <button
          onClick={advance}
          className="ml-auto text-[14px] text-clever-blue font-medium hover:underline"
        >
          Skip for now →
        </button>
        {charDone && (
          <button
            onClick={onDone}
            className="rounded-full bg-clever-blue px-5 py-2.5 text-white font-medium hover:brightness-110"
          >
            Move on to words →
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------- Words Phase ----------------

function WordsPhase({
  lessonId,
  chars,
  onDone,
}: {
  lessonId: string;
  chars: AccentChar[];
  onDone: () => void;
}) {
  const words = useMemo(() => WORDS_BY_LESSON[lessonId] ?? [], [lessonId]);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "hit" | "miss">("none");
  const inputRef = useRef<HTMLInputElement>(null);

  const target = words[idx];

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  const normalize = (s: string) => s.normalize("NFC").toLowerCase();
  // Strip non-accented basic chars to test the "accented chars present" rule.
  const submit = useCallback(() => {
    if (!target) return;
    const ok = normalize(value.trim()) === normalize(target);
    // Per-char recording: for each accented char in the target word,
    // log whether the typed word contained the same char in the same position.
    for (const c of chars) {
      if (!target.includes(c.char)) continue;
      const containsRight = value.normalize("NFC").includes(c.char);
      recordHit(c.char, containsRight);
    }
    if (ok) {
      setFeedback("hit");
      setMisses(0);
      setTimeout(() => {
        setFeedback("none");
        setValue("");
        if (idx + 1 >= words.length) onDone();
        else setIdx(idx + 1);
      }, 360);
    } else {
      setFeedback("miss");
      setMisses((m) => m + 1);
      setTimeout(() => setFeedback("none"), 320);
    }
  }, [chars, idx, onDone, target, value, words.length]);

  // Highlight which characters in the target the user has typed correctly so far.
  const overlay = useMemo(() => {
    if (!target) return null;
    const typed = value.normalize("NFC");
    return target.split("").map((ch, i) => {
      const got = typed[i];
      const ok = got !== undefined && got.toLowerCase() === ch.toLowerCase();
      const wrong = got !== undefined && !ok;
      return (
        <span
          key={i}
          className={
            ok
              ? "text-clever-mint"
              : wrong
                ? "text-clever-orange"
                : "text-clever-faint"
          }
        >
          {ch}
        </span>
      );
    });
  }, [target, value]);

  if (!target) {
    // No words for this lesson; just bail out gracefully.
    return (
      <div className="pt-12 fade-up">
        <p className="text-clever-muted text-[15px]">
          (No word drills for this lesson — you&apos;re done.)
        </p>
        <button
          onClick={onDone}
          className="mt-6 rounded-full bg-clever-blue px-6 py-3 text-white font-medium"
        >
          Finish lesson →
        </button>
      </div>
    );
  }

  return (
    <div className="pt-12 fade-up">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
        <h2 className="char-hero text-[28px] leading-tight">Real names &amp; words.</h2>
        <p className="text-clever-muted text-[14px]">
          {idx + 1} / {words.length}
        </p>
      </div>
      <p className="text-clever-muted text-[15px] mb-10">
        Type each name exactly. Match the accented characters — capitalization
        and other letters are forgiving.
      </p>

      <div className="rounded-3xl bg-clever-sun/30 border border-clever-sun/40 p-10 sm:p-14 text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-clever-ink/60 font-semibold mb-6">
          Type this →
        </p>
        <p
          className={`char-hero leading-tight mb-8 transition-colors ${
            feedback === "hit"
              ? "text-clever-mint pop"
              : feedback === "miss"
                ? "shake"
                : "text-clever-ink"
          }`}
          style={{ fontSize: "clamp(2.8rem, 7vw, 4.5rem)" }}
        >
          {overlay}
        </p>

        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="typer w-full max-w-xl mx-auto text-center text-[28px] py-4 rounded-2xl border-2 border-clever-orange/40 bg-white focus:border-clever-orange focus:outline-none"
          aria-label={`Type the name ${target}`}
        />
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={submit}
            className="rounded-full bg-clever-blue px-6 py-3 text-white font-medium hover:brightness-110"
          >
            Check ✓
          </button>
          <button
            onClick={() => {
              setValue("");
              setMisses(0);
              if (idx + 1 >= words.length) onDone();
              else setIdx(idx + 1);
            }}
            className="text-[14px] text-clever-muted hover:underline"
          >
            Skip
          </button>
        </div>
        {misses >= 2 && (
          <p className="mt-5 text-[14px] text-clever-orange italic">
            Hint: focus on the accented letters. The non-accented characters
            are case-insensitive and forgiving.
          </p>
        )}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4 text-[14px]">
        <details className="rounded-xl bg-clever-paper border border-clever-sky p-4">
          <summary className="cursor-pointer font-medium text-clever-ink">
            Forgot a shortcut? Cheat sheet
          </summary>
          <ul className="mt-3 space-y-2">
            {chars.map((c) => (
              <li key={c.char} className="flex items-center gap-3">
                <span className="char-hero text-[24px] w-8 text-center">{c.char}</span>
                <KeyHint input={c.mac} size="sm" showKeyboard={false} char={c.char} />
              </li>
            ))}
          </ul>
        </details>
        <div className="rounded-xl bg-clever-sky/40 border border-clever-sky p-4 text-clever-muted leading-relaxed">
          <p className="font-medium text-clever-ink mb-1">Mac superpower</p>
          <p>
            Hold any vowel for ~1 second on your Mac — a numbered popup of
            accent options appears. Type the number to insert. Great fallback
            when you forget the dead-key combo.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------- Done Phase ----------------

function DonePhase({
  lesson,
  chars,
  nextLessonId,
  prevLessonId,
}: {
  lesson: Lesson;
  chars: AccentChar[];
  nextLessonId: string | null;
  prevLessonId: string | null;
}) {
  return (
    <div className="pt-12 fade-up text-center">
      <p className="text-[12px] uppercase tracking-[0.22em] text-clever-mint font-semibold">
        Lesson complete
      </p>
      <h2 className="char-hero text-[44px] sm:text-[56px] leading-[1.05] mt-4">
        Beautifully done. <span className="brand-underline">{lesson.name}</span> is yours.
      </h2>
      <p className="prose-soft mt-6 text-[18px] text-clever-muted max-w-2xl mx-auto">
        These will keep coming back in mixed practice — the more you see them,
        the faster they&apos;ll feel like home.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {chars.map((c) => (
          <span
            key={c.char}
            className="char-hero inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-clever-mint/40 bg-clever-mint/10 text-[36px]"
          >
            {c.char}
          </span>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {prevLessonId && (
          <Link
            href={`/lesson/${prevLessonId}`}
            className="rounded-full border border-clever-ink/15 bg-clever-paper px-5 py-3 font-medium hover:bg-clever-sky/60"
          >
            ← Previous lesson
          </Link>
        )}
        <Link
          href="/practice"
          className="rounded-full bg-clever-paper border-2 border-clever-blue/30 px-6 py-3 font-medium text-clever-blue hover:border-clever-blue"
        >
          Mixed practice
        </Link>
        {nextLessonId ? (
          <Link
            href={`/lesson/${nextLessonId}`}
            className="rounded-full bg-clever-blue px-7 py-3 text-white font-medium shadow-md shadow-clever-blue/25 hover:shadow-lg"
          >
            Next lesson →
          </Link>
        ) : (
          <Link
            href="/"
            className="rounded-full bg-clever-blue px-7 py-3 text-white font-medium shadow-md shadow-clever-blue/25 hover:shadow-lg"
          >
            Back to home →
          </Link>
        )}
      </div>
    </div>
  );
}
