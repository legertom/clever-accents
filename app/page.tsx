import Link from "next/link";
import { BrandHeader } from "@/app/components/BrandHeader";
import { Footer } from "@/app/components/Footer";
import { LessonGrid } from "@/app/components/LessonGrid";
import { ProgressChip } from "@/app/components/ProgressChip";
import { LESSONS, CHARS } from "@/lib/chars";

export default function Home() {
  return (
    <>
      <BrandHeader subtitle="A typing tutor for support agents" />
      <main className="flex-1">
        <Hero />
        <CharOverview />
        <section className="mx-auto max-w-6xl px-6 sm:px-10 mt-20">
          <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="char-hero text-[40px] sm:text-[48px] leading-[1.05] tracking-tight">
              Twelve <span className="brand-underline">friendly</span> lessons.
            </h2>
            <p className="max-w-md text-clever-muted text-[15px] leading-relaxed">
              Work through them top-to-bottom, or jump to whichever accent you
              keep stumbling on. Your progress is saved on this device.
            </p>
          </div>
          <LessonGrid />
        </section>
        <PracticeCTA />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 20% 0%, #DAEBFF 0%, transparent 60%), radial-gradient(40% 60% at 100% 30%, #FFE478 0%, transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="flex items-center gap-2 mb-6">
          <span className="hex-dot bg-clever-blue" aria-hidden />
          <span className="text-[12px] uppercase tracking-[0.22em] text-clever-blue font-medium">
            Hello, World — literally
          </span>
        </div>
        <h1 className="char-hero text-[52px] sm:text-[80px] leading-[0.98] tracking-[-0.025em] max-w-4xl">
          Type every student&apos;s name{" "}
          <span className="brand-underline">like you mean it.</span>
        </h1>
        <p className="prose-soft mt-8 max-w-2xl text-[19px] sm:text-[21px] text-clever-ink/85">
          Clever is going global, which means more José, Müller, Wałęsa, and
          Erdoğan in your support queue every week. This little tutor teaches
          you to spot the fifty-or-so most common accented characters — and
          how to actually type them on your Mac — in twelve bite-sized
          lessons drawn from Latin America to Lusophone Africa, Quebec to
          Cape Verde, Hanoi to Reykjavík.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/lesson/${LESSONS[0].id}`}
            className="inline-flex items-center gap-3 rounded-full bg-clever-blue px-7 py-4 text-white text-[16px] font-medium shadow-lg shadow-clever-blue/25 hover:shadow-xl hover:shadow-clever-blue/30 transition-shadow"
          >
            Start with the acute accent
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-clever-ink/15 bg-clever-paper px-6 py-4 text-[15px] font-medium text-clever-ink hover:bg-clever-sky/60"
          >
            Mixed practice
          </Link>
          <ProgressChip />
        </div>
      </div>
    </section>
  );
}

function CharOverview() {
  return (
    <section
      aria-label="The fifty characters at a glance"
      className="border-y border-clever-sky/70 bg-clever-sky/40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <h2 className="char-hero text-[28px] leading-tight text-clever-navy">
            The whole alphabet, at a glance.
          </h2>
          <p className="text-[13px] text-clever-muted">
            {CHARS.length} characters · {LESSONS.length} lessons
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2 sm:gap-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {CHARS.map((c) => (
            <span
              key={c.char}
              title={`${c.name} — ${c.languages.slice(0, 2).join(", ")}`}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-clever-paper border border-clever-sky text-[26px] sm:text-[30px] text-clever-ink card-soft hover:scale-[1.06] hover:border-clever-blue/40 transition-transform"
            >
              {c.char}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticeCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10 mt-24">
      <div className="rounded-3xl bg-clever-navy text-white p-10 sm:p-14 relative overflow-hidden card-soft">
        <div
          aria-hidden
          className="absolute -right-12 -top-12 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, #FFE478 0%, transparent 65%)" }}
        />
        <div className="relative max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.22em] text-clever-sun font-medium">
            When you&apos;re ready
          </p>
          <h2 className="char-hero text-[36px] sm:text-[48px] leading-[1.05] mt-3">
            The customer-support roleplay.
          </h2>
          <p className="prose-soft mt-5 text-[17px] text-white/85">
            A simulated support queue with real-world names from around the
            world. Type each correctly to clear the ticket. We&apos;ve seeded
            mixed practice with the same names — try it whenever you want to
            keep your hands warm.
          </p>
          <Link
            href="/practice"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-clever-orange px-6 py-3 text-white font-medium hover:brightness-110"
          >
            Open mixed practice <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
