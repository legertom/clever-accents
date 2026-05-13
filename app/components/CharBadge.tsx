import type { AccentChar } from "@/lib/chars";

/**
 * A big stylised tile for a single character. Used on lesson intros
 * and the home page character map.
 */
export function CharBadge({
  c,
  size = "lg",
  tone = "paper",
}: {
  c: AccentChar;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "paper" | "sky" | "sun" | "mint" | "orange";
}) {
  const sizes = {
    sm: "w-14 h-14 text-3xl",
    md: "w-20 h-20 text-5xl",
    lg: "w-28 h-28 text-6xl",
    xl: "w-40 h-40 text-[6.5rem]",
  } as const;

  const tones = {
    paper: "bg-clever-paper border-clever-sky",
    sky: "bg-clever-sky border-clever-sky",
    sun: "bg-clever-sun border-clever-sun",
    mint: "bg-clever-mint/30 border-clever-mint",
    orange: "bg-clever-orange/20 border-clever-orange",
  } as const;

  return (
    <span
      className={`char-hero inline-flex items-center justify-center rounded-2xl border ${sizes[size]} ${tones[tone]} card-soft`}
      aria-label={c.name}
    >
      {c.char}
    </span>
  );
}
