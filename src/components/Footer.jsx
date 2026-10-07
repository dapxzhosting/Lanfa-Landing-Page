import Logo from "./Logo.jsx";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#model", label: "Model" },
  { href: "#cara", label: "Cara kerja" },
  { href: "#fitur", label: "Fitur" },
  { href: "#unduh", label: "Unduh" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/dapxzhosting", label: "GitHub" },
  { href: "https://dafaalfiansyah.my.id", label: "Portofolio" },
];

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <motion.div
        className="footer-grid"
        style={styles.top}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-brand" style={styles.brandCol}>
          <span style={styles.logo}>
            <Logo size={34} color="var(--ink)" spin delay={0.2} />
            Lanfa
          </span>
          <p style={styles.tagline}>
            Satu asisten AI, tiga model, dan bahasa yang kamu pilih sendiri.
          </p>
        </div>

        <div style={styles.linkCol}>
          <span style={styles.colTitle}>Navigasi</span>
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} style={styles.link}>
              {item.label}
            </a>
          ))}
        </div>

        <div style={styles.linkCol}>
          <span style={styles.colTitle}>Terhubung</span>
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>

      <div style={styles.bottom}>
        <span style={styles.copy}>
          © {new Date().getFullYear()} Lanfa. Dibuat oleh Dap.
        </span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: "1px solid var(--line)",
    marginTop: "clamp(40px, 8vw, 72px)",
    background: "var(--paper-raised)",
  },
  top: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "clamp(36px, 6vw, 56px) clamp(24px, 6vw, 32px) clamp(24px, 4vw, 32px)",
  },
  brandCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: "32ch",
    marginBottom: 8,
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-display)",
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  tagline: {
    color: "var(--ink-soft)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    margin: 0,
  },
  linkCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 120,
  },
  colTitle: {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "var(--violet-deep)",
    letterSpacing: "0.02em",
    marginBottom: 2,
  },
  link: {
    textDecoration: "none",
    color: "var(--ink-soft)",
    fontSize: "0.9rem",
    width: "fit-content",
  },
  bottom: {
    borderTop: "1px solid var(--line)",
    maxWidth: 1120,
    margin: "0 auto",
    padding: "16px clamp(24px, 6vw, 32px)",
  },
  copy: {
    color: "var(--ink-soft)",
    fontSize: "0.8rem",
  },
};