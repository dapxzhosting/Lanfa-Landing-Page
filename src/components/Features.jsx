import { motion } from "framer-motion";

const FEATURES = [
  {
    label: "Dwibahasa",
    text: "Antarmuka dan deteksi bahasa otomatis untuk Indonesia dan Inggris, jadi Lanfa menjawab dalam bahasa yang kamu pakai tanpa perlu ganti pengaturan.",
  },
  {
    label: "Lihat foto",
    text: "Kirim foto ke model yang mendukung vision, dan Lanfa membacanya langsung di dalam obrolan yang sama.",
  },
  {
    label: "Tema kamu",
    text: "Atur warna aksen dan pilih terang, gelap, atau ikut sistem, tampilan menyesuaikan seketika di seluruh aplikasi.",
  },
  {
    label: "Riwayat rapi",
    text: "Cari percakapan lama, sematkan yang penting, ganti judul, regenerasi jawaban yang kurang pas, atau bagikan dan hapus sesi kapan pun dibutuhkan.",
  },
  {
    label: "Personalisasi gaya",
    text: "Pilih gaya bicara Lanfa: Profesional, Ramah, Jujur, Nyentrik, Efisien, atau Sinis, lalu tambahkan instruksi khusus, nama, dan pekerjaanmu supaya jawabannya terasa lebih personal.",
  },
  {
    label: "Masuk sesukamu",
    text: "Login dengan Google atau Facebook untuk sinkronisasi antar perangkat, atau langsung coba sebagai Tamu tanpa daftar.",
  },
  {
    label: "Tetap jalan di belakang",
    text: "Pindah ke aplikasi lain sambil Lanfa mengetik, notifikasi memberi tahu begitu jawabannya selesai.",
  },
  {
    label: "Markdown & kode rapi",
    text: "Blok kode, daftar, dan teks tebal dirender langsung di dalam chat, bukan teks mentah yang berantakan.",
  },
];

export default function Features() {
  return (
    <section id="fitur" style={{ padding: "clamp(36px, 8vw, 56px) 0" }}>
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          Di bawah kap mesin
        </motion.p>
        <motion.h2
          style={styles.h2}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Dibuat rapi untuk dipakai tiap hari.
        </motion.h2>

        <div style={{ marginTop: 24 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              className="feature-row"
              key={f.label}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4 }}
            >
              <span style={styles.label}>{f.label}</span>
              <p style={styles.text}>{f.text}</p>
            </motion.div>
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
  label: {
    fontFamily: "var(--font-display)",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
  text: {
    color: "var(--ink-soft)",
    fontSize: "0.98rem",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: "62ch",
  },
};
