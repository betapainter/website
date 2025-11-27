export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1D1D1D] text-[#F7F7F7]">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold">Sitio HTML Puro</h1>
        <p className="text-lg text-[#B0B0B0]">Este proyecto ha sido convertido a HTML, CSS y JavaScript puro.</p>
        <p className="text-[#B0B0B0]">
          Para ver el sitio, descarga el proyecto y abre el archivo{" "}
          <code className="bg-[#2D2D2D] px-2 py-1 rounded">index.html</code> en tu navegador.
        </p>
        <div className="space-y-4 pt-4">
          <div className="p-4 bg-[#2D2D2D] rounded-lg text-left">
            <h2 className="font-semibold mb-2 text-[#0cd4ca]">Archivos principales:</h2>
            <ul className="space-y-1 text-sm text-[#B0B0B0]">
              <li>📄 index.html - Página principal</li>
              <li>🎨 styles.css - Estilos</li>
              <li>⚙️ script.js - Funcionalidad</li>
              <li>📊 data.js - Datos de miniaturas</li>
            </ul>
          </div>
          <div className="p-4 bg-[#2D2D2D] rounded-lg text-left">
            <h2 className="font-semibold mb-2 text-[#0cd4ca]">Para desplegar:</h2>
            <p className="text-sm text-[#B0B0B0]">
              Sube estos archivos a cualquier hosting estático como GitHub Pages, Netlify, o Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
