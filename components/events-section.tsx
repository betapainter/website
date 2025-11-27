import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Taller de Iniciación",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Masterclass Avanzada",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Evento Warhammer",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function EventsSection() {
  return (
    <section id="eventos" className="py-20 px-4 bg-[#1D1D1D]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#F7F7F7]">Eventos Presenciales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg group">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
