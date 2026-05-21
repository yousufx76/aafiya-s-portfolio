import { motion } from "framer-motion"

const skills = [
  { name: "Branding", percent: 90 },
  { name: "Logo Design", percent: 85 },
  { name: "Typography", percent: 92 },
  { name: "Digital Art", percent: 88 },
  { name: "Visual Identity", percent: 80 },
  { name: "Illustration", percent: 75 },
  { name: "UI Design", percent: 70 },
  { name: "Editorial", percent: 78 },
]

const tags = [
  "Adobe Illustrator", "Photoshop", "Figma",
  "Procreate", "InDesign", "After Effects",
  "Canva Pro", "Lightroom"
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 w-full min-h-screen bg-[#1a0a0a] flex items-center px-6 md:px-10 py-28 md:py-24 border-t border-white/5"
    >
      {/* Section Label */}
      <div className="absolute top-10 left-10 flex items-center gap-4">
        <span className="text-[#C0392B] font-mono text-xs tracking-widest">// 002</span>
        <span className="w-16 h-[1px] bg-[#C0392B]" />
        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">Skills</span>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 pt-10"
        >
          <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — What she brings to the table
          </p>
          <h2 className="text-white font-black text-4xl md:text-5xl leading-tight tracking-tight">
            Skills &<br />Expertise.
          </h2>
          <p className="text-white/40 text-sm font-mono leading-relaxed">
            Years of self-driven practice across branding, 
            visual design, and digital art. Every tool 
            is a means to an intentional end.
          </p>

          {/* Tool Tags */}
          <div className="flex flex-wrap gap-3 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 text-white/50 text-[10px] font-mono tracking-widest uppercase px-3 py-1 hover:border-[#C0392B] hover:text-[#C0392B] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — Skill Bars */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 pt-10"
        >
          {skills.map((skill, i) => (
            <div key={skill.name} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  {skill.name}
                </span>
                <span className="text-[#C0392B] text-xs font-mono">
                  {skill.percent}%
                </span>
              </div>
              <div className="w-full h-[2px] bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-[#C0392B]"
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}