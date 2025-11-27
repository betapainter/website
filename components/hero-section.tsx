import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#1D1D1D] text-[#F7F7F7]"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo placeholder */}
        <div className="w-32 h-32 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-[#00BCD4] flex items-center justify-center text-4xl font-bold text-white">
            AP
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-pretty">Álvaro Palacios</h1>

        <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-2xl mx-auto text-balance">
          Pintor de miniaturas y warhammer
        </p>

        <div className="pt-8">
          <Button asChild size="lg" className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white text-lg px-8 py-6 rounded-md">
            <a href="https://forms.gle/aQNxmSDmU2BakDsL7" target="_blank" rel="noopener noreferrer">
              ¿Quieres aprender a pintar?
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#00BCD4]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
