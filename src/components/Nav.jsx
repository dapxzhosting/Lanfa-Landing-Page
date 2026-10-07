import { useEffect, useRef, useState } from "react";
import Logo from "./Logo.jsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const LINKS = [
  { href: "#model", label: "Model" },
  { href: "#cara", label: "Cara kerja" },
  { href: "#fitur", label: "Fitur" },
  { href: "#unduh", label: "Unduh" },
];

const APP_URL = "https://lanfa.vercel.app";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  function handleHashClick(event, href) {
    if (!href || !href.startsWith("#")) return;

    event.preventDefault();

    // Lepas kunci scroll SEKARANG, sebelum scrollTo. Kalau menunggu useEffect,
    // body masih overflow:hidden saat scrollTo dipanggil, jadi halaman tidak bergeser.
    document.body.style.overflow = "";
    setOpen(false);

    const target = document.querySelector(href);
    if (!target) {
      history.replaceState(null, "", href);
      return;
    }

    // Tunggu satu frame supaya layout stabil setelah kunci scroll dilepas
    requestAnimationFrame(() => {
      const yOffset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", href);
    });
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current;
    setHidden(goingDown && y > 120 && !open);
    lastY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      style={styles.header}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{
        y: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.6, ease: "easeOut" },
      }}
    >
      <div className="wrap" style={styles.inner}>
        <motion.a
          href="#"
          aria-label="Lanfa - ke atas"
          style={styles.logo}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Logo size={30} color="var(--ink)" delay={0.3} />
          <span>Lanfa</span>
        </motion.a>

        <nav className="nav-links">
          {LINKS.map((item, i) => (
            <NavLink key={item.href} {...item} delay={0.25 + i * 0.07} onClick={handleHashClick} />
          ))}
        </nav>

        <div style={styles.right}>
          <motion.a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary nav-cta"
            style={styles.cta}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.045, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            Coba di Web
          </motion.a>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={styles.burgerBox}>
              <motion.span
                style={styles.burgerLine}
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <motion.span
                style={styles.burgerLine}
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                style={styles.burgerLine}
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={styles.mobileLinks}>
              {LINKS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  style={styles.mobileLink}
                  onClick={(event) => {
                    handleHashClick(event, item.href);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                style={styles.mobileCta}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + LINKS.length * 0.05 }}
              >
                Coba di Web ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, label, delay, onClick }) {
  return (
    <motion.a
      href={href}
      style={styles.link}
      onClick={(event) => onClick(event, href)}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <span style={{ position: "relative", display: "inline-block" }}>
        {label}
        <motion.span
          style={styles.underline}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </span>
    </motion.a>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(250, 246, 239, 0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid var(--line)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "var(--ink)",
    fontFamily: "var(--font-display)",
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
    color: "var(--ink-soft)",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  underline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -3,
    height: 1.5,
    background: "var(--violet-deep)",
    transformOrigin: "left",
    borderRadius: 2,
  },
  cta: {
    padding: "10px 20px",
    fontSize: "0.9rem",
  },
  burgerBox: {
    position: "relative",
    width: 20,
    height: 14,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  burgerLine: {
    display: "block",
    width: "100%",
    height: 2,
    borderRadius: 2,
    background: "var(--ink)",
    transformOrigin: "center",
  },
  mobileLinks: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    maxWidth: 1120,
    margin: "0 auto",
    padding: "12px 28px 40px",
  },
  mobileLink: {
    textDecoration: "none",
    color: "var(--ink)",
    fontFamily: "var(--font-display)",
    fontSize: "1.15rem",
    fontWeight: 500,
    padding: "16px 0",
    borderBottom: "1px solid var(--line)",
    width: "100%",
  },
  mobileCta: {
    marginTop: 20,
    alignSelf: "flex-start",
    background: "var(--violet)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
  },
};