import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "Branding", "Logo", "Digital Art", "Illustration", "Editorial"]

export default function WorksPage() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState("All")
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const q = query(collection(db, "works"), orderBy("createdAt", "desc"))
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

  const filtered = active === "All"
    ? works
    : works.filter((w) => w.category === active)

  const placeholders = [
    { id: "p1", title: "Brand Identity Vol.1", category: "Branding", imageUrl: null },
    { id: "p2", title: "Logo Suite", category: "Logo", imageUrl: null },
    { id: "p3", title: "Digital Illustration", category: "Digital Art", imageUrl: null },
    { id: "p4", title: "Editorial Layout", category: "Editorial", imageUrl: null },
    { id: "p5", title: "Visual Identity", category: "Branding", imageUrl: null },
    { id: "p6", title: "Character Art", category: "Illustration", imageUrl: null },
  ]

  const displayWorks = works.length > 0 ? filtered : placeholders

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex items-center justify-between bg-[#F5EFE6]/80 backdrop-blur-md border-b border-[#3a0a0a]/10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#3a0a0a] hover:text-[#C0392B] transition-colors duration-300 font-mono text-xs tracking-widest uppercase"
        >
          ← Back
        </button>
        <div className="font-black text-[#3a0a0a] text-lg tracking-widest uppercase">
          Akira <span className="text-[#C0392B]">Nozomi</span>
        </div>
        <a
          href="https://xaninxz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C0392B] font-mono text-xs tracking-widest uppercase hover:text-[#3a0a0a] transition-colors duration-300"
        >
          XANIN XZ →
        </a>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-12"
        >
          <span className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — All Projects
          </span>
          <h1 className="text-[#3a0a0a] font-black text-5xl md:text-7xl leading-none tracking-tight">
            All Works.
          </h1>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                active === cat
                  ? "bg-[#C0392B] border-[#C0392B] text-white"
                  : "border-[#3a0a0a]/20 text-[#3a0a0a]/50 hover:border-[#C0392B] hover:text-[#C0392B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#3a0a0a]/30 font-mono text-xs tracking-widest uppercase animate-pulse">
              Loading works...
            </p>
          </div>
        ) : displayWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <span className="text-[#3a0a0a]/10 font-black text-6xl">✦</span>
            <p className="text-[#3a0a0a]/30 font-mono text-xs tracking-widest uppercase">
              No works in this category yet
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {displayWorks.map((work, i) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
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
                        <span className="text-[#3a0a0a]/20 font-black text-6xl">✦</span>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#C0392B]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer Strip */}
      <div className="w-full bg-[#C0392B] py-3 flex justify-center">
        <p className="text-white font-mono text-[10px] tracking-widest uppercase">
          Akira Nozomi — XANIN XZ © 2026
        </p>
      </div>

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
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full object-cover max-h-[70vh]"
                />
              )}

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
    </div>
  )
}