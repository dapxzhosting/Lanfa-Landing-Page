import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

const STATS = [
  { value: 3, label: "Model AI", note: "ganti kapan saja di tengah obrolan" },
  { value: 2, label: "Bahasa", note: "Indonesia dan Inggris, otomatis" },
  { value: 6, label: "Gaya bicara", note: "dari Profesional sampai Sinis" },
  { value: 100, suffix: "%", label: "Gratis", note: "unduh dan pakai di Android" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { y: -6, transition: { duration: 0.25 } },
};

const bar = {
  hover: { scaleX: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Stats() {
  const scope = useRef(null);

  useEffect(() => {
    const nums = scope.current.querySelectorAll(".stat-num");

    if (prefersReducedMotion) {
      nums.forEach((el) => (el.textContent = el.dataset.target));
      return;
    }

    const ctx = gsap.context(() => {
      nums.forEach((el) => {
        const state = { v: 0 };
        gsap.to(state, {
          v: Number(el.dataset.target),
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(state.v)),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "clamp(28px, 6vw, 44px) 0" }}>
      <div className="wrap">
        <motion.div
          ref={scope}
          className="stats-row"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              style={styles.card}
              variants={card}
              whileHover="hover"
            >
              <div style={styles.numRow}>
                <span className="stat-num" data-target={s.value} style={styles.num}>
                  0
                </span>
                {s.suffix && <span style={styles.suffix}>{s.suffix}</span>}
              </div>
              <p style={styles.label}>{s.label}</p>
              <p style={styles.note}>{s.note}</p>
              <motion.span
                style={styles.accent}
                initial={{ scaleX: 0 }}
                variants={bar}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  card: {
    position: "relative",
    overflow: "hidden",
    background: "var(--paper-raised)",
    borderRadius: 20,
    padding: "24px 22px 26px",
  },
  numRow: { display: "flex", alignItems: "baseline", gap: 2 },
  num: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
    fontWeight: 600,
    lineHeight: 1,
    color: "var(--violet-deep)",
    fontVariantNumeric: "tabular-nums",
  },
  suffix: {
    fontFamily: "var(--font-display)",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "var(--violet-deep)",
  },
  label: { margin: "12px 0 4px", fontWeight: 700, fontSize: "0.95rem" },
  note: { margin: 0, color: "var(--ink-soft)", fontSize: "0.85rem", lineHeight: 1.5 },
  accent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    background: "var(--violet)",
    transformOrigin: "left",
  },
};
