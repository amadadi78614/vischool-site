import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { Shelf } from "@/components/Shelf";

export const metadata: Metadata = {
  title: "Worksheets",
  description: "Printable CAPS-aligned worksheets for Grade RR to Grade 3, made by Valencia Islamic School teachers. R10 each.",
  alternates: { canonical: "/learning-shelf/" },
};

export default function LearningShelf() {
  return (
    <>
      <PageHero
        eyebrow="Worksheets"
        title="Worksheets made by our teachers"
        intro="Printable practice for Grade RR to Grade 3, aligned to CAPS. Choose your worksheets, order on WhatsApp, and receive the PDFs once paid. R10 each."
      />
      <section className="pb-32">
        <div className="container-x">
          <Shelf />
        </div>
      </section>
    </>
  );
}
