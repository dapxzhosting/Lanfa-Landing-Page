import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Logo from "./Logo.jsx";
import screenshot from "../assets/lanfa-screenshot.png";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

const APP_URL = "https://lanfa.vercel.app";

const HEADLINE = "Satu obrolan, tiga otak, dan bahasa yang kamu pilih sendiri.";

export default function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(scope.current, { visibility: "visible" })
        .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.5 })
        .from(
          ".hero-word",
          {
            opacity: 0,
            yPercent: 120,
            rotateZ: 4,
            stagger: 0.028,
            duration: 0.75,
          },
          "-=0.2"
        )
        .from(".hero-lede", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 14, scale: 0.94, stagger: 0.1, duration: 0.5 },
          "-=0.3"
        )
        .from(
          ".hero-phone",
          { opacity: 0, y: 30, scale: 0.92, rotateZ: -3, duration: 0.9 },
          "-=0.55"
        );

      gsap.to(".hero-phone", {
        y: "+=10",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.1,
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} style={{ padding: "clamp(44px, 10vw, 72px) 0 clamp(28px, 6vw, 40px)", visibility: prefersReducedMotion ? "visible" : "hidden" }}>
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow hero-eyebrow">Asisten AI untuk Android</p>
          <h1 style={styles.h1}>
            {HEADLINE.split(" ").map((word, i) => (
              <span key={i} style={styles.wordMask}>
                <span className="hero-word" style={styles.wordInner}>
                  {word}
                  {i < HEADLINE.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-lede" style={styles.lede}>
            Lanfa membiarkan kamu pindah dari model yang cepat ke model yang paling teliti
            di tengah percakapan, tetap dalam satu sesi, tetap dalam bahasa Indonesia
            atau Inggris, tanpa harus mulai dari nol.
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <motion.a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Coba Lanfa di Web
            </motion.a>
            <motion.a
              href="#fitur"
              className="btn btn-ghost"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Lihat semua fitur
            </motion.a>
          </div>
        </div>

        <div className="hero-phone" style={{ position: "relative" }}>
          <div style={styles.bgLogo} aria-hidden="true">
            <Logo size="100%" color="var(--violet)" spin hoverable={false} delay={0.9} />
          </div>
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMouseMove(e) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      style={{ ...styles.phoneFrame, rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.phoneNotch} />
      <img
        src={screenshot}
        alt="Tampilan chat Lanfa dengan model GPT SAFEGUARD 20b"
        style={styles.screenshot}
      />
    </motion.div>
  );
}

const styles = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.1rem, 4vw, 3rem)",
    lineHeight: 1.12,
    fontWeight: 600,
    margin: "18px 0 22px",
    maxWidth: "13ch",
  },
  wordMask: {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "top",
  },
  wordInner: {
    display: "inline-block",
  },
  lede: {
    fontSize: "1.05rem",
    lineHeight: 1.6,
    color: "var(--ink-soft)",
    maxWidth: "46ch",
    margin: "0 0 30px",
  },
  bgLogo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "125%",
    maxWidth: 520,
    aspectRatio: "1",
    transform: "translate(-50%, -50%)",
    opacity: 0.1,
    zIndex: 0,
    pointerEvents: "none",
  },
  phoneFrame: {
    zIndex: 1,
    position: "relative",
    background: "var(--ink)",
    borderRadius: 40,
    padding: 10,
    maxWidth: 300,
    marginInline: "auto",
    boxShadow: "0 30px 60px -20px rgba(28,26,34,0.35)",
  },
  phoneNotch: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 90,
    height: 18,
    background: "var(--ink)",
    borderRadius: "0 0 14px 14px",
    zIndex: 2,
  },
  screenshot: {
    width: "100%",
    borderRadius: 30,
    display: "block",
  },
};