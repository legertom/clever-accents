"use client";

import { useMemo } from "react";
import { CHARS } from "@/lib/chars";
import { getStat, isMastered } from "@/lib/progress";
import { useSyncProgress } from "@/lib/useSyncProgress";

export function ProgressChip() {
  const v = useSyncProgress();
  const { mastered, total, anyProgress } = useMemo(() => {
    // Until the mount effect runs (v === 0), pretend there is no progress so
    // the markup matches what the server renders.
    if (v === 0) return { mastered: 0, total: CHARS.length, anyProgress: false };
    const total = CHARS.length;
    const mastered = CHARS.filter((c) => isMastered(getStat(c.char))).length;
    const anyProgress = CHARS.some((c) => getStat(c.char).attempts > 0);
    return { mastered, total, anyProgress };
  }, [v]);

  if (!anyProgress) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-clever-paper border border-clever-ink/10 px-4 py-3 text-[13px] text-clever-muted">
        <span className="hex-dot bg-clever-faint" aria-hidden />
        Fresh start — no progress yet
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-clever-mint/15 border border-clever-mint/40 px-4 py-3 text-[13px] font-medium text-clever-ink">
      <span className="hex-dot bg-clever-mint" aria-hidden />
      {mastered}/{total} mastered
    </span>
  );
}
