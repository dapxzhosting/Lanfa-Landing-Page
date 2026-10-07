import { useEffect, useRef } from "react";
import Logo from "./Logo.jsx";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap.js";

const WORDS = [
  "Dwibahasa",
  "Lihat foto",
  "Tiga model",
  "Riwayat rapi",
  "Tema kamu",
  "Markdown & kode",
  "Gaya bicara",
];

// GSAP: ticker tak berujung. Saat halaman di-scroll cepat, ticker ikut ngebut
// (pakai velocity ScrollTrigger), lalu pelan-pelan kembali normal.
export default function Marquee() {
  const scope = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const loop = gsap.to(".mq-track", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 6);
          gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.1, delay: 0.2, ease: "power2.out" });
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  const row = WORDS.map((w) => (
    <span className="mq-item" key={w}>
      <span>{w}</span>
      <Logo size={18} color="var(--violet)" hoverable={false} />
    </span>
  ));

  return (
    <div ref={scope} className="mq" aria-hidden="true">
      <div className="mq-track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
