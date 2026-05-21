import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Stats from "./components/Stats"
import Skills from "./components/Skills"
import Work from "./components/Work"
import Vision from "./components/Vision"
import Footer from "./components/Footer"
import WorksPage from "./pages/WorksPage"
import AdminPage from "./pages/AdminPage"
import ScrollProgress from "./components/ScrollProgress"
import FloatingSocials from "./components/FloatingSocials"
import PageTransition from "./components/PageTransition"
import NotFound from "./pages/NotFound"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Navbar />
            <Hero />
            <About />
            <Stats />
            <Skills />
            <Work />
            <Vision />
            <Footer />
          </PageTransition>
        } />
        <Route path="/works" element={
          <PageTransition>
            <WorksPage />
          </PageTransition>
        } />
        <Route path="/admin" element={
          <PageTransition>
            <AdminPage />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <AnimatedRoutes />
      <FloatingSocials />
    </BrowserRouter>
  )
}

export default App