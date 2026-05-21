import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>

        {/* Red curtain wipe IN — covers screen */}
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#C0392B] origin-left pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
        />

        {/* Curtain enters from left */}
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#C0392B] origin-left pointer-events-none"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Page content fades in after curtain */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {children}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}