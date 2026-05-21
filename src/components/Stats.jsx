import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const stats = [
  { value: 3, suffix: "+", label: "Years", sublabel: "Experience" },
  { value: 50, suffix: "+", label: "Projects", sublabel: "Completed" },
  { value: 100, suffix: "%", label: "Intentional", sublabel: "Design" },
  { value: 999, suffix: "+", label: "Hours", sublabel: "Into The Craft" },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 1800
          const step = Math.ceil(value / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="text-[#C0392B] font-black text-5xl md:text-7xl leading-none tracking-tighter">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative z-10 w-full bg-[#F5EFE6] py-16 md:py-24 px-6 md:px-10 border-t border-[#3a0a0a]/10">

      {/* Top Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-[#C0392B] font-mono text-xs tracking-widest">// 002</span>
        <span className="w-16 h-[1px] bg-[#C0392B]" />
        <span className="text-[#3a0a0a]/30 font-mono text-xs tracking-widest uppercase">In Numbers</span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 group"
          >
            {/* Number */}
            <Counter value={s.value} suffix={s.suffix} />

            {/* Divider */}
            <div className="w-8 h-[2px] bg-[#C0392B] group-hover:w-16 transition-all duration-500" />

            {/* Label */}
            <div className="flex flex-col gap-1">
              <span className="text-[#3a0a0a] font-black text-sm tracking-widest uppercase">
                {s.label}
              </span>
              <span className="text-[#3a0a0a]/40 font-mono text-xs tracking-widest uppercase">
                {s.sublabel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}