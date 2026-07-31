import { motion } from "framer-motion"

const facts = [
  { label: "Based in", value: "Dhaka, Bangladesh" },
  { label: "Role", value: "Graphics Designer" },
  { label: "Team", value: "" },
  { label: "Specialty", value: "Visual Identity & Branding" },
  { label: "Status", value: "Available for Projects" },
]

const downloadCV = async () => {
  const { default: jsPDF } = await import("jspdf")
  const { default: html2canvas } = await import("html2canvas")

  const cvDiv = document.createElement("div")
  cvDiv.style.position = "fixed"
  cvDiv.style.top = "-9999px"
  cvDiv.style.left = "-9999px"
  cvDiv.style.width = "794px"
  cvDiv.style.background = "#F5EFE6"
  cvDiv.style.padding = "60px"
  cvDiv.style.fontFamily = "sans-serif"
  cvDiv.style.color = "#1a0a0a"

  cvDiv.innerHTML = `
    <div style="border-bottom: 2px solid #C0392B; padding-bottom: 28px; margin-bottom: 36px;">
      <div style="font-size: 52px; font-weight: 900; letter-spacing: -2px; line-height: 1;">Akira <span style="color:#C0392B">Nozomi.</span></div>
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-top: 10px;">— Graphics Designer / Visual Artist</div>
      <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #1a0a0a99; margin-top: 6px;">Hemayetpur, Savar, Dhaka, Bangladesh &nbsp;|&nbsp; </div>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-bottom: 12px;">// About</div>
      <p style="font-size: 12px; line-height: 1.8; color: #1a0a0a99;">Creative mind behind the visuals at . Akira brings ideas to life through clean design, bold typography and purposeful aesthetics. From brand identities to digital art — every pixel is intentional.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-bottom: 12px;">// Experience</div>
      <div style="margin-bottom: 16px;">
        <div style="font-size: 16px; font-weight: 900;">Graphics Designer</div>
        <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C0392B; margin: 4px 0;"> — 2023 → Present</div>
        <p style="font-size: 12px; line-height: 1.8; color: #1a0a0a99;">Lead visual designer for the  creative team. Responsible for brand identities, digital art, typography systems, and visual direction across all projects.</p>
      </div>
      <div>
        <div style="font-size: 16px; font-weight: 900;">Freelance Visual Designer</div>
        <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C0392B; margin: 4px 0;">Independent — 2022 → Present</div>
        <p style="font-size: 12px; line-height: 1.8; color: #1a0a0a99;">Working with clients across branding, logo design, editorial layouts, and digital illustrations.</p>
      </div>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-bottom: 12px;">// Education</div>
      <div style="font-size: 16px; font-weight: 900;">Higher Secondary Certificate</div>
      <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C0392B; margin: 4px 0;">College, Dhaka — 2021 → 2023</div>
      <p style="font-size: 12px; color: #1a0a0a99;">She will update this with her actual education details.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-bottom: 12px;">// Skills & Tools</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${["Branding", "Logo Design", "Typography", "Digital Art", "Illustration", "UI Design", "Editorial", "Visual ID", "Illustrator", "Photoshop", "Figma", "Procreate", "InDesign", "Canva Pro"].map(s => `
          <div style="border: 1px solid #C0392B44; padding: 6px 12px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">${s}</div>
        `).join("")}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px;">
      <div style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C0392B; margin-bottom: 12px; grid-column: span 2;">// Details</div>
      ${[
      ["Location", "Savar, Dhaka, BD"],
      ["Team", ""],
      ["Experience", "3+ Years"],
      ["Projects", "50+ Completed"],
      ["Specialty", "Visual Identity"],
      ["Status", "Available"],
    ].map(([l, v]) => `
        <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #1a0a0a11; padding-bottom: 8px;">
          <span style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#1a0a0a55;">${l}</span>
          <span style="font-size:10px; letter-spacing:2px; text-transform:uppercase; font-weight:700;">${v}</span>
        </div>
      `).join("")}
    </div>

    <div style="border-top: 1px solid #C0392B33; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#1a0a0a55;">© 2026 Akira Nozomi — All rights reserved</span>
      <span style="font-weight:900; font-size:13px; letter-spacing:4px; text-transform:uppercase; color:#C0392B;"></span>
    </div>
  `

  document.body.appendChild(cvDiv)

  const canvas = await html2canvas(cvDiv, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#F5EFE6",
  })

  document.body.removeChild(cvDiv)

  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgHeight = (canvas.height * pageWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position -= pageHeight
    pdf.addPage()
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save("Akira-Nozomi-CV.pdf")
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full min-h-screen bg-[#1a0a0a] flex items-center px-6 md:px-10 py-28 md:py-24"
    >
      {/* Section Label */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-4">
        <span className="text-[#C0392B] font-mono text-xs tracking-widest">// 001</span>
        <span className="w-16 h-[1px] bg-[#C0392B]" />
        <span className="text-white/30 font-mono text-xs tracking-widest uppercase">About</span>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Left — Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#C0392B] z-0" />
          <img
            src="https://res.cloudinary.com/dtbktsy5v/image/upload/v1779265298/aafia-about.png"
            alt="Akira Nozomi"
            className="relative z-10 w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 z-20 bg-[#C0392B] px-4 py-2">
            <p className="text-white text-xs font-black tracking-widest uppercase">Akira Nozomi</p>
            <p className="text-white/70 text-[10px] font-mono tracking-widest"> — Visual Designer</p>
          </div>
        </motion.div>

        {/* Right — Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase mb-3">
              — The person behind the pixels
            </p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight tracking-tight">
              Creative.<br />Intentional.<br />Precise.
            </h2>
          </div>

          <p className="text-white/50 text-sm leading-relaxed font-mono">
            Akira brings ideas
            to life through clean design, bold typography and purposeful
            aesthetics. From brand identities to digital art — every pixel
            is intentional.
          </p>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center justify-between">
                <span className="text-white/30 text-xs font-mono tracking-widest uppercase">
                  {f.label}
                </span>
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="w-8 h-[1px] bg-[#C0392B]" />
            <span className="text-[#C0392B] text-xs font-black tracking-[0.3em] uppercase">
              Member of 
            </span>
          </div>

          {/* Download CV Button */}
          <button
            onClick={downloadCV}
            className="group flex items-center gap-4 border border-white/20 px-8 py-4 hover:bg-[#C0392B] hover:border-[#C0392B] transition-all duration-300 w-fit mt-2"
          >
            <span className="text-white/60 group-hover:text-white font-black text-xs tracking-widest uppercase transition-colors duration-300">
              Download CV
            </span>
            <span className="text-[#C0392B] group-hover:text-white transition-colors duration-300">↓</span>
          </button>

        </motion.div>
      </div>
    </section>
  )
}