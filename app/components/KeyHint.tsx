import type { MacInput } from "@/lib/chars";

/**
 * Renders a Mac key-combo as a row of keycaps plus, when relevant, a small
 * stylised Mac keyboard with the target keys highlighted. The keyboard
 * disambiguates letters whose shape collides in a sans-serif font (I vs. l
 * vs. 1) by showing the key in context — your hand can find I if it knows
 * I sits between U and O.
 *
 * When a character isn't on a default-US dead-key combo, we instead show a
 * step-by-step "press and hold the base letter" recipe, which is the easiest
 * native macOS path for the great majority of these characters.
 */
export function KeyHint({
  input,
  size = "md",
  showKeyboard = true,
  char,
}: {
  input: MacInput;
  size?: "sm" | "md" | "lg";
  showKeyboard?: boolean;
  /** The accented character itself — used to give a press-and-hold recipe
   *  when the default US layout can't type it via a dead-key combo. */
  char?: string;
}) {
  const unsupported = input.combo[0] === "—";
  if (unsupported) {
    return <UnsupportedHint char={char ?? ""} />;
  }

  const highlighted = collectHighlightedKeys(input.combo);

  return (
    <div className="inline-flex flex-col gap-3 items-start">
      <div className="flex flex-wrap items-center gap-2">
        {input.combo.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-clever-faint text-lg leading-none">→</span>
            )}
            <StepKeys step={step} size={size} />
          </span>
        ))}
      </div>
      {showKeyboard && highlighted.size > 0 && (
        <MiniKeyboard highlighted={highlighted} />
      )}
    </div>
  );
}

function StepKeys({ step, size }: { step: string; size: "sm" | "md" | "lg" }) {
  // Split a step like "⌥⇧?" into ["⌥", "⇧", "?"] or "⌥E" into ["⌥", "E"]
  const tokens: string[] = [];
  for (const ch of step) {
    if (/[⌥⌘⌃⇧]/.test(ch)) {
      tokens.push(ch);
    } else {
      const last = tokens[tokens.length - 1];
      if (!last || /[⌥⌘⌃⇧]/.test(last)) tokens.push(ch);
      else tokens[tokens.length - 1] = last + ch;
    }
  }
  return (
    <span className="inline-flex items-center">
      {tokens.map((t, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="keycap-plus" aria-hidden>+</span>}
          <Cap label={t} size={size} />
        </span>
      ))}
    </span>
  );
}

const SIZE_STYLES = {
  sm: { minWidth: "2.0rem", height: "2.0rem", fontSize: "0.85rem", padding: "0 0.45rem" },
  md: { minWidth: "2.4rem", height: "2.4rem", fontSize: "1.0rem", padding: "0 0.6rem" },
  lg: { minWidth: "3.0rem", height: "3.0rem", fontSize: "1.15rem", padding: "0 0.8rem" },
} as const;

function Cap({ label, size }: { label: string; size: "sm" | "md" | "lg" }) {
  const friendly: Record<string, string> = {
    "⌥": "Option",
    "⌘": "Cmd",
    "⌃": "Control",
    "⇧": "Shift",
    "`": "Backtick — the key to the left of 1",
    "1": "Number 1",
    "I": "Letter I — top row, between U and O",
    "i": "Letter i — top row, between U and O",
    "'": "Apostrophe — next to the Return key",
  };
  const aria = friendly[label] ?? `Key ${label}`;
  // Use a monospaced face on the cap glyph itself so I, l, 1, |, O, 0 stay
  // distinguishable. The modifier symbols keep their decorative Inter weight.
  const isModifier = /[⌥⌘⌃⇧]/.test(label);
  return (
    <span
      className="keycap"
      aria-label={aria}
      title={aria}
      style={{
        ...SIZE_STYLES[size],
        fontFamily: isModifier
          ? "var(--font-sans)"
          : 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
        fontWeight: isModifier ? 600 : 700,
      }}
    >
      {label}
    </span>
  );
}

// -------------------------------------------------------------------------
// Mini Mac keyboard
// -------------------------------------------------------------------------

/**
 * A simplified Mac US-English keyboard rendered with HTML. We highlight any
 * keys named in the dead-key combo so the user can recognise the physical
 * location, not just the glyph.
 *
 * Rows: number row, QWERTY row, ASDF row, ZXCV row. Pure decoration of the
 * real layout — proportional widths but no Tab/Caps/Shift/etc. visible
 * outside the alphabet area, except a wide ⌥ on the bottom.
 */

const KEY_MAP: Record<string, { row: number; col: number }> = {
  "`": { row: 0, col: 0 },
  "1": { row: 0, col: 1 },
  "2": { row: 0, col: 2 },
  "3": { row: 0, col: 3 },
  "4": { row: 0, col: 4 },
  "5": { row: 0, col: 5 },
  "6": { row: 0, col: 6 },
  "7": { row: 0, col: 7 },
  "8": { row: 0, col: 8 },
  "9": { row: 0, col: 9 },
  "0": { row: 0, col: 10 },
  "-": { row: 0, col: 11 },
  "=": { row: 0, col: 12 },
  "Q": { row: 1, col: 0 },
  "W": { row: 1, col: 1 },
  "E": { row: 1, col: 2 },
  "R": { row: 1, col: 3 },
  "T": { row: 1, col: 4 },
  "Y": { row: 1, col: 5 },
  "U": { row: 1, col: 6 },
  "I": { row: 1, col: 7 },
  "O": { row: 1, col: 8 },
  "P": { row: 1, col: 9 },
  "[": { row: 1, col: 10 },
  "]": { row: 1, col: 11 },
  "\\": { row: 1, col: 12 },
  "A": { row: 2, col: 0 },
  "S": { row: 2, col: 1 },
  "D": { row: 2, col: 2 },
  "F": { row: 2, col: 3 },
  "G": { row: 2, col: 4 },
  "H": { row: 2, col: 5 },
  "J": { row: 2, col: 6 },
  "K": { row: 2, col: 7 },
  "L": { row: 2, col: 8 },
  ";": { row: 2, col: 9 },
  "'": { row: 2, col: 10 },
  "Z": { row: 3, col: 0 },
  "X": { row: 3, col: 1 },
  "C": { row: 3, col: 2 },
  "V": { row: 3, col: 3 },
  "B": { row: 3, col: 4 },
  "N": { row: 3, col: 5 },
  "M": { row: 3, col: 6 },
  ",": { row: 3, col: 7 },
  ".": { row: 3, col: 8 },
  "/": { row: 3, col: 9 },
};

const ROW_LABELS: string[][] = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
];

/** From the combo string, extract the keys we want highlighted on the
 *  mini keyboard. Always include the modifier "⌥" key. */
function collectHighlightedKeys(combo: string[]): Set<string> {
  const out = new Set<string>();
  out.add("⌥");
  for (const step of combo) {
    let i = 0;
    while (i < step.length) {
      const ch = step[i];
      if (/[⌥⌘⌃]/.test(ch)) {
        out.add(ch);
        i++;
        continue;
      }
      if (ch === "⇧") {
        out.add("⇧");
        i++;
        continue;
      }
      // Letter/punct — normalise letters to uppercase for the keymap lookup.
      const k = /[a-z]/.test(ch) ? ch.toUpperCase() : ch;
      if (k in KEY_MAP) out.add(k);
      i++;
    }
  }
  return out;
}

function MiniKeyboard({ highlighted }: { highlighted: Set<string> }) {
  return (
    <div
      role="img"
      aria-label="Mac keyboard with the keys you need to press highlighted"
      className="rounded-xl border border-clever-sky bg-clever-paper p-2.5 select-none"
    >
      <div className="flex flex-col gap-1">
        {ROW_LABELS.map((row, rIdx) => (
          <div
            key={rIdx}
            className="flex gap-1"
            // Indent each row a touch to suggest stagger.
            style={{ paddingLeft: `${rIdx * 6}px` }}
          >
            {row.map((label) => {
              const isOn = highlighted.has(label);
              return <MiniKey key={label} label={label} on={isOn} />;
            })}
          </div>
        ))}
        {/* Bottom row: modifier strip with ⌥ in its real position. */}
        <div className="flex gap-1 pt-0.5" style={{ paddingLeft: "12px" }}>
          <MiniKey label="fn" on={highlighted.has("fn")} wide />
          <MiniKey label="⌃" on={highlighted.has("⌃")} />
          <MiniKey label="⌥" on={highlighted.has("⌥")} />
          <MiniKey label="⌘" on={highlighted.has("⌘")} wide />
          <span
            className="rounded-[5px] bg-clever-paper border border-[#d6dde9] border-b-2"
            style={{ width: "120px", height: "20px" }}
            aria-hidden
          />
          <MiniKey label="⌘" on={highlighted.has("⌘")} wide />
          <MiniKey label="⌥" on={highlighted.has("⌥")} />
        </div>
      </div>
    </div>
  );
}

function MiniKey({
  label,
  on,
  wide = false,
}: {
  label: string;
  on: boolean;
  wide?: boolean;
}) {
  const baseW = wide ? 28 : 20;
  return (
    <span
      className="inline-flex items-center justify-center rounded-[5px] border text-[10px] font-semibold leading-none transition-colors"
      style={{
        width: `${baseW}px`,
        height: "20px",
        background: on ? "var(--color-clever-blue)" : "#ffffff",
        borderColor: on ? "var(--color-clever-blue)" : "#d6dde9",
        borderBottomWidth: "2px",
        color: on ? "#ffffff" : "#7a8597",
        fontFamily: /[A-Z0-9`\-=[\]\\;',./]/.test(label)
          ? 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'
          : "var(--font-sans)",
      }}
    >
      {label}
    </span>
  );
}

// -------------------------------------------------------------------------
// Unsupported-on-default-US hint
// -------------------------------------------------------------------------

/**
 * For every "—" character we know which base letter to hold for the macOS
 * accent popup. The popup appears after holding a vowel/consonant for ~1s
 * and contains the most-used accented forms (numbered). This is how a
 * support agent should realistically reach these characters day-to-day.
 *
 * A handful of characters (ı dotless-i, ğ, ş, þ, ő, ű, ð, đ, ř) aren't in
 * the default popup and need either Character Viewer or an extra input
 * source. We list them as `null` and fall back to the universal explanation.
 */
const HOLD_BASE: Record<string, string | null> = {
  // Polish
  "ł": "L",
  "ą": "A",
  "ę": "E",
  "ż": "Z",
  "ź": "Z",
  "ś": "S",
  "ć": "C",
  "ń": "N",
  // Czech / Slovak háčeks reachable via base letter
  "č": "C",
  "š": "S",
  "ž": "Z",
  "ý": "Y",
  "ř": null,
  "đ": null,
  // Hungarian / Turkish / Icelandic — not in default popup
  "ő": null,
  "ű": null,
  "ı": null,
  "ş": null,
  "ğ": null,
  "þ": null,
  "ð": "D",
};

function UnsupportedHint({ char }: { char: string }) {
  const base = char ? HOLD_BASE[char.toLowerCase()] ?? null : null;
  return (
    <div className="rounded-2xl border border-clever-sky bg-clever-paper p-4 sm:p-5 max-w-2xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="hex-dot bg-clever-blue" aria-hidden />
        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-clever-blue">
          How to type this on your Mac
        </span>
      </div>

      {base ? (
        <div>
          <p className="text-[15px] leading-relaxed text-clever-ink">
            <span className="font-semibold">Press and hold the <KeyInline>{base}</KeyInline> key</span>{" "}
            on your keyboard for about a second. A small popup appears with
            accent variants — click {char ? <span className="char-hero text-clever-blue">{char}</span> : "the one you want"} or type its
            number.
          </p>
          <HoldPopupVisual base={base} target={char} />
          <p className="text-[13px] leading-relaxed text-clever-muted mt-3">
            No dead-key shortcut, no extra setup. This is the same trick that
            iOS uses on iPhone keyboards.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-[15px] leading-relaxed text-clever-ink">
            This character isn&apos;t in the default US layout&apos;s
            press-and-hold popup either. Two reliable options:
          </p>
          <ol className="mt-3 space-y-2 text-[14.5px] text-clever-ink list-decimal pl-5 marker:text-clever-blue">
            <li>
              <span className="font-semibold">Character Viewer.</span> Press{" "}
              <KeyInline>⌃</KeyInline> + <KeyInline>⌘</KeyInline> +{" "}
              <KeyInline>Space</KeyInline>, search for the character, then
              double-click to insert.
            </li>
            <li>
              <span className="font-semibold">Add an input source</span> for
              permanent access. System Settings → Keyboard → Input Sources →{" "}
              <KeyInline>+</KeyInline> → pick Polish, Czech, Hungarian,
              Turkish, or Icelandic as needed. Toggle layouts with{" "}
              <KeyInline>⌃</KeyInline> + <KeyInline>⌥</KeyInline> +{" "}
              <KeyInline>Space</KeyInline>.
            </li>
          </ol>
          <p className="text-[13px] leading-relaxed text-clever-muted mt-3">
            Bonus tip: in real support tickets, you can almost always
            copy-and-paste the name straight from the ticket.
          </p>
        </div>
      )}
    </div>
  );
}

/** A tiny inline keycap used in prose. Same look as the larger keycap but
 *  sized to baseline-fit a sentence. */
function KeyInline({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[5px] border align-baseline"
      style={{
        minWidth: "1.55rem",
        height: "1.55rem",
        padding: "0 0.4rem",
        fontSize: "0.85rem",
        fontWeight: 700,
        background: "linear-gradient(180deg, #ffffff 0%, #f3f6fb 100%)",
        borderColor: "#d6dde9",
        borderBottomWidth: "2px",
        color: "var(--color-clever-ink)",
        fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
        transform: "translateY(2px)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * A small visual showing the macOS press-and-hold mechanic: a finger pressing
 * the base key, with a popup bubble of accent variants floating above. The
 * target accent is highlighted in the popup.
 */
function HoldPopupVisual({ base, target }: { base: string; target: string }) {
  // The popup options are illustrative — real macOS popups vary slightly
  // by macOS version. We show a small representative set including target.
  const popupChars = getPopupChars(base.toLowerCase(), target);
  const targetIdx = popupChars.findIndex(
    (c) => c.toLowerCase() === target.toLowerCase(),
  );

  return (
    <div className="mt-4 inline-block relative">
      {/* Popup bubble */}
      <div className="rounded-xl bg-clever-ink text-white px-3 py-2 shadow-lg shadow-clever-ink/20 inline-flex items-center gap-1.5">
        {popupChars.map((c, i) => {
          const on = i === targetIdx;
          return (
            <span
              key={i}
              className={`inline-flex flex-col items-center justify-center rounded-md ${
                on ? "bg-clever-blue" : "bg-white/10"
              }`}
              style={{ minWidth: "2rem", padding: "0.25rem 0.45rem" }}
            >
              <span
                className="char-hero text-[18px] leading-none"
                style={{ color: on ? "#fff" : "rgba(255,255,255,0.9)" }}
              >
                {c}
              </span>
              <span className="text-[9px] text-white/60 mt-0.5">{i + 1}</span>
            </span>
          );
        })}
      </div>
      {/* Connector down to the held key */}
      <div className="flex justify-center mt-1">
        <span aria-hidden className="text-clever-ink/60 text-[14px] leading-none">▼</span>
      </div>
      {/* Held key with a subtle "pressed" treatment */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="text-[12px] text-clever-muted">
          press &amp; hold
        </span>
        <span
          className="keycap"
          data-pressed="true"
          style={{
            minWidth: "2.4rem",
            height: "2.4rem",
            fontSize: "1.0rem",
            padding: "0 0.6rem",
            fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            fontWeight: 700,
          }}
        >
          {base}
        </span>
      </div>
    </div>
  );
}

/** Approximate macOS press-and-hold popup contents per base letter. Always
 *  includes the target character so the visual stays honest. Order roughly
 *  matches the real popup so the numeric shortcut shown is close to real. */
function getPopupChars(base: string, target: string): string[] {
  const map: Record<string, string[]> = {
    a: ["à", "á", "â", "ä", "æ", "ã", "å", "ā", "ą"],
    c: ["ç", "ć", "č"],
    d: ["ð"],
    e: ["è", "é", "ê", "ë", "ē", "ė", "ę"],
    i: ["î", "ï", "í", "ī", "į", "ì"],
    l: ["ł"],
    n: ["ñ", "ń"],
    o: ["ô", "ö", "ò", "ó", "œ", "ø", "ō", "õ"],
    s: ["ß", "ś", "š"],
    u: ["û", "ü", "ù", "ú", "ū"],
    y: ["ý", "ÿ"],
    z: ["ž", "ź", "ż"],
  };
  const base_l = base.toLowerCase();
  const all = map[base_l] ?? [target];
  if (!all.includes(target.toLowerCase())) return [target, ...all].slice(0, 8);
  return all.slice(0, 8);
}

