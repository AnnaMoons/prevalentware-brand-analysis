'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const INDEX_FILE = '00 - INDICE MAESTRO.md'

const files = [
  { name: 'Indice Maestro', file: INDEX_FILE, category: 'Inicio' },
  { name: 'MT 1 - Arquetipos de Audiencia', file: 'MT 1 - Arquetipos de Audiencia.md', category: 'MT' },
  { name: 'MT 2 - Fundamentos de Marca', file: 'MT 2 - Fundamentos de Marca.md', category: 'MT' },
  { name: 'MT 3 - The Feel Map', file: 'MT 3 - The Feel Map.md', category: 'MT' },
  { name: 'MT 4 - Mapa Emocional de Deseos', file: 'MT 4 - Mapa Emocional de Deseos.md', category: 'MT' },
  { name: 'MT 5 - Clasificación de Deseos', file: 'MT 5 - Clasificación de Deseos.md', category: 'MT' },
  { name: 'MT 6 - Attitudinal Journey', file: 'MT 6 - Attitudinal Journey.md', category: 'MT' },
  { name: 'MT 7 - The Brand Ego', file: 'MT 7 - The Brand Ego.md', category: 'MT' },
  { name: 'MT 8 - MaxPyramid', file: 'MT 8 - MaxPyramid.md', category: 'MT' },
  { name: 'MT 9 - The Brand Territory', file: 'MT 9 - The Brand Territory.md', category: 'MT' },
  { name: 'MT 10 - ABC Roll Axis', file: 'MT 10 - ABC Roll Axis.md', category: 'MT' },
  { name: 'MT 11 - Revolution Matrix', file: 'MT 11 - Revolution Matrix.md', category: 'MT' },
  { name: 'MT 12 - The 5 Friends', file: 'MT 12 - The 5 Friends.md', category: 'MT' },
  { name: 'MT 13 - Tools Driver', file: 'MT 13 - Tools Driver.md', category: 'MT' },
  { name: 'MT 14 - ADN Tool', file: 'MT 14 - ADN Tool.md', category: 'MT' },
  { name: 'MT 15 - Mensaje y Propósito', file: 'MT 15 - Mensaje y Propósito.md', category: 'MT' },
  { name: 'MT 16 - Estructura Operativa', file: 'MT 16 - Estructura Operativa.md', category: 'MT' },
  { name: 'MT 17 - Síntesis del Valor Central', file: 'MT 17 - Síntesis del Valor Central.md', category: 'MT' },
  { name: 'MT 18 - Desarrollo Integral del Valor', file: 'MT 18 - Desarrollo Integral del Valor.md', category: 'MT' },
  { name: 'MT 19 - Declaración de Posicionamiento', file: 'MT 19 - Declaración de Posicionamiento.md', category: 'MT' },
  { name: 'MT 20 - Componentes del Modelo', file: 'MT 20 - Componentes del Modelo.md', category: 'MT' },
  { name: 'MT 21 - Propósito Check', file: 'MT 21 - Propósito Check.md', category: 'MT' },
  { name: 'MT 22 - Sistema de Valores', file: 'MT 22 - Sistema de Valores.md', category: 'MT' },
  { name: 'MT 23 - Valores en Acción', file: 'MT 23 - Valores en Acción.md', category: 'MT' },
  { name: 'MT 24 - Tools Drive 3', file: 'MT 24 - Tools Drive 3.md', category: 'MT' },
  { name: 'MT 25 - Identidad y Activos de Marca', file: 'MT 25 - Identidad y Activos de Marca.md', category: 'MT' },
  { name: 'MT 26 - The Brand Symbol', file: 'MT 26 - The Brand Symbol.md', category: 'MT' },
  { name: 'MT 27 - Brand Charisma Archetypes', file: 'MT 27 - Brand Charisma Archetypes.md', category: 'MT' },
  { name: 'MT 28 - Tone of Voice Path', file: 'MT 28 - Tone of Voice Path.md', category: 'MT' },
  { name: 'MT 29 - Naming', file: 'MT 29 - Naming.md', category: 'MT' },
  { name: 'MT 30 - Full Brand Board', file: 'MT 30 - Full Brand Board.md', category: 'MT' },
  { name: 'MT 31 - The Sense Square', file: 'MT 31 - The Sense Square.md', category: 'MT' },
  { name: 'MT 32 - Why We', file: 'MT 32 - Why We.md', category: 'MT' },
  { name: 'MT 33 - Brand Narratives', file: 'MT 33 - Brand Narratives.md', category: 'MT' },
  { name: 'MT 34 - Brand Rituals', file: 'MT 34 - Brand Rituals.md', category: 'MT' },
  { name: 'MT 35 - The 10 Golden Moments', file: 'MT 35 - The 10 Golden Moments.md', category: 'MT' },
  { name: 'MT 36 - The Burn Pyramid', file: 'MT 36 - The Burn Pyramid.md', category: 'MT' },
  { name: 'MT 37 - Brand Power', file: 'MT 37 - Brand Power.md', category: 'MT' },
  { name: 'MT 38 - Devotion Journey', file: 'MT 38 - Devotion Journey.md', category: 'MT' },
  { name: 'MT 39 - Ejercicios Arquetipos', file: 'MT 39 - Ejercicios Arquetipos.md', category: 'MT' },
  { name: 'MT 40 - Personificación de Marca', file: 'MT 40 - Personificación de Marca.md', category: 'MT' },
  { name: 'SB 1 - Carta de Intencion', file: 'SB 1 - Carta de Intencion.md', category: 'SB' },
  { name: 'SB 2 - Reconocimiento de Lote', file: 'SB 2 - Reconocimiento de Lote.md', category: 'SB' },
  { name: 'SB 3 - Brujula Estrategica', file: 'SB 3 - Brujula Estrategica.md', category: 'SB' },
  { name: 'SB 4 - Lista Negra', file: 'SB 4 - Lista Negra de Perdidas Innegociables.md', category: 'SB' },
  { name: 'SB 5 - Mapa de Fugas', file: 'SB 5 - Mapa de Fugas.md', category: 'SB' },
  { name: 'SB 6 - Canvas', file: 'SB 6 - Canvas - A la gente como nosotros.md', category: 'SB' },
  { name: 'SB 7 - Dolor + Contenido', file: 'SB 7 - Dolor + Contenido.md', category: 'SB' },
  { name: 'SB 8 - Brand Building vs Sales', file: 'SB 8 - Brand Building vs Sales Activation.md', category: 'SB' },
  { name: 'SB 9 - El Rey', file: 'SB 9 - El Rey.md', category: 'SB' },
  { name: 'VN 1 - Explora tu Marca', file: 'VN 1 - Explora tu Marca.md', category: 'VN' },
  { name: 'VN 2 - Diversifica Ideas', file: 'VN 2 - Diversifica tus Ideas y Explora tus Suenos.md', category: 'VN' },
  { name: 'VN 3 - Diversifica Objetivos', file: 'VN 3 - Diversifica Objetivos Visibilidad y Comunicacion.md', category: 'VN' },
  { name: 'VN 4 - Diversifica Ingresos', file: 'VN 4 - Diversifica Ingresos y Monetiza tu Talento.md', category: 'VN' },
  { name: 'VN 5 - Crea tu Plan', file: 'VN 5 - Crea tu Plan.md', category: 'VN' },
]

const getCategoryName = (cat: string) => {
  const categories: Record<string, string> = {
    'Inicio': 'Inicio',
    'MT': 'Marketing Templates',
    'SB': 'Strategic Blocks',
    'VN': 'Vision Notes',
  }
  return categories[cat] || cat
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [history, setHistory] = useState<string[]>([])

  const currentFile = files.find(f => f.file === selectedFile)

  useEffect(() => {
    if (selectedFile) {
      setLoading(true)
      fetch(`/api/markdown?file=${encodeURIComponent(selectedFile)}`)
        .then((res) => res.text())
        .then((text) => {
          setContent(text)
          setLoading(false)
        })
        .catch(() => {
          setContent('Error al cargar el archivo')
          setLoading(false)
        })
    }
  }, [selectedFile])

  const navigateTo = (file: string) => {
    if (selectedFile) {
      setHistory(prev => [...prev, selectedFile])
    }
    setSelectedFile(file)
  }

  const goBack = () => {
    const prevFile = history[history.length - 1]
    if (prevFile) {
      setHistory(prev => prev.slice(0, -1))
      setSelectedFile(prevFile)
    }
  }

  const goHome = () => {
    setHistory([])
    setSelectedFile(INDEX_FILE)
  }

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.endsWith('.md')) {
      e.preventDefault()
      try {
        const decoded = decodeURIComponent(href)
        navigateTo(decoded)
      } catch {
        navigateTo(href)
      }
    }
  }

  const mtFiles = files.filter(f => f.category === 'MT')
  const sbFiles = files.filter(f => f.category === 'SB')
  const vnFiles = files.filter(f => f.category === 'VN')

  return (
    <div className="flex h-screen">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
      >
        {sidebarOpen ? '◀' : '▶'}
      </button>

      <aside
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 flex-shrink-0`}
      >
        <div className="p-6 pt-16">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            PrevalentWare
            <span className="block text-sm font-normal text-gray-500 mt-1">
              Análisis de Marca
            </span>
          </h1>
          
          <nav className="space-y-1 mb-4">
            <button
              onClick={goHome}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedFile === INDEX_FILE
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Indice Maestro
            </button>
          </nav>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">MT - Marketing</h3>
            <nav className="space-y-1">
              {mtFiles.map((item) => (
                <button
                  key={item.file}
                  onClick={() => navigateTo(item.file)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedFile === item.file
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SB - Strategic</h3>
            <nav className="space-y-1">
              {sbFiles.map((item) => (
                <button
                  key={item.file}
                  onClick={() => navigateTo(item.file)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedFile === item.file
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">VN - Vision</h3>
            <nav className="space-y-1">
              {vnFiles.map((item) => (
                <button
                  key={item.file}
                  onClick={() => navigateTo(item.file)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedFile === item.file
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : content ? (
          <div className="min-h-full">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-4xl mx-auto px-8 py-3">
                <div className="flex items-center justify-between">
                  <nav className="flex items-center space-x-2 text-sm">
                    <button
                      onClick={goHome}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Inicio
                    </button>
                    {currentFile && currentFile.category !== 'Inicio' && (
                      <>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-500">{getCategoryName(currentFile.category)}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{currentFile.name}</span>
                      </>
                    )}
                    {currentFile && currentFile.category === 'Inicio' && (
                      <>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">Indice Maestro</span>
                      </>
                    )}
                  </nav>
                  <div className="flex items-center space-x-2">
                    {history.length > 0 && (
                      <button
                        onClick={goBack}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Atrás</span>
                      </button>
                    )}
                    <button
                      onClick={goHome}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Indice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <article className="max-w-4xl mx-auto p-8 bg-white min-h-full shadow-sm">
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        onClick={(e) => href && handleLinkClick(href, e)}
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-lg">Selecciona un documento del menú lateral</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
