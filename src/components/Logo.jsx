import { motion, useReducedMotion } from "framer-motion";

// Kelopak diambil dari ic_lanfa_logo.xml (viewport 100x100)
const PETALS = [
  "M50,50 C58,38 58,22 50,12 C42,22 42,38 50,50 Z",
  "M50,50 C62,46 72,35 76,26 C65,24 54,31 50,50 Z",
  "M50,50 C62,42 76,42 88,50 C76,58 62,58 50,50 Z",
  "M50,50 C62,54 72,65 76,74 C65,76 54,69 50,50 Z",
  "M50,50 C58,62 58,78 50,88 C42,78 42,62 50,50 Z",
  "M50,50 C38,54 28,65 24,74 C35,76 46,69 50,50 Z",
  "M50,50 C38,42 24,42 12,50 C24,58 38,58 50,50 Z",
  "M50,50 C38,46 28,35 24,26 C35,24 46,31 50,50 Z"
];

/**
 * Logo Lanfa beranimasi.
 * - Intro: kelopak mekar satu per satu dari tengah
 * - Idle  : berputar sangat pelan (spin)
 * - Hover : berputar 45° dengan efek spring
 */
export default function Logo({
  size = 32,
  color = "currentColor",
  spin = false,
  hoverable = true,
  delay = 0,
  style,
  className,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Logo Lanfa"
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      whileHover={hoverable && !reduce ? { rotate: 45, scale: 1.08 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 14 }}
    >
      <motion.g
        style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}
        animate={spin && !reduce ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spin && !reduce
            ? { duration: 48, ease: "linear", repeat: Infinity }
            : { duration: 0 }
        }
      >
        {PETALS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill={color}
            style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}
            initial={reduce ? false : { scale: 0, opacity: 0, rotate: -40 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 13,
              delay: delay + i * 0.07,
            }}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}
