import { motion } from "framer-motion"

const socials = [
  { label: "Behance", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
]

const navLinks = ["Home", "About", "Work", "Vision"]

export default function Footer() {
  const handleNav = (link) => {
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative z-10 w-full bg-[#1a0a0a] border-t border-white/5 px-6 md:px-10 pt-16 md:pt-20 pb-8">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left — Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-white font-black text-5xl leading-none tracking-tight">
              AAFIYA<br />
              <span className="text-[#C0392B]">NOOR.</span>
            </h2>
            <p className="text-white/30 font-mono text-xs tracking-widest uppercase leading-relaxed">
              Graphics Designer<br />
              XANIN XZ — Dhaka, BD
            </p>
          </motion.div>

          {/* Center — Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase mb-2">
              — Navigate
            </p>
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className="text-white/40 hover:text-white font-mono text-xs tracking-widest uppercase text-left transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Right — Socials + XANIN XZ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase mb-2">
              — Find Her
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors duration-300"
              >
                {s.label} →
              </a>
            ))}

            {/* XANIN XZ Link */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase mb-2">
                Part of
              </p>
              <a
                href="https://xanin-xz.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0392B] hover:text-white font-black text-sm tracking-widest uppercase transition-colors duration-300"
              >
                XANIN XZ →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
          <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
            © 2026 Aafiya Noor — All rights reserved
          </p>
          <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase text-left md:text-right">
            No direct contact available on this site.<br />
            Built under XANIN XZ.
          </p>
        </div>
      </div>
    </footer>
  )
}