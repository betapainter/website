"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Miniature } from "@/lib/types"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface MiniatureModalProps {
  miniature: Miniature
  onClose: () => void
}

export default function MiniatureModal({ miniature, onClose }: MiniatureModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") previousImage()
      if (e.key === "ArrowRight") nextImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentImageIndex])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % miniature.imagenes.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? miniature.imagenes.length - 1 : prev - 1))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1D1D]/95 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#1D1D1D]/80 hover:bg-[#1D1D1D] text-white rounded-md transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image carousel */}
          <div className="relative md:w-2/3 aspect-[3/4] md:aspect-auto bg-[#1D1D1D]">
            <Image
              src={getGoogleDriveImageUrl(miniature.imagenes[currentImageIndex]) || "/placeholder.svg"}
              alt={`${miniature.nombre} - Imagen ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Navigation arrows */}
            {miniature.imagenes.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded-md transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded-md transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#1D1D1D]/80 text-white text-sm rounded-md">
              {currentImageIndex + 1} / {miniature.imagenes.length}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/3 p-6 md:p-8 overflow-y-auto bg-white">
            <h2 className="text-3xl font-bold mb-4 text-[#1D1D1D]">{miniature.nombre}</h2>

            <p className="text-[#B0B0B0] mb-6 leading-relaxed">{miniature.descripcion}</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1D] uppercase tracking-wider mb-2">Fecha</h3>
                <p className="text-[#1D1D1D]">{miniature.fecha}</p>
              </div>

              {miniature.reconocimientos && miniature.reconocimientos.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1D] uppercase tracking-wider mb-2">
                    Reconocimientos
                  </h3>
                  <ul className="space-y-2">
                    {miniature.reconocimientos.map((reconocimiento, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#1D1D1D]">
                        <span className="text-[#00BCD4] mt-1">•</span>
                        <span>{reconocimiento}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1D] uppercase tracking-wider mb-2">Tipo</h3>
                <span className="inline-block px-3 py-1 bg-[#00BCD4] text-white text-sm rounded-md">
                  {miniature.tipo}
                </span>
              </div>
            </div>

            {/* Thumbnail navigation */}
            {miniature.imagenes.length > 1 && (
              <div className="mt-6 pt-6 border-t border-[#B0B0B0]">
                <h3 className="text-sm font-semibold text-[#1D1D1D] uppercase tracking-wider mb-3">
                  Todas las imágenes
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {miniature.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[3/4] overflow-hidden rounded-md ${
                        currentImageIndex === index ? "ring-2 ring-[#00BCD4]" : "opacity-60 hover:opacity-100"
                      } transition-opacity`}
                    >
                      <Image
                        src={getGoogleDriveImageUrl(imagen) || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
