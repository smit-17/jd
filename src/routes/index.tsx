import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow, FloatingDecor } from "@/components/Decor";
import { CursorSplash, PageIntro, Parallax, PerfMode, SmoothScroll } from "@/components/Motion";
import { Hero } from "@/components/Hero";
import { Myself, Professional } from "@/components/Sections";
import { Hobbies, Occupation } from "@/components/Occupation";
import { AboutMe, Family } from "@/components/Family";
import { Contact, ThankYou } from "@/components/Contact";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brijes Pansuriya — Bio Data | Family, Profession & More" },
      {
        name: "description",
        content:
          "Brijes Pansuriya's complete bio data — personal details, family background, education & profession as CEO of LEPDO Diamonds & Jewelry, Surat.",
      },
      { property: "og:title", content: "Brijes Pansuriya — Bio Data | Family, Profession & More" },
      {
        property: "og:description",
        content: "Brijes Pansuriya's complete bio data — personal details, family background, education & profession as CEO of LEPDO Diamonds & Jewelry, Surat.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <PerfMode />
      <PageIntro />
      <SmoothScroll />
      {/* slow moving background texture */}
      <div aria-hidden className="texture-bg pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <CursorGlow />
      <CursorSplash />

      <div className="relative">
        <Parallax speed={-70} className="pointer-events-none absolute inset-0">
          <FloatingDecor />
        </Parallax>
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
