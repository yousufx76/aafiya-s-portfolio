import { motion } from "framer-motion"

const socials = [
  { platform: "Behance", url: "#" },
  { platform: "Instagram", url: "#" },
  { platform: "LinkedIn", url: "#" },
]

export default function FloatingSocials() {
  return (
    <div className="fixed left-6 bottom-1/2 translate-y-1/2 z-[9997] hidden md:flex flex-col items-center gap-6">
      {socials.map((social, i) => (
        <motion.a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-white/40 hover:text-[#C0392B] font-mono text-[10px] tracking-widest uppercase transition-all duration-300 hover:tracking-wider"
        >
          {social.platform}
        </motion.a>
      ))}
      <div className="w-[1px] h-16 bg-white/10" />
    </div>
  )
}