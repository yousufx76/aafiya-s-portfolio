import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = ["Home", "About", "Work", "Vision"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNav = (link) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(link.toLowerCase())
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-[#F5EFE6]/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AN Logo" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
          <span className="text-[#3a0a0a] font-black text-base md:text-xl tracking-widest uppercase">
            Akira <span className="text-[#C0392B]">Nozomi</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleNav(link)}
                className="text-[#3a0a0a] text-sm font-semibold tracking-widest uppercase relative group transition-colors duration-300 hover:text-[#C0392B]"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C0392B] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://xaninxz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 border border-[#C0392B] text-[#C0392B] text-xs font-bold tracking-widest uppercase px-5 py-2 hover:bg-[#C0392B] hover:text-white transition-all duration-300"
        >
          Part of XANIN XZ <span>→</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-50"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-[#C0392B] block"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-[2px] bg-[#C0392B] block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-[#C0392B] block"
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#F5EFE6] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleNav(link)}
                className="text-[#3a0a0a] font-black text-4xl tracking-widest uppercase hover:text-[#C0392B] transition-colors duration-300"
              >
                {link}
              </motion.button>
            ))}

            {/* XANIN XZ link */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="https://xaninxz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#C0392B] text-[#C0392B] text-xs font-bold tracking-widest uppercase px-8 py-3 mt-4"
            >
              Part of XANIN XZ →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}