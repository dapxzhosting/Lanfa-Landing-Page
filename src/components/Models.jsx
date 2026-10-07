import { motion } from "framer-motion";

const MODELS = [
  {
    emoji: "⚡",
    name: "GPT SAFEGUARD 20b",
    tag: "Paling teliti",
    desc: "Buat pertanyaan yang butuh jawaban panjang dan hati-hati, bukan cuma cepat.",
  },
  {
    emoji: "🦙",
    name: "Llama 3.1-8b Instant",
    tag: "Tercepat · Multimodal",
    desc: "Respons hampir seketika, dan bisa langsung diajak lihat foto yang kamu kirim.",
  },
  {
    emoji: "🧠",
    name: "Qwen3.7-max",
    tag: "Pintar + baca gambar",
    desc: "Pilihan seimbang saat kamu butuh analisis yang lebih dalam dari sebuah gambar.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Models() {
  return (
    <section id="model" style={{ padding: "clamp(36px, 8vw, 56px) 0" }}>
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          Ganti kapan saja
        </motion.p>
        <motion.h2
          style={styles.h2}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Tiga model, satu percakapan yang sama.
        </motion.h2>
        <motion.p
          style={styles.p}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Mulai dari yang tercepat, lalu pindah ke yang paling teliti di tengah obrolan,
          histori dan konteksnya tetap ikut.
        </motion.p>

        <motion.div
          className="model-row"
          style={{ marginTop: 32 }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {MODELS.map((m) => (
            <motion.div
              key={m.name}
              style={styles.card}
              variants={item}
              whileHover={{
                y: -8,
                boxShadow: "0 22px 40px -18px rgba(28,26,34,0.28)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <motion.div
                style={styles.emoji}
                whileHover={{ scale: 1.2, rotate: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                {m.emoji}
              </motion.div>
              <h3 style={styles.cardTitle}>{m.name}</h3>
              <p style={styles.cardTag}>{m.tag}</p>
              <p style={styles.cardDesc}>{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 600,
    margin: "10px 0 12px",
    maxWidth: "20ch",
  },
  p: {
    color: "var(--ink-soft)",
    fontSize: "1rem",
    lineHeight: 1.6,
    maxWidth: "56ch",
  },
  card: {
    background: "var(--paper-raised)",
    borderRadius: 20,
    padding: "26px 22px",
  },
  emoji: { fontSize: "1.6rem", marginBottom: 14, display: "inline-block" },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "1.15rem",
    fontWeight: 600,
    margin: "0 0 4px",
  },
  cardTag: {
    color: "var(--violet-deep)",
    fontSize: "0.8rem",
    fontWeight: 600,
    margin: "0 0 12px",
  },
  cardDesc: {
    color: "var(--ink-soft)",
    fontSize: "0.9rem",
    lineHeight: 1.55,
    margin: 0,
  },
};
