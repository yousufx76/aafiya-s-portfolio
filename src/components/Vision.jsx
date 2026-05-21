import { motion } from "framer-motion"

const philosophies = [
  {
    number: "01",
    title: "Clean",
    desc: "Clarity over complexity. Every element earns its place on the canvas. Nothing is accidental.",
  },
  {
    number: "02",
    title: "Bold",
    desc: "Design should speak before words do. Strong typography, strong identity, strong impact.",
  },
  {
    number: "03",
    title: "Purposeful",
    desc: "Art without intention is decoration. Every project starts with a why and ends with a statement.",
  },
]

export default function Vision() {
  return (
    <section
      id="vision"
      className="relative z-10 w-full min-h-screen bg-[#1a0a0a] flex flex-col justify-center px-6 md:px-10 py-28 md:py-24 overflow-hidden"
    >
      {/* Section Label */}
      <div className="absolute top-10 left-10 flex items-center gap-4">
        <span className="text-[#C0392B] font-mono text-xs tracking-widest">// 004</span>
        <span className="w-16 h-[1px] bg-[#C0392B]" />
        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">Vision</span>
      </div>

      {/* Big Background Text */}
      <p className="absolute right-0 top-1/2 -translate-y-1/2 text-white/[0.03] font-black text-[18vw] leading-none tracking-tighter uppercase select-none pointer-events-none">
        VISION
      </p>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-20">

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <span className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — Design Philosophy
          </span>
          <h2 className="text-white font-black text-4xl md:text-6xl leading-tight tracking-tight max-w-3xl">
            "Every pixel<br />is intentional."
          </h2>
          <p className="text-white/40 font-mono text-sm leading-relaxed max-w-xl">
            Design is not decoration — it is communication. Aafiya approaches 
            every project with precision, purpose, and a relentless commitment 
            to craft. From the first sketch to the final export.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="w-8 h-[1px] bg-[#C0392B]" />
            <span className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
              Aafiya Noor — XANIN XZ
            </span>
          </div>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {philosophies.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group flex flex-col gap-4 border border-white/10 p-8 hover:border-[#C0392B] transition-all duration-500"
            >
              <span className="text-[#C0392B] font-mono text-xs tracking-widest">
                {p.number}
              </span>
              <h3 className="text-white font-black text-3xl tracking-tight group-hover:text-[#C0392B] transition-colors duration-300">
                {p.title}.
              </h3>
              <p className="text-white/40 font-mono text-xs leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}