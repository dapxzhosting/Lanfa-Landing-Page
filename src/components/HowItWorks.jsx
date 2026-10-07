import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

const STEPS = [
  {
    title: "Pilih model",
    tag: "Cepat atau teliti",
    text: "Mulai dari Llama yang hampir seketika, atau langsung pakai GPT SAFEGUARD 20b untuk jawaban yang lebih hati-hati.",
  },
  {
    title: "Mulai ngobrol",
    tag: "Teks atau foto",
    text: "Tulis dalam bahasa Indonesia atau Inggris, atau kirim foto. Lanfa menjawab dalam bahasa yang kamu pakai.",
  },
  {
    title: "Ganti & simpan",
    tag: "Konteks tetap ikut",
    text: "Pindah model di tengah obrolan tanpa mulai dari nol. Semua percakapan tersimpan rapi dan bisa dicari lagi.",
  },
];

export default function HowItWorks() {
  const scope = useRef(null);

  // GSAP ScrollTrigger: garis terisi mengikuti scroll, titik langkah menyala satu per satu
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".step-fill", { scaleY: 1 });
        gsap.set(".step-dot", { backgroundColor: "#5c4ee0", color: "#fff" });
        return;
      }

      gsap.fromTo(
        ".step-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".steps",
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray(".step-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#faf6ef", color: "#1c1a22", scale: 1 },
          {
            backgroundColor: "#5c4ee0",
            color: "#ffffff",
            scale: 1.14,
            duration: 0.45,
            ease: "back.out(2.2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 66%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cara" ref={scope} style={{ padding: "clamp(36px, 8vw, 56px) 0" }}>
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          Cara kerja
        </motion.p>
        <motion.h2
          style={styles.h2}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Tiga langkah, langsung jalan.
        </motion.h2>

        <div className="steps" style={styles.steps}>
          <div className="step-track" style={styles.track}>
            <div className="step-fill" style={styles.fill} />
          </div>

          {STEPS.map((s, i) => (
            <div key={s.title} style={styles.row}>
              <div className="step-dot" style={styles.dot}>
                {i + 1}
              </div>

              <motion.div
                style={styles.card}
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 22px 40px -18px rgba(28,26,34,0.28)",
                  transition: { duration: 0.25 },
                }}
              >
                <motion.span
                  style={styles.tag}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 350, damping: 14 }}
                >
                  {s.tag}
                </motion.span>
                <h3 style={styles.title}>{s.title}</h3>
                <p style={styles.text}>{s.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 600,
    margin: "10px 0 0",
    maxWidth: "20ch",
  },
  steps: { position: "relative", marginTop: 36 },
  track: {
    position: "absolute",
    left: 21,
    top: 22,
    bottom: 22,
    width: 2,
    borderRadius: 2,
    background: "var(--line)",
  },
  fill: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
    background: "var(--violet)",
    transformOrigin: "top",
    transform: "scaleY(0)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 20,
    paddingBottom: 28,
    alignItems: "start",
  },
  dot: {
    position: "relative",
    zIndex: 1,
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "1.1rem",
    background: "var(--paper)",
    border: "2px solid var(--violet)",
  },
  card: {
    background: "var(--paper-raised)",
    borderRadius: 20,
    padding: "22px 24px",
  },
  tag: {
    display: "inline-block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--violet-deep)",
    background: "rgba(92,78,224,0.12)",
    padding: "4px 12px",
    borderRadius: 100,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "12px 0 6px",
  },
  text: {
    margin: 0,
    color: "var(--ink-soft)",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    maxWidth: "58ch",
  },
};
