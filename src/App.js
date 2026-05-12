import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      {/* Shell: dark bg default, white in light mode */}
      <div className="min-h-screen bg-ink-950 dark:bg-ink-950 text-stone-300 transition-colors duration-300"
           style={{ backgroundColor: "var(--bg)" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Stack />
          <Process />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
