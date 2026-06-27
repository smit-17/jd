import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow, FloatingDecor } from "@/components/Decor";
import { Hero } from "@/components/Hero";
import { Myself, Professional } from "@/components/Sections";
import { Hobbies, Occupation } from "@/components/Occupation";
import { AboutMe, Family } from "@/components/Family";
import { Contact, ThankYou } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brijes Pansuriya — A Premium Introduction" },
      {
        name: "description",
        content:
          "Brijes Pansuriya — CEO & Owner at LEPDO Diamonds & Jewelry. A luxury editorial introduction.",
      },
      { property: "og:title", content: "Brijes Pansuriya — A Premium Introduction" },
      {
        property: "og:description",
        content: "CEO & Owner at LEPDO Diamonds & Jewelry. A luxury editorial personal introduction.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* slow moving background texture */}
      <div aria-hidden className="texture-bg pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <CursorGlow />

      <div className="relative">
        <FloatingDecor />
        <Hero />
      </div>

      <Myself />
      <Professional />
      <Occupation />
      <Hobbies />
      <Family />
      <AboutMe />
      <Contact />
      <ThankYou />
    </main>
  );
}
