import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
  collection, addDoc, getDocs,
  deleteDoc, doc, orderBy, query, serverTimestamp
} from "firebase/firestore"
import {
  getAuth, signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "firebase/auth"

const auth = getAuth()
const CLOUD_NAME = "dtbktsy5v"
const UPLOAD_PRESET = "aafia_portfolio"
const categories = ["Branding", "Logo", "Digital Art", "Illustration", "Editorial"]

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [works, setWorks] = useState([])
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Branding")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    if (user) fetchWorks()
  }, [user])

  const fetchWorks = async () => {
    const q = query(collection(db, "works"), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    setWorks(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  const handleLogin = async () => {
    setAuthError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setAuthError("Invalid email or password.")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    if (!imageFile || !title) {
      setError("Please provide an image and title.")
      return
    }
    setUploading(true)
    setError("")
    setSuccess("")
    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append("file", imageFile)
      formData.append("upload_preset", UPLOAD_PRESET)
      formData.append("folder", "aafia")

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      )
      const data = await res.json()

      if (!data.secure_url) throw new Error("Cloudinary upload failed")

      // Save to Firestore
      await addDoc(collection(db, "works"), {
        title,
        category,
        description,
        imageUrl: data.secure_url,
        createdAt: serverTimestamp()
      })

      setSuccess("Work uploaded successfully!")
      setTitle("")
      setCategory("Branding")
      setDescription("")
      setImageFile(null)
      setPreview(null)
      fetchWorks()
    } catch (err) {
      setError("Upload failed. Try again.")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this work?")) return
    await deleteDoc(doc(db, "works", id))
    fetchWorks()
  }

  // ── Login Screen ──
  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-white font-black text-3xl tracking-widest uppercase">
              Akira <span className="text-[#C0392B]">ADMIN</span>
            </h1>
            <p className="text-white/30 font-mono text-xs tracking-widest uppercase mt-2">
              Restricted Access
            </p>
          </div>

          <div className="flex flex-col gap-4 border border-white/10 p-8">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white/10 text-white font-mono text-sm px-4 py-3 outline-none focus:border-[#C0392B] transition-colors placeholder:text-white/20 tracking-widest"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-transparent border border-white/10 text-white font-mono text-sm px-4 py-3 outline-none focus:border-[#C0392B] transition-colors placeholder:text-white/20 tracking-widest"
            />
            {authError && (
              <p className="text-[#C0392B] font-mono text-xs tracking-widest">{authError}</p>
            )}
            <button
              onClick={handleLogin}
              className="bg-[#C0392B] text-white font-black text-xs tracking-widest uppercase py-3 hover:bg-[#a93226] transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Admin Dashboard ──
  return (
    <div className="min-h-screen bg-[#1a0a0a] px-10 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-white font-black text-2xl tracking-widest uppercase">
            Akira <span className="text-[#C0392B]">ADMIN</span>
          </h1>
          <p className="text-white/30 font-mono text-xs tracking-widest mt-1">
            {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-white/10 text-white/40 font-mono text-xs tracking-widest uppercase px-5 py-2 hover:border-[#C0392B] hover:text-[#C0392B] transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">

        {/* Left — Upload Form */}
        <div className="flex flex-col gap-6">
          <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — Upload New Work
          </p>

          {/* Image Upload */}
          <div
            onClick={() => document.getElementById("imgInput").click()}
            className="w-full aspect-video bg-white/5 border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-[#C0392B] transition-colors duration-300 overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/20 text-4xl">+</span>
                <span className="text-white/20 font-mono text-xs tracking-widest uppercase">
                  Click to upload image
                </span>
              </div>
            )}
          </div>
          <input
            id="imgInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Title */}
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border border-white/10 text-white font-mono text-sm px-4 py-3 outline-none focus:border-[#C0392B] transition-colors placeholder:text-white/20 tracking-widest"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#1a0a0a] border border-white/10 text-white font-mono text-sm px-4 py-3 outline-none focus:border-[#C0392B] transition-colors tracking-widest"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Description */}
          <textarea
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="bg-transparent border border-white/10 text-white font-mono text-sm px-4 py-3 outline-none focus:border-[#C0392B] transition-colors placeholder:text-white/20 tracking-widest resize-none"
          />

          {/* Messages */}
          {error && <p className="text-[#C0392B] font-mono text-xs tracking-widest">{error}</p>}
          {success && <p className="text-green-400 font-mono text-xs tracking-widest">{success}</p>}

          {/* Submit */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-[#C0392B] text-white font-black text-xs tracking-widest uppercase py-4 hover:bg-[#a93226] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Work"}
          </button>
        </div>

        {/* Right — Works List */}
        <div className="flex flex-col gap-4">
          <p className="text-[#C0392B] font-mono text-xs tracking-widest uppercase">
            — Manage Works ({works.length})
          </p>

          {works.length === 0 ? (
            <div className="flex items-center justify-center h-40 border border-white/5">
              <p className="text-white/20 font-mono text-xs tracking-widest uppercase">
                No works yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="flex items-center gap-4 border border-white/10 p-4 hover:border-white/20 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-white/5 overflow-hidden flex-shrink-0">
                    {work.imageUrl ? (
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/20 text-xl">✦</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm tracking-wide truncate">
                      {work.title}
                    </p>
                    <p className="text-[#C0392B] font-mono text-[10px] tracking-widest uppercase">
                      {work.category}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-white/20 hover:text-[#C0392B] font-mono text-xs tracking-widest uppercase transition-colors duration-300 flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}