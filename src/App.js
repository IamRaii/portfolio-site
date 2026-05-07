import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-stone-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
