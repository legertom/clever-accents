import Link from "next/link";
import { BrandHeader } from "@/app/components/BrandHeader";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "About — Clever Accents",
};

export default function AboutPage() {
  return (
    <>
      <BrandHeader subtitle="About" />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 sm:px-10 pt-16 pb-20">
          <p className="text-[12px] uppercase tracking-[0.22em] text-clever-blue font-semibold">
            About this tutor
          </p>
          <h1 className="char-hero text-[44px] sm:text-[56px] leading-[1.05] tracking-tight mt-3">
            A small tool, made with <span className="brand-underline">care.</span>
          </h1>
          <div className="prose-soft mt-8 space-y-6 text-[17.5px] text-clever-ink/85">
            <p>
              Clever Accents is a friendly typing tutor built for the support
              team. As Clever grows globally, you&apos;ll meet more names with
              characters that don&apos;t live on the standard US keyboard —
              José, Müller, Wałęsa, Erdoğan, Sigurður. Getting them right
              matters: a name typed correctly is a small but real way to say
              &ldquo;I see you.&rdquo;
            </p>
            <p>
              The lessons use four memorization techniques in combination:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-clever-blue">
              <li>
                <strong>Mnemonics</strong> — each character gets a tiny story
                you can hang the shape and the sound on.
              </li>
              <li>
                <strong>Spaced repetition</strong> — practice mode uses a
                five-box Leitner ladder. Characters you struggle with come
                back more often.
              </li>
              <li>
                <strong>Recall over recognition</strong> — drills hide the
                keyboard hint after two correct hits in a row to make your
                fingers do the remembering.
              </li>
              <li>
                <strong>Real-world anchoring</strong> — every character is
                paired with names you&apos;ll actually meet in the queue.
              </li>
            </ul>
            <p>
              Progress is stored only in your browser&apos;s localStorage —
              nothing is sent anywhere. Different laptops, different ladders.
              If you want a fresh start, clear the site data in Safari or
              Chrome.
            </p>
            <h2 className="char-hero text-[28px] mt-12">
              The Mac press-and-hold trick
            </h2>
            <p>
              Quick reminder for everyone: on macOS you can hold any vowel
              key for about a second and a popup of accent choices will
              appear. Type the number under the accent you want, or click it
              with the mouse. This is the easiest fallback when you can&apos;t
              remember the dead-key combo.
            </p>
            <p>
              For Polish, Czech, Hungarian and Turkish letters there&apos;s no
              dead-key shortcut in the default US layout. The lesson pages
              cover this — you&apos;ll need to either use Character Viewer
              (⌃⌘Space) or add the relevant input source under System
              Settings → Keyboard.
            </p>
          </div>
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-clever-blue px-6 py-3 text-white font-medium hover:brightness-110"
            >
              ← Back to lessons
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
