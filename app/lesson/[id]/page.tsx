import { notFound } from "next/navigation";
import { BrandHeader } from "@/app/components/BrandHeader";
import { Footer } from "@/app/components/Footer";
import { LessonRunner } from "@/app/components/LessonRunner";
import { LESSONS, charsForLesson, lessonById } from "@/lib/chars";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const lesson = lessonById(id);
  return {
    title: lesson ? `${lesson.name} — Clever Accents` : "Lesson — Clever Accents",
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { id } = await params;
  const lesson = lessonById(id);
  if (!lesson) notFound();
  const chars = charsForLesson(id);
  const index = LESSONS.findIndex((l) => l.id === id);
  const next = LESSONS[index + 1];
  const prev = LESSONS[index - 1];

  return (
    <>
      <BrandHeader subtitle={`Lesson ${index + 1} of ${LESSONS.length}`} />
      <main className="flex-1">
        <LessonRunner
          lesson={lesson}
          chars={chars}
          nextLessonId={next?.id ?? null}
          prevLessonId={prev?.id ?? null}
        />
      </main>
      <Footer />
    </>
  );
}
