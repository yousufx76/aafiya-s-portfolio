import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import aafiya from "../assets/aafia-char.png"

const ticker = ["Visual Identity", "Illustration", "UI Design", "Editorial", "Branding", "Logo Design", "Typography", "Digital Art"]

export default function Hero() {
  const [time, setTime] = useState("")
  const glowRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, "0")
      const m = String(now.getMinutes()).padStart(2, "0")
      setTime(`${h}.${m} WIB`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      if (!glowRef.current) return
      glowRef.current.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <section
      id="home"
      className="sticky top-0 w-full h-screen bg-[#F5EFE6] overflow-hidden flex flex-col"
    >
      {/* Ambient Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-0 hidden md:block"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.13) 0%, transparent 70%)",
          transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          top: 0,
          left: 0,
        }}
      />

      {/* Top Meta Row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-between items-center px-6 md:px-10 pt-20 md:pt-24 text-[#3a0a0a] text-xs font-mono tracking-widest uppercase relative z-10"
      >
        <span className="hidden md:block">{time}</span>
        <span className="text-[#C0392B] font-black text-xs md:text-sm tracking-[0.4em]">✦ XANIN XZ</span>
        <span>DHAKA, BD</span>
      </motion.div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-1 relative flex-col items-center justify-end">

        {/* Mobile big text top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-4 left-0 right-0 flex justify-between px-6 z-10"
        >
          <h1 className="text-[18vw] font-black text-[#C0392B] leading-none tracking-tighter uppercase select-none">
            VISUAL
          </h1>
          <h1 className="text-[18vw] font-black text-[#C0392B] leading-none tracking-tighter uppercase select-none self-end">
            ARTIST
          </h1>
        </motion.div>

        {/* Mobile Character */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-20 flex items-end"
          style={{ bottom: "-2px" }}
        >
          <img
            src={aafiya}
            alt="Aafiya Noor"
            className="h-[72vh] w-auto object-contain object-bottom block drop-shadow-2xl"
          />
        </motion.div>

        {/* Mobile Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-14 left-6 z-30"
        >
          <p className="text-[#3a0a0a] font-black text-sm tracking-[0.3em] uppercase">Aafiya Noor</p>
          <p className="text-[#C0392B] text-[10px] tracking-widest uppercase font-mono">Graphics Designer — XANIN XZ</p>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 relative items-center justify-between px-8">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col justify-center gap-6 z-10 max-w-[22vw]"
        >
          <h1 className="text-[9vw] font-black text-[#C0392B] leading-none tracking-tighter uppercase select-none">
            VISUAL
          </h1>
          <div className="flex flex-col gap-2 border-l-2 border-[#C0392B] pl-4">
            {["Branding", "Logo Design", "Typography", "Digital Art"].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-xs font-mono text-[#3a0a0a] tracking-widest uppercase"
              >
                — {s}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[11px] font-mono text-[#3a0a0a] tracking-wider leading-relaxed"
          >
            Creative mind behind the visuals<br />at XANIN XZ. Every pixel is intentional.
          </motion.p>
        </motion.div>

        {/* Desktop Character */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-1/2 -translate-x-1/2 z-20 flex items-end"
          style={{ bottom: "-2px" }}
        >
          <img
            src={aafiya}
            alt="Aafiya Noor"
            className="h-[88vh] w-auto object-contain object-bottom block drop-shadow-2xl"
          />
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-end justify-center gap-6 z-10 max-w-[22vw]"
        >
          <h1 className="text-[9vw] font-black text-[#C0392B] leading-none tracking-tighter uppercase select-none">
            ARTIST
          </h1>
          <div className="flex flex-col items-end gap-2 border-r-2 border-[#C0392B] pr-4">
            {["Visual Identity", "Illustration", "UI Design", "Editorial"].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-xs font-mono text-[#3a0a0a] tracking-widest uppercase"
              >
                {s} —
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[11px] font-mono text-[#3a0a0a] tracking-wider leading-relaxed text-right"
          >
            Graphics Designer<br />XANIN XZ — Dhaka, Bangladesh
          </motion.p>
        </motion.div>

      </div>

      {/* Desktop Name — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-12 left-10 z-30 hidden md:block"
      >
        <p className="text-[#3a0a0a] font-black text-base tracking-[0.4em] uppercase">Aafiya Noor</p>
        <p className="text-[#C0392B] text-[10px] tracking-widest uppercase font-mono">Graphics Designer — XANIN XZ</p>
      </motion.div>

      {/* Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full bg-[#C0392B] py-2 overflow-hidden relative z-10"
      >
        <div className="flex justify-around whitespace-nowrap">
          {ticker.map((item, i) => (
            <span key={i} className="text-white text-xs font-black tracking-widest uppercase mx-2 md:mx-4">
              {item} <span className="opacity-50">✦</span>
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}