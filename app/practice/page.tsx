import { BrandHeader } from "@/app/components/BrandHeader";
import { Footer } from "@/app/components/Footer";
import { PracticeRunner } from "@/app/components/PracticeRunner";

export const metadata = {
  title: "Mixed practice — Clever Accents",
};

export default function PracticePage() {
  return (
    <>
      <BrandHeader subtitle="Mixed practice" />
      <main className="flex-1">
        <PracticeRunner />
      </main>
      <Footer />
    </>
  );
}
