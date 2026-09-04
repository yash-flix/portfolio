import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Mind from "@/components/Mind";
import NotesPreview from "@/components/NotesPreview";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Work />
      <Mind />
      <NotesPreview />
      <Timeline />
      <Archive />
      <Contact />
    </>
  );
}
