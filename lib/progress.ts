"use client";

/**
 * Lightweight client-side progress store, kept in localStorage.
 *
 * Per character we track: total attempts, correct attempts, current
 * streak of correct hits, and a Leitner-style "box" (1–5) that drives
 * spaced repetition in Practice mode. Hit = promote one box, miss =
 * drop back to box 1.
 *
 * Everything serializes as one JSON blob under STORAGE_KEY.
 */

const STORAGE_KEY = "clever-accents/progress/v1";

export type CharStat = {
  attempts: number;
  correct: number;
  streak: number;
  box: 1 | 2 | 3 | 4 | 5;
  /** ms timestamp of last touch — used for ordering review */
  lastSeen: number;
};

export type ProgressState = {
  chars: Record<string, CharStat>;
  /** Lessons the user has finished at least once. */
  completedLessons: string[];
};

const empty: ProgressState = { chars: {}, completedLessons: [] };

function readStore(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      chars: parsed.chars ?? {},
      completedLessons: parsed.completedLessons ?? [],
    };
  } catch {
    return empty;
  }
}

function writeStore(s: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("clever-progress"));
}

export function getProgress(): ProgressState {
  return readStore();
}

export function getStat(charKey: string): CharStat {
  const s = readStore();
  return (
    s.chars[charKey] ?? {
      attempts: 0,
      correct: 0,
      streak: 0,
      box: 1,
      lastSeen: 0,
    }
  );
}

export function recordHit(charKey: string, hit: boolean) {
  const s = readStore();
  const prev = s.chars[charKey] ?? {
    attempts: 0,
    correct: 0,
    streak: 0,
    box: 1 as const,
    lastSeen: 0,
  };
  const next: CharStat = {
    attempts: prev.attempts + 1,
    correct: prev.correct + (hit ? 1 : 0),
    streak: hit ? prev.streak + 1 : 0,
    box: hit
      ? (Math.min(5, prev.box + 1) as CharStat["box"])
      : 1,
    lastSeen: Date.now(),
  };
  s.chars[charKey] = next;
  writeStore(s);
}

export function markLessonComplete(lessonId: string) {
  const s = readStore();
  if (!s.completedLessons.includes(lessonId)) {
    s.completedLessons = [...s.completedLessons, lessonId];
    writeStore(s);
  }
}

export function isLessonComplete(lessonId: string): boolean {
  return readStore().completedLessons.includes(lessonId);
}

/** Accuracy for a single char as a 0–1 number. */
export function accuracy(stat: CharStat): number {
  return stat.attempts === 0 ? 0 : stat.correct / stat.attempts;
}

/** Mastered = box 4 or 5 AND >= 5 attempts AND accuracy >= 0.85. */
export function isMastered(stat: CharStat): boolean {
  return stat.box >= 4 && stat.attempts >= 5 && accuracy(stat) >= 0.85;
}

export function resetAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("clever-progress"));
}
