export interface Miniature {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  reconocimientos: string[]
  tipo: "Miniaturas" | "Warhammer"
  imagenPrincipal: string
  imagenes: string[]
}
