"use client"

import { useState } from "react"
import { miniaturesData } from "@/lib/miniatures-data"
import GalleryCard from "@/components/gallery-card"
import MiniatureModal from "@/components/miniature-modal"
import type { Miniature } from "@/lib/types"

type FilterType = "Todas" | "Miniaturas" | "Warhammer"

export default function GallerySection() {
  const [filter, setFilter] = useState<FilterType>("Todas")
  const [selectedMiniature, setSelectedMiniature] = useState<Miniature | null>(null)

  const filteredMiniatures = miniaturesData
    .filter((miniature) => {
      if (filter === "Todas") return true
      return miniature.tipo === filter
    })
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

  return (
    <section id="galeria" className="py-20 px-4 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1D1D1D]">Galería de Miniaturas</h2>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(["Todas", "Miniaturas", "Warhammer"] as FilterType[]).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === filterOption
                  ? "bg-[#0cd4ca] text-white"
                  : "bg-white text-[#1D1D1D] hover:bg-[#B0B0B0] hover:text-white"
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMiniatures.map((miniature) => (
            <GalleryCard key={miniature.id} miniature={miniature} onClick={() => setSelectedMiniature(miniature)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMiniature && <MiniatureModal miniature={selectedMiniature} onClose={() => setSelectedMiniature(null)} />}
    </section>
  )
}
