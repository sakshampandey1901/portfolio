import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="max-w-[1600px] mx-auto bg-alabaster w-full hairline-l hairline-r shadow-2xl shadow-espresso/5 bg-[radial-gradient(#1A1614_1px,transparent_1px)] [background-size:24px_24px] [background-position:0_0] relative">
      <div className="absolute inset-0 bg-alabaster/95" style={{ zIndex: 0 }}></div>
      <div className="relative z-10 mix-blend-multiply">
        <div className="hairline-t">
          <Hero />
          <Philosophy />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
    </main>
  );
}
