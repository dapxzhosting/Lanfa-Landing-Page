import { motion } from "framer-motion";

const APK_URL = "/lanfa.apk";

export default function Download() {
  return (
    <section id="unduh" style={{ padding: "clamp(28px, 6vw, 40px) 0 clamp(56px, 12vw, 88px)" }}>
      <motion.div
        className="wrap"
        style={styles.panel}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="eyebrow"
          style={{ color: "#c9c2ff" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ayo mulai
        </motion.p>
        <motion.h2
          style={styles.h2}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          Bawa Lanfa di sakumu.
        </motion.h2>
        <motion.p
          style={styles.p}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          Gratis, jalan di Android, dan siap ganti model kapan pun kamu butuh
          jawaban yang berbeda.
        </motion.p>
        <motion.a
          href={APK_URL}
          download="lanfa.apk"
          className="btn"
          style={styles.btn}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(92,78,224,0.35)",
              "0 0 0 14px rgba(92,78,224,0)",
              "0 0 0 0 rgba(92,78,224,0)",
            ],
          }}
          transition={{
            default: { duration: 0.5, delay: 0.3 },
            boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1 },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 14px 28px -10px rgba(92, 78, 224, 0.55)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          Unduh APK terbaru
        </motion.a>
      </motion.div>
    </section>
  );
}

const styles = {
  panel: {
    background: "var(--ink)",
    color: "#f4f1ff",
    borderRadius: 28,
    padding: "clamp(36px, 9vw, 56px) clamp(22px, 7vw, 40px)",
    textAlign: "center",
  },
  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 600,
    margin: "10px 0 14px",
  },
  p: {
    color: "#bcb8cf",
    maxWidth: "42ch",
    margin: "0 auto 28px",
    lineHeight: 1.6,
  },
  btn: {
    background: "var(--violet)",
    color: "#fff",
  },
};