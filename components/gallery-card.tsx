"use client"

import { useState } from "react"
import Image from "next/image"
import type { Miniature } from "@/lib/types"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface GalleryCardProps {
  miniature: Miniature
  onClick: () => void
}

export default function GalleryCard({ miniature, onClick }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-white rounded-sm shadow-md transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Image
        src={getGoogleDriveImageUrl(miniature.imagenPrincipal) || "/placeholder.svg"}
        alt={miniature.nombre}
        fill
        className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
      />

      {/* Overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-[#1D1D1D]/80 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1">{miniature.nombre}</h3>
          <p className="text-sm text-[#B0B0B0]">{miniature.fecha}</p>
        </div>
      </div>
    </div>
  )
}
