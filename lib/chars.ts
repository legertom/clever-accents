/**
 * Each entry is one accented character we want a support agent to be
 * comfortable recognizing, typing, and using.
 *
 * `mac` describes how to type it on a US Mac keyboard:
 *   - `combo`: ordered list of input steps. Each step is a string
 *     describing the keys to press. For dead-key sequences this is
 *     ["⌥E", "a"] etc. Steps with the special token "—" indicate
 *     the character is not reachable from the default US layout and
 *     requires Character Viewer (⌃⌘Space) or a Polish/Czech/etc layout.
 *   - `holdable`: true if the character is also reachable via the
 *     press-and-hold popup (e.g. hold "e" → é è ê ë...).
 */

export type MacInput = {
  combo: string[];
  holdable?: boolean;
  note?: string;
};

export type AccentChar = {
  /** The character itself, lowercase form used in drills. */
  char: string;
  /** Uppercase variant if it exists and is commonly seen in names. */
  upper?: string;
  /** Short human-friendly name. */
  name: string;
  /** Languages where this character is common. */
  languages: string[];
  /** A handful of real names or words that use it. First entry is canonical. */
  examples: string[];
  /** A mnemonic phrase that helps remember the shape/sound/keystroke. */
  mnemonic: string;
  /** Mac input instructions. */
  mac: MacInput;
  /** The lesson this character belongs to. */
  lesson: string;
};

export const CHARS: AccentChar[] = [
  // -------- L1: The Acute Accent --------
  {
    char: "é", upper: "É", name: "e with acute",
    languages: ["French", "Spanish", "Portuguese", "Italian", "Czech", "Hungarian", "Irish"],
    examples: ["José", "André", "Renée", "café", "résumé", "Pelé"],
    mnemonic: "Acute leans right — like e is élevating toward the future.",
    mac: { combo: ["⌥E", "e"], holdable: true },
    lesson: "acute",
  },
  {
    char: "á", upper: "Á", name: "a with acute",
    languages: ["Spanish", "Portuguese", "Hungarian", "Czech", "Slovak", "Icelandic"],
    examples: ["María", "Ágata", "László", "Tomás", "Andrés"],
    mnemonic: "Same right-leaning stroke — accents in Spanish almost always mark the stressed vowel.",
    mac: { combo: ["⌥E", "a"], holdable: true },
    lesson: "acute",
  },
  {
    char: "í", upper: "Í", name: "i with acute",
    languages: ["Spanish", "Portuguese", "Czech", "Hungarian", "Icelandic"],
    examples: ["Lucía", "Jiří", "Sofía", "Cristóbal"],
    mnemonic: "The dot of the i is replaced by the rising stroke — i, élevated.",
    mac: { combo: ["⌥E", "i"], holdable: true },
    lesson: "acute",
  },
  {
    char: "ó", upper: "Ó", name: "o with acute",
    languages: ["Spanish", "Portuguese", "Polish", "Hungarian", "Czech", "Icelandic"],
    examples: ["Antônio", "João Pedró", "Krzysztof", "Adrián"],
    mnemonic: "Round vowel + rising stroke — the o reaches up.",
    mac: { combo: ["⌥E", "o"], holdable: true },
    lesson: "acute",
  },
  {
    char: "ú", upper: "Ú", name: "u with acute",
    languages: ["Spanish", "Portuguese", "Czech", "Hungarian", "Icelandic"],
    examples: ["Iñaki Núñez", "Jesús", "Raúl", "José Luís"],
    mnemonic: "Same family: ⌥E followed by the vowel. One muscle, five wins.",
    mac: { combo: ["⌥E", "u"], holdable: true },
    lesson: "acute",
  },

  // -------- L2: The Tilde --------
  {
    char: "ñ", upper: "Ñ", name: "n with tilde",
    languages: ["Spanish"],
    examples: ["Peña", "Núñez", "niño", "España", "Begoña"],
    mnemonic: "The wave above means 'add a y-glide' — niño = nee-nyo.",
    mac: { combo: ["⌥N", "n"], holdable: true },
    lesson: "tilde",
  },
  {
    char: "ã", upper: "Ã", name: "a with tilde",
    languages: ["Portuguese"],
    examples: ["João", "São Paulo", "irmã", "Conceição"],
    mnemonic: "Portuguese nasal: think of 'João' — say it through your nose.",
    mac: { combo: ["⌥N", "a"], holdable: true },
    lesson: "tilde",
  },
  {
    char: "õ", upper: "Õ", name: "o with tilde",
    languages: ["Portuguese"],
    examples: ["estações", "limões", "põe"],
    mnemonic: "Less common than ã, but same key family — ⌥N then the vowel.",
    mac: { combo: ["⌥N", "o"], holdable: true },
    lesson: "tilde",
  },

  // -------- L3: The Umlaut / Diaeresis --------
  {
    char: "ü", upper: "Ü", name: "u with umlaut",
    languages: ["German", "Turkish", "Hungarian", "Estonian"],
    examples: ["Müller", "Über", "Yağmur", "Üzeyir"],
    mnemonic: "Two dots = little reading glasses. The vowel changes shape, not sound family.",
    mac: { combo: ["⌥U", "u"], holdable: true },
    lesson: "umlaut",
  },
  {
    char: "ö", upper: "Ö", name: "o with umlaut",
    languages: ["German", "Swedish", "Finnish", "Turkish", "Hungarian", "Icelandic"],
    examples: ["Björn", "Schöne", "Görçek", "Östergaard"],
    mnemonic: "If you can say 'her' but rounder, you've already said 'ö'.",
    mac: { combo: ["⌥U", "o"], holdable: true },
    lesson: "umlaut",
  },
  {
    char: "ä", upper: "Ä", name: "a with umlaut",
    languages: ["German", "Swedish", "Finnish", "Estonian"],
    examples: ["Schäfer", "Sänger", "Pärt", "Mäki"],
    mnemonic: "Closer to 'eh' than 'ah' — picture 'cat' said in German.",
    mac: { combo: ["⌥U", "a"], holdable: true },
    lesson: "umlaut",
  },
  {
    char: "ï", upper: "Ï", name: "i with diaeresis",
    languages: ["French", "Dutch", "Catalan"],
    examples: ["Loïc", "Anaïs", "Héloïse", "naïve"],
    mnemonic: "In French this is a 'tréma' — it says 'pronounce the i separately'.",
    mac: { combo: ["⌥U", "i"], holdable: true },
    lesson: "umlaut",
  },
  {
    char: "ë", upper: "Ë", name: "e with diaeresis",
    languages: ["French", "Dutch", "Albanian"],
    examples: ["Noël", "Chloë", "Zoë", "Brontë"],
    mnemonic: "Same trick: the dots mean 'this e is its own syllable, don't blend it'.",
    mac: { combo: ["⌥U", "e"], holdable: true },
    lesson: "umlaut",
  },

  // -------- L4: The Grave Accent --------
  {
    char: "è", upper: "È", name: "e with grave",
    languages: ["French", "Italian", "Catalan"],
    examples: ["Geneviève", "Hélène", "Andrè", "très bien"],
    mnemonic: "Grave leans LEFT — it falls back, like looking over your shoulder.",
    mac: { combo: ["⌥`", "e"], holdable: true, note: "⌥` is the backtick to the left of 1." },
    lesson: "grave",
  },
  {
    char: "à", upper: "À", name: "a with grave",
    languages: ["French", "Italian", "Portuguese", "Catalan"],
    examples: ["à la carte", "voilà", "Olivià", "Caterà"],
    mnemonic: "Same family as è — ⌥` then a vowel.",
    mac: { combo: ["⌥`", "a"], holdable: true },
    lesson: "grave",
  },
  {
    char: "ì", upper: "Ì", name: "i with grave",
    languages: ["Italian", "Catalan"],
    examples: ["lunedì", "così", "Tobìas"],
    mnemonic: "Italian uses it at the end of words to mark stress.",
    mac: { combo: ["⌥`", "i"], holdable: true },
    lesson: "grave",
  },
  {
    char: "ò", upper: "Ò", name: "o with grave",
    languages: ["Italian", "Catalan"],
    examples: ["però", "Niccolò", "ciò"],
    mnemonic: "Mostly Italian — the vowel stress falls here.",
    mac: { combo: ["⌥`", "o"], holdable: true },
    lesson: "grave",
  },
  {
    char: "ù", upper: "Ù", name: "u with grave",
    languages: ["French", "Italian"],
    examples: ["où", "più", "giù"],
    mnemonic: "Rare. In French only on 'où' (where) — your one chance to use it.",
    mac: { combo: ["⌥`", "u"], holdable: true },
    lesson: "grave",
  },

  // -------- L5: The Circumflex (the little hat) --------
  {
    char: "ê", upper: "Ê", name: "e with circumflex",
    languages: ["French", "Portuguese"],
    examples: ["Étienne", "fête", "Brontê", "vocês"],
    mnemonic: "The 'little hat' often marks where an 's' used to live — fête used to be 'feste'.",
    mac: { combo: ["⌥I", "e"], holdable: true, note: "⌥I is the dead key for the hat." },
    lesson: "circumflex",
  },
  {
    char: "â", upper: "Â", name: "a with circumflex",
    languages: ["French", "Portuguese", "Romanian"],
    examples: ["pâtisserie", "Câmara", "âge"],
    mnemonic: "Hat over a — usually a vanished 's' (âge ← aage ← aetate).",
    mac: { combo: ["⌥I", "a"], holdable: true },
    lesson: "circumflex",
  },
  {
    char: "î", upper: "Î", name: "i with circumflex",
    languages: ["French", "Romanian"],
    examples: ["Loïc — wait, that's ï!", "naître", "Plouînec"],
    mnemonic: "Same family: ⌥I then i.",
    mac: { combo: ["⌥I", "i"], holdable: true },
    lesson: "circumflex",
  },
  {
    char: "ô", upper: "Ô", name: "o with circumflex",
    languages: ["French", "Portuguese"],
    examples: ["Côté", "hôtel", "Antônio", "rôle"],
    mnemonic: "Très chic. Hôtel = house. Côté = side.",
    mac: { combo: ["⌥I", "o"], holdable: true },
    lesson: "circumflex",
  },
  {
    char: "û", upper: "Û", name: "u with circumflex",
    languages: ["French"],
    examples: ["sûr", "août", "dû"],
    mnemonic: "Almost vanished from French — recent spelling reform made it optional on most words.",
    mac: { combo: ["⌥I", "u"], holdable: true },
    lesson: "circumflex",
  },

  // -------- L6: Cedilla & Eszett --------
  {
    char: "ç", upper: "Ç", name: "c with cedilla",
    languages: ["French", "Portuguese", "Turkish", "Catalan"],
    examples: ["François", "Gonçalves", "Curaçao", "Provençal", "garçon"],
    mnemonic: "Cedilla = 'little tail'. It makes the c soft (like an s) before a, o, u.",
    mac: { combo: ["⌥C"], holdable: true, note: "One-shot — no second key." },
    lesson: "special",
  },
  {
    char: "ß", upper: "ẞ", name: "eszett (sharp s)",
    languages: ["German"],
    examples: ["Straße", "Weiß", "Gießen", "Fußball"],
    mnemonic: "Looks like a capital B + a tail. It's a long, sharp 'ss'.",
    mac: { combo: ["⌥S"], note: "One-shot — no second key." },
    lesson: "special",
  },
  {
    char: "¿", name: "inverted question mark",
    languages: ["Spanish"],
    examples: ["¿Cómo estás?", "¿Qué hora es?"],
    mnemonic: "Spanish bookends every question with one of these at the start.",
    mac: { combo: ["⌥⇧?"] },
    lesson: "special",
  },
  {
    char: "¡", name: "inverted exclamation mark",
    languages: ["Spanish"],
    examples: ["¡Hola!", "¡Buenos días!", "¡Olé!"],
    mnemonic: "Same idea — Spanish flips it to open the sentence.",
    mac: { combo: ["⌥1"] },
    lesson: "special",
  },

  // -------- L7: Nordic — Ring, Slash, Ligature --------
  {
    char: "å", upper: "Å", name: "a with ring",
    languages: ["Danish", "Norwegian", "Swedish"],
    examples: ["Åse", "Håkon", "Ångström", "Malmö (no, that's ö!)"],
    mnemonic: "The little circle is a tiny 'o' floating overhead — å sounds like 'aw'.",
    mac: { combo: ["⌥A"], holdable: true, note: "Single key — produces å directly." },
    lesson: "nordic",
  },
  {
    char: "ø", upper: "Ø", name: "o with stroke",
    languages: ["Danish", "Norwegian", "Faroese"],
    examples: ["Søren", "Brønd", "Tórshavn (oops, that's ó)", "Jørgen"],
    mnemonic: "A slashed o — sounds halfway between 'eh' and 'oh'. Same as German ö.",
    mac: { combo: ["⌥O"], holdable: true },
    lesson: "nordic",
  },
  {
    char: "æ", upper: "Æ", name: "ash (ae ligature)",
    languages: ["Danish", "Norwegian", "Icelandic", "Faroese"],
    examples: ["Æsa", "Sæter", "Encyclopædia"],
    mnemonic: "Two vowels welded together — say 'ae' fast.",
    mac: { combo: ["⌥'"], holdable: true, note: "⌥ + the apostrophe key." },
    lesson: "nordic",
  },

  // -------- L8: Czech & Slovak — the Háček --------
  {
    char: "č", upper: "Č", name: "c with háček",
    languages: ["Czech", "Slovak", "Croatian", "Slovenian", "Latvian", "Lithuanian"],
    examples: ["Čapek", "Novák — wait that's á", "Češka", "Lenka"],
    mnemonic: "Háček = 'little hook'. č sounds like 'ch' in chair.",
    mac: { combo: ["—"], note: "Default US layout can't type this — use Character Viewer (⌃⌘Space) or add the Czech input source." },
    lesson: "hacek",
  },
  {
    char: "š", upper: "Š", name: "s with háček",
    languages: ["Czech", "Slovak", "Croatian", "Slovenian", "Estonian", "Latvian"],
    examples: ["Škoda", "Janoš", "Hašek"],
    mnemonic: "š = 'sh' in shoe.",
    mac: { combo: ["—"], note: "Character Viewer or Czech/Slovak layout." },
    lesson: "hacek",
  },
  {
    char: "ž", upper: "Ž", name: "z with háček",
    languages: ["Czech", "Slovak", "Croatian", "Slovenian", "Latvian", "Lithuanian"],
    examples: ["Žižka", "Žukov", "Mažeika"],
    mnemonic: "ž = the 's' in 'pleasure' (a soft j).",
    mac: { combo: ["—"] },
    lesson: "hacek",
  },
  {
    char: "ř", upper: "Ř", name: "r with háček",
    languages: ["Czech"],
    examples: ["Dvořák", "Pošumavská", "Bedřich Smetana"],
    mnemonic: "Czech's signature sound — a rolled r + zh together. Famously hard.",
    mac: { combo: ["—"] },
    lesson: "hacek",
  },
  {
    char: "ý", upper: "Ý", name: "y with acute",
    languages: ["Czech", "Slovak", "Icelandic"],
    examples: ["Krátký", "Hrubý", "Sigrídur"],
    mnemonic: "Czech uses ý for the long 'ee' sound.",
    mac: { combo: ["—"], note: "Not on US, but reachable via Character Viewer." },
    lesson: "hacek",
  },
  {
    char: "đ", upper: "Đ", name: "d with stroke",
    languages: ["Croatian", "Bosnian", "Serbian", "Slovenian", "Vietnamese"],
    examples: ["Đoković", "Đurić", "Đặng", "Đoàn", "Trần Hưng Đạo"],
    mnemonic: "A 'd' with a tiny crossbar — sounds like the j in 'judge'. In Vietnamese it marks a hard d (đ vs. d are different letters).",
    mac: { combo: ["—"], note: "Default US can't type Đ. Use Character Viewer, or add a Croatian or Vietnamese input source." },
    lesson: "hacek",
  },

  // -------- L9: Polish --------
  {
    char: "ł", upper: "Ł", name: "l with stroke",
    languages: ["Polish"],
    examples: ["Łukasz", "Wałęsa", "Łódź", "Małgorzata"],
    mnemonic: "Crossed-out l — sounds like an English 'w'. Łukasz → 'Woo-cosh'.",
    mac: { combo: ["—"], note: "Add Polish input source (⌃⌥Space to switch). Worth it for support work." },
    lesson: "polish",
  },
  {
    char: "ą", upper: "Ą", name: "a with ogonek",
    languages: ["Polish", "Lithuanian"],
    examples: ["Wałęsa — that's the ę!", "Mą­druszka", "Sąsiedzi"],
    mnemonic: "Ogonek = 'little tail'. Nasal vowel — say 'on' through your nose.",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ę", upper: "Ę", name: "e with ogonek",
    languages: ["Polish"],
    examples: ["Wałęsa", "Częstochowa", "Lęborg"],
    mnemonic: "Nasal e — the most common Polish character in names.",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ż", upper: "Ż", name: "z with dot above",
    languages: ["Polish"],
    examples: ["Żaneta", "Krzyżanowski", "Żukowski"],
    mnemonic: "Dot above the z — sounds like the s in 'pleasure'. Different from ź!",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ź", upper: "Ź", name: "z with acute",
    languages: ["Polish"],
    examples: ["Łódź", "Źródło", "Kuźma"],
    mnemonic: "Acute stroke above z — softer 'zh' sound. Don't mix with ż (dot above).",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ś", upper: "Ś", name: "s with acute",
    languages: ["Polish"],
    examples: ["Śląsk", "Wiśniewski", "Kraśnik"],
    mnemonic: "Soft 'sh' — even softer than š.",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ć", upper: "Ć", name: "c with acute",
    languages: ["Polish", "Croatian", "Serbian"],
    examples: ["Đoković — wait that's Đ", "Maćko", "Ćwikła"],
    mnemonic: "Soft 'ch' — like the start of 'cheap'.",
    mac: { combo: ["—"] },
    lesson: "polish",
  },
  {
    char: "ń", upper: "Ń", name: "n with acute",
    languages: ["Polish"],
    examples: ["Gdańsk", "Poznań", "Toruń"],
    mnemonic: "Soft n — close cousin of Spanish ñ.",
    mac: { combo: ["—"] },
    lesson: "polish",
  },

  // -------- L10: Hungarian --------
  {
    char: "ő", upper: "Ő", name: "o with double acute",
    languages: ["Hungarian"],
    examples: ["Erdős", "Petőfi", "kötőjel"],
    mnemonic: "Hungarian's 'long umlaut' — like ö, but held longer.",
    mac: { combo: ["—"], note: "Hungarian layout or Character Viewer." },
    lesson: "hungarian",
  },
  {
    char: "ű", upper: "Ű", name: "u with double acute",
    languages: ["Hungarian"],
    examples: ["Műszaki", "fűzfa", "Tűzhely"],
    mnemonic: "Long ü. Hungarian is the only Latin-script language that uses ő and ű.",
    mac: { combo: ["—"] },
    lesson: "hungarian",
  },

  // -------- L11: Turkish --------
  {
    char: "ı", upper: "I", name: "dotless i",
    languages: ["Turkish", "Azerbaijani"],
    examples: ["İstanbul (note the dotted İ!)", "Kıbrıs", "Ayşegül"],
    mnemonic: "Turkish has both dotted and dotless i — and they're different letters.",
    mac: { combo: ["—"], note: "Turkish input source or Character Viewer." },
    lesson: "turkish",
  },
  {
    char: "ş", upper: "Ş", name: "s with cedilla",
    languages: ["Turkish", "Romanian", "Azerbaijani"],
    examples: ["Şahin", "Ayşe", "Maraş"],
    mnemonic: "Looks like ç's cousin. Sounds like 'sh'.",
    mac: { combo: ["—"] },
    lesson: "turkish",
  },
  {
    char: "ğ", upper: "Ğ", name: "g with breve (yumuşak g)",
    languages: ["Turkish", "Azerbaijani"],
    examples: ["Erdoğan", "doğru", "yağmur"],
    mnemonic: "The 'soft g' — Turkish speakers barely pronounce it, but it lengthens the vowel before.",
    mac: { combo: ["—"] },
    lesson: "turkish",
  },

  // -------- L12: Iceland & friends --------
  {
    char: "þ", upper: "Þ", name: "thorn",
    languages: ["Icelandic"],
    examples: ["Þór", "Þorvaldur", "Þingvellir"],
    mnemonic: "An Old English/Norse rune for 'th' (as in 'thing'). Survives only in Icelandic.",
    mac: { combo: ["—"], note: "US Extended: ⌥T types þ. Or Icelandic input source." },
    lesson: "iceland",
  },
  {
    char: "ð", upper: "Ð", name: "eth",
    languages: ["Icelandic", "Faroese"],
    examples: ["Sigurður", "Eyjafjallajökull", "Guðrún"],
    mnemonic: "The OTHER 'th' — voiced, as in 'this'. Looks like a d with a tiny crossbar.",
    mac: { combo: ["—"], note: "US Extended: ⌥D types ð." },
    lesson: "iceland",
  },
];

/**
 * Index of characters by lesson id.
 */
export type LessonId = (typeof LESSONS)[number]["id"];

export const LESSONS = [
  {
    id: "acute",
    name: "The Acute Accent",
    subtitle: "´",
    blurb: "Five vowels, one keystroke pattern. Start here — this alone covers ~70% of names you'll see.",
    color: "blue",
    motivation: "José. María. Lucía. Antonio. The five most common Latin-script accented vowels share one Mac shortcut: ⌥E then the vowel.",
  },
  {
    id: "tilde",
    name: "The Tilde",
    subtitle: "˜",
    blurb: "Spanish ñ and Portuguese ã/õ. The wavy hat above the letter signals nasality.",
    color: "orange",
    motivation: "Peña. João. São Paulo. Three letters, one shortcut: ⌥N then the letter.",
  },
  {
    id: "umlaut",
    name: "The Umlaut & Diaeresis",
    subtitle: "¨",
    blurb: "Two dots above a vowel — German Müller, French Loïc, Swedish Björn.",
    color: "navy",
    motivation: "The two dots wear different names in different languages, but the Mac shortcut is the same everywhere: ⌥U then the vowel.",
  },
  {
    id: "grave",
    name: "The Grave Accent",
    subtitle: "`",
    blurb: "The acute's mirror image — it falls back instead of leaning forward.",
    color: "mint",
    motivation: "Geneviève. à la carte. lunedì. Mostly French and Italian. ⌥` then the vowel.",
  },
  {
    id: "circumflex",
    name: "The Circumflex",
    subtitle: "ˆ",
    blurb: "The little hat. Mostly French; sometimes Portuguese or Romanian.",
    color: "sun",
    motivation: "Étienne wears the hat. fête used to be 'feste' — the hat marks the ghost of a vanished 's'. ⌥I then the vowel.",
  },
  {
    id: "special",
    name: "Cedilla, Eszett & Spanish Punctuation",
    subtitle: "ç ß ¿",
    blurb: "Four one-shot keystrokes for some of the most recognizable marks in the world.",
    color: "orange",
    motivation: "François. Straße. ¿Cómo estás? Each of these is ONE chord — no dead-key dance.",
  },
  {
    id: "nordic",
    name: "The Nordic Trio",
    subtitle: "å ø æ",
    blurb: "Scandinavia in three characters. All single Mac chords.",
    color: "blue",
    motivation: "Søren. Åse. Æsa. Each is one chord on Mac: ⌥A, ⌥O, ⌥'.",
  },
  {
    id: "hacek",
    name: "The Háček (and Đ)",
    subtitle: "ˇ",
    blurb: "The Czech & Slovak hook, plus the crossed-D used in Croatian, Serbian and Vietnamese.",
    color: "mint",
    motivation: "Czech Dvořák, Croatian Đoković, Vietnamese Đặng. Default US Mac can't type any of these — we'll learn to recognize them, and how to enable the right input source for one quick toggle.",
  },
  {
    id: "polish",
    name: "Polish — Slashed, Tailed, Dotted",
    subtitle: "ł ę ż",
    blurb: "Eight letters that make Polish look Polish. Łukasz, Wałęsa, Gdańsk.",
    color: "orange",
    motivation: "Polish names show up a LOT in support queues. We'll cover all eight Polish-only letters and the keyboard layout that unlocks them.",
  },
  {
    id: "hungarian",
    name: "Hungarian — the Long Doubles",
    subtitle: "ő ű",
    blurb: "The only two letters unique to Hungarian. Erdős, Petőfi.",
    color: "sun",
    motivation: "Two letters, but they're VERY Hungarian. If you see ő or ű, you're looking at a Magyar name.",
  },
  {
    id: "turkish",
    name: "Turkish — Dotted, Dotless, Soft",
    subtitle: "ı ş ğ",
    blurb: "İstanbul. Erdoğan. Şahin. The 'dotless i' is real and it's spectacular.",
    color: "navy",
    motivation: "Turkish has the rare quirk of a dotless lowercase i AND a dotted capital İ. Different letters. Don't mix them up.",
  },
  {
    id: "iceland",
    name: "Iceland — Thorn & Eth",
    subtitle: "þ ð",
    blurb: "Two Norse runes that survived to today. Þór and Sigurður say hello.",
    color: "blue",
    motivation: "The two letters that make Icelandic look Icelandic — and they each represent one of the two 'th' sounds in English.",
  },
] as const;

export function charsForLesson(lessonId: string): AccentChar[] {
  return CHARS.filter((c) => c.lesson === lessonId);
}

export function lessonById(id: string) {
  return LESSONS.find((l) => l.id === id);
}

/** Stable string id per character (used as localStorage key). */
export function charId(c: AccentChar): string {
  return c.char;
}
