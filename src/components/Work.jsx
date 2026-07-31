import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Work() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const q = query(
          collection(db, "works"),
          orderBy("createdAt", "desc"),
          limit(3)
        )
        const snap = await getDocs(q)
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setWorks(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  const placeholders = [
    { id: "p1", title: "Brand Identity", category: "Branding", imageUrl: null },
    { id: "p2", title: "Logo Design", category: "Logo", imageUrl: null },
    { id: "p3", title: "Digital Illustration", category: "Digital Art", imageUrl: null },
  ]

  const displayWorks = works.length > 0 ? works : placeholders

  return (
    <section
      id="work"
      className="relative z-10 w-full min-h-screen bg-[#F5EFE6] flex flex-col px-6 md:px-10 py-20 md:py-24"
    >
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-[#C0392B] font-mono text-xs tracking-widest">// 003</span>
        <span className="w-16 h-[1px] bg-[#C0392B]" />
        <span className="text-[#3a0a0a]/30 font-mono text-xs tracking-widest uppercase">Work</span>
      </div>

      {/* Heading */}
      <div className="flex justify-between items-end mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#3a0a0a] font-black text-4xl md:text-6xl leading-tight tracking-tight"
        >
          Selected<br />Works.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[#3a0a0a]/40 font-mono text-xs tracking-widest uppercase max-w-[200px] text-right"
        >
          Latest projects from Akira's creative desk
        </motion.p>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-[#3a0a0a]/30 font-mono text-xs tracking-widest uppercase animate-pulse">
            Loading works...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayWorks.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              onClick={() => work.imageUrl && setSelected(work)}
              className="relative group overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] bg-[#e8ddd0] overflow-hidden">
                {work.imageUrl ? (
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 font-black text-6xl">✕</span>
                  </div>
                )}
              </div>

              {/* Hover Overlay — only shows on hover */}
              <div className="absolute inset-0 bg-[#C0392B]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 pointer-events-none">
                <p className="text-white/70 font-mono text-[10px] tracking-widest uppercase mb-1">
                  {work.category}
                </p>
                <p className="text-white font-black text-xl tracking-tight">
                  {work.title}
                </p>
                <p className="text-white/60 font-mono text-xs mt-2 tracking-widest uppercase">
                  Click to view →
                </p>
              </div>

              {/* Bottom Label */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-[#3a0a0a] font-bold text-sm tracking-wide">
                  {work.title}
                </p>
                <p className="text-[#3a0a0a]/40 font-mono text-[10px] tracking-widest uppercase">
                  {work.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        <button
          onClick={() => navigate("/works")}
          className="group flex items-center gap-4 border border-[#3a0a0a] px-10 py-4 hover:bg-[#C0392B] hover:border-[#C0392B] transition-all duration-300"
        >
          <span className="text-[#3a0a0a] group-hover:text-white font-black text-xs tracking-widest uppercase transition-colors duration-300">
            View All Work
          </span>
          <span className="text-[#C0392B] group-hover:text-white transition-colors duration-300">→</span>
        </button>
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#1a0a0a] max-w-3xl w-full overflow-hidden"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 text-white/40 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
              >
                ✕ Close
              </button>

              {/* Image */}
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full object-cover max-h-[70vh]"
              />

              {/* Info */}
              <div className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-[#C0392B] font-mono text-[10px] tracking-widest uppercase mb-1">
                    {selected.category}
                  </p>
                  <p className="text-white font-black text-xl tracking-tight">
                    {selected.title}
                  </p>
                  {selected.description && (
                    <p className="text-white/40 font-mono text-xs mt-2 leading-relaxed">
                      {selected.description}
                    </p>
                  )}
                </div>
                <img src="/logo.png" alt="AN" className="w-12 h-12 object-contain opacity-10" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}