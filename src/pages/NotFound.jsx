import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import chibi from "../assets/chibi-404.png"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1a0a0a] flex flex-col items-center justify-center overflow-hidden relative px-6 md:px-10">

      {/* Ambient glow */}
      <div className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Big 404 background text */}
      <p className="absolute text-white/[0.03] font-black select-none pointer-events-none"
        style={{ fontSize: "28vw", lineHeight: 1, letterSpacing: "-4px" }}
      >
        404
      </p>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">

        {/* Chibi character */}
        <motion.img
          src={chibi}
          alt="Lost Aafiya"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-72 object-contain drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 30px rgba(192,57,43,0.3))"
          }}
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — Error 404
          </p>
          <h1 className="text-white font-black text-4xl md:text-6xl leading-none tracking-tight">
            Page Not<br />Found.
          </h1>
          <p className="text-white/40 font-mono text-sm leading-relaxed max-w-sm">
            Looks like Aafiya couldn't find this page either.<br />
            Even she's confused — and she designs everything around here.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 bg-[#C0392B] text-white font-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#a93226] transition-colors duration-300"
          >
            ← Go Home
          </button>
          <button
            onClick={() => navigate("/works")}
            className="group flex items-center gap-3 border border-white/20 text-white/60 font-black text-xs tracking-widest uppercase px-8 py-4 hover:border-[#C0392B] hover:text-white transition-all duration-300"
          >
            View Works →
          </button>
        </motion.div>

        {/* XANIN XZ tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-3"
        >
          <span className="w-6 h-[1px] bg-[#C0392B]" />
          <span className="text-[#C0392B] font-mono text-[10px] tracking-widest uppercase">
            Aafiya Noor — XANIN XZ
          </span>
          <span className="w-6 h-[1px] bg-[#C0392B]" />
        </motion.div>

      </div>
    </div>
  )
}