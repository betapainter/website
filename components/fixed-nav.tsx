"use client"

import { useState, useEffect } from "react"

export default function FixedNav() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "galeria", "eventos", "contacto"]
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "galeria", label: "Galería" },
    { id: "eventos", label: "Eventos" },
    { id: "contacto", label: "Contacto" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1D1D1D]/95 backdrop-blur-sm border-b border-[#B0B0B0]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <button onClick={() => scrollToSection("inicio")} className="hover:opacity-80 transition-opacity">
            <img src="/logo.jpg" alt="Álvaro Palacios" className="h-10 w-auto object-contain" />
          </button>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 md:px-4 py-2 text-sm md:text-base font-medium rounded-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-[#00BCD4] text-white"
                      : "text-[#F7F7F7] hover:text-[#00BCD4] hover:bg-[#F7F7F7]/10"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
