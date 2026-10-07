import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Stats from "./components/Stats.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Models from "./components/Models.jsx";
import Features from "./components/Features.jsx";
import Download from "./components/Download.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Models />
        <Stats />
        <HowItWorks />
        <Features />
        <Download />
      </main>
      <Footer />
    </>
  );
}
