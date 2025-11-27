export default function ContactSection() {
  return (
    <section id="contacto" className="py-20 px-4 bg-[#F7F7F7]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1D1D1D]">Contacto</h2>

        <div className="flex justify-center gap-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1D1D1D] hover:text-[#0cd4ca] transition-colors"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram fa-3x"></i>
          </a>

          <a
            href="mailto:beta.painter.miniatures@gmail.com"
            className="text-[#1D1D1D] hover:text-[#0cd4ca] transition-colors"
            aria-label="Email"
          >
            <i className="fas fa-envelope fa-3x"></i>
          </a>
        </div>

        <p className="mt-12 text-[#B0B0B0]">
          © {new Date().getFullYear()} Álvaro Palacios. Todos los derechos reservados.
        </p>
      </div>
    </section>
  )
}
