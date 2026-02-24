'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const INDEX_FILE = '00 - INDICE MAESTRO.md'

const files = [
  { name: 'Indice Maestro', file: INDEX_FILE, category: 'Inicio', slug: 'indice' },
  
  { name: 'MT 1 - The Dog Matrix', file: 'MT 1 - The Dog Matrix.md', category: 'MT', slug: 'mt-1-dog-matrix' },
  { name: 'MT 2 - The Feel Map', file: 'MT 2 - The Feel Map.md', category: 'MT', slug: 'mt-2-feel-map' },
  { name: 'MT 3 - Brand Desire Canvas', file: 'MT 3 - Brand Desire Canvas.md', category: 'MT', slug: 'mt-3-brand-desire-canvas' },
  { name: 'MT 4 - Attitudinal Journey', file: 'MT 4 - Attitudinal Journey.md', category: 'MT', slug: 'mt-4-attitudinal-journey' },
  { name: 'MT 5 - The Brand Ego', file: 'MT 5 - The Brand Ego.md', category: 'MT', slug: 'mt-5-brand-ego' },
  { name: 'MT 6 - MaxPyramid', file: 'MT 6 - MaxPyramid.md', category: 'MT', slug: 'mt-6-maxpyramid' },
  { name: 'MT 7 - The Brand Territory', file: 'MT 7 - The Brand Territory.md', category: 'MT', slug: 'mt-7-brand-territory' },
  { name: 'MT 8 - ABC Roll Axis', file: 'MT 8 - ABC Roll Axis.md', category: 'MT', slug: 'mt-8-abc-roll-axis' },
  { name: 'MT 9 - Revolution Matrix', file: 'MT 9 - Revolution Matrix.md', category: 'MT', slug: 'mt-9-revolution-matrix' },
  { name: 'MT 10 - The 5 Friends', file: 'MT 10 - The 5 Friends.md', category: 'MT', slug: 'mt-10-5-friends' },
  { name: 'MT 11 - ADN Tool', file: 'MT 11 - ADN Tool.md', category: 'MT', slug: 'mt-11-adn-tool' },
  { name: 'MT 12 - Los 5 qués del branding', file: 'MT 12 - Los 5 ques del branding.md', category: 'MT', slug: 'mt-12-5-ques' },
  { name: 'MT 13 - The Core Value', file: 'MT 13 - The Core Value.md', category: 'MT', slug: 'mt-13-core-value' },
  { name: 'MT 14 - Brand Positioning Model', file: 'MT 14 - Brand Positioning Model.md', category: 'MT', slug: 'mt-14-brand-positioning' },
  { name: 'MT 15 - Propósito Check', file: 'MT 15 - Propósito Check.md', category: 'MT', slug: 'mt-15-proposito-check' },
  { name: 'MT 16 - Brand Values', file: 'MT 16 - Brand Values.md', category: 'MT', slug: 'mt-16-brand-values' },
  { name: 'MT 17 - Identidad y Activos', file: 'MT 17 - Identidad y Activos de Marca.md', category: 'MT', slug: 'mt-17-identidad-activos' },
  { name: 'MT 18 - The Brand Symbol', file: 'MT 18 - The Brand Symbol.md', category: 'MT', slug: 'mt-18-brand-symbol' },
  { name: 'MT 19 - Brand Charisma Archetypes', file: 'MT 19 - Brand Charisma Archetypes.md', category: 'MT', slug: 'mt-19-charisma-archetypes' },
  { name: 'MT 20 - Tone of Voice Path', file: 'MT 20 - Tone of Voice Path.md', category: 'MT', slug: 'mt-20-tone-of-voice' },
  { name: 'MT 21 - Naming', file: 'MT 21 - Naming.md', category: 'MT', slug: 'mt-21-naming' },
  { name: 'MT 22 - Full Brand Board', file: 'MT 22 - Full Brand Board.md', category: 'MT', slug: 'mt-22-full-brand-board' },
  { name: 'MT 23 - The Sense Square', file: 'MT 23 - The Sense Square.md', category: 'MT', slug: 'mt-23-sense-square' },
  { name: 'MT 24 - Why We', file: 'MT 24 - Why We.md', category: 'MT', slug: 'mt-24-why-we' },
  { name: 'MT 25 - Brand Narratives', file: 'MT 25 - Brand Narratives.md', category: 'MT', slug: 'mt-25-brand-narratives' },
  { name: 'MT 26 - Brand Rituals', file: 'MT 26 - Brand Rituals.md', category: 'MT', slug: 'mt-26-brand-rituals' },
  { name: 'MT 27 - The 10 Golden Moments', file: 'MT 27 - The 10 Golden Moments.md', category: 'MT', slug: 'mt-27-golden-moments' },
  { name: 'MT 28 - The Burn Pyramid', file: 'MT 28 - The Burn Pyramid.md', category: 'MT', slug: 'mt-28-burn-pyramid' },
  { name: 'MT 29 - Brand Power', file: 'MT 29 - Brand Power.md', category: 'MT', slug: 'mt-29-brand-power' },
  { name: 'MT 30 - Devotion Journey', file: 'MT 30 - Devotion Journey.md', category: 'MT', slug: 'mt-30-devotion-journey' },
  { name: 'MT 31 - Ejercicios Arquetipos', file: 'MT 31 - Ejercicios Arquetipos.md', category: 'MT', slug: 'mt-31-ejercicios-arquetipos' },
  { name: 'MT PERSONALIDAD - Ejercicio Personificación', file: 'MT PERSONALIDAD - Ejercicio Personificacion de Marca - RESPUESTAS.md', category: 'MT', slug: 'mt-personalidad' },
  
  { name: 'SB 1 - Carta de Intención', file: 'SB 1 - Carta de Intencion.md', category: 'SB', slug: 'sb-1-carta-intencion' },
  { name: 'SB 2 - Reconocimiento de Lote', file: 'SB 2 - Reconocimiento de Lote.md', category: 'SB', slug: 'sb-2-reconocimiento-lote' },
  { name: 'SB 3 - Brújula Estratégica', file: 'SB 3 - Brujula Estrategica.md', category: 'SB', slug: 'sb-3-brujula-estrategica' },
  { name: 'SB 4 - Lista Negra', file: 'SB 4 - Lista Negra de Perdidas Innegociables.md', category: 'SB', slug: 'sb-4-lista-negra' },
  { name: 'SB 5 - Mapa de Fugas', file: 'SB 5 - Mapa de Fugas.md', category: 'SB', slug: 'sb-5-mapa-fugas' },
  { name: 'SB 6 - Canvas', file: 'SB 6 - Canvas - A la gente como nosotros.md', category: 'SB', slug: 'sb-6-canvas' },
  { name: 'SB 7 - Dolor + Contenido', file: 'SB 7 - Dolor + Contenido.md', category: 'SB', slug: 'sb-7-dolor-contenido' },
  { name: 'SB 8 - Brand Building vs Sales', file: 'SB 8 - Brand Building vs Sales Activation.md', category: 'SB', slug: 'sb-8-brand-building' },
  { name: 'SB 9 - El Rey', file: 'SB 9 - El Rey.md', category: 'SB', slug: 'sb-9-el-rey' },
  
  { name: 'VN 1 - Explora tu Marca', file: 'VN 1 - Explora tu Marca Personal.md', category: 'VN', slug: 'vn-1-explora-marca' },
  { name: 'VN 2 - Diversifica Ideas', file: 'VN 2 - Diversifica tus Ideas y Explora tus Suenos.md', category: 'VN', slug: 'vn-2-diversifica-ideas' },
  { name: 'VN 3 - Diversifica Objetivos', file: 'VN 3 - Diversifica Objetivos Visibilidad y Comunicacion.md', category: 'VN', slug: 'vn-3-diversifica-objetivos' },
  { name: 'VN 4 - Diversifica Ingresos', file: 'VN 4 - Diversifica Ingresos y Monetiza tu Talento.md', category: 'VN', slug: 'vn-4-diversifica-ingresos' },
  { name: 'VN 5 - Crea tu Plan', file: 'VN 5 - Crea tu Plan.md', category: 'VN', slug: 'vn-5-crea-plan' },
  
  { name: 'User Persona - CEO', file: 'User Personas/User Persona - CEO.md', category: 'UP', slug: 'user-persona-ceo' },
  { name: 'User Persona - CFO', file: 'User Personas/User Persona - CFO.md', category: 'UP', slug: 'user-persona-cfo' },
  { name: 'User Persona - CTO', file: 'User Personas/User Persona - CTO.md', category: 'UP', slug: 'user-persona-cto' },
  { name: 'User Persona - Dir. Operaciones', file: 'User Personas/User Persona - Director Operaciones.md', category: 'UP', slug: 'user-persona-operaciones' },
  { name: 'User Persona - Líder TD', file: 'User Personas/User Persona - Líder Transformación Digital.md', category: 'UP', slug: 'user-persona-lider-td' },
]

const getCategoryName = (cat: string) => {
  const categories: Record<string, string> = {
    'Inicio': 'Inicio',
    'MT': 'Marketing Templates',
    'SB': 'Strategic Blocks',
    'VN': 'Vision Notes',
    'UP': 'User Personas',
  }
  return categories[cat] || cat
}

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [history, setHistory] = useState<string[]>([])

  const currentSlug = searchParams.get('doc') || 'indice'
  
  const currentFile = useMemo(() => {
    return files.find(f => f.slug === currentSlug) || files[0]
  }, [currentSlug])

  useEffect(() => {
    if (currentFile.file) {
      setLoading(true)
      fetch(`/api/markdown?file=${encodeURIComponent(currentFile.file)}`)
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
  }, [currentFile.file])

  const navigateTo = (slug: string) => {
    const file = files.find(f => f.slug === slug)
    if (file) {
      if (currentFile.file) {
        setHistory(prev => [...prev, currentFile.slug])
      }
      router.push(`?doc=${slug}`)
    }
  }

  const goBack = () => {
    if (history.length > 0) {
      const prevSlug = history[history.length - 1]
      setHistory(prev => prev.slice(0, -1))
      router.push(`?doc=${prevSlug}`)
    }
  }

  const goHome = () => {
    setHistory([])
    router.push('?doc=indice')
  }

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.endsWith('.md')) {
      e.preventDefault()
      const file = files.find(f => f.file === href)
      if (file) {
        navigateTo(file.slug)
      }
    }
  }

  const mtFiles = files.filter(f => f.category === 'MT')
  const sbFiles = files.filter(f => f.category === 'SB')
  const vnFiles = files.filter(f => f.category === 'VN')
  const upFiles = files.filter(f => f.category === 'UP')

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
                currentSlug === 'indice'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Indice Maestro
            </button>
          </nav>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">MT - marketing</h3>
            <nav className="space-y-1">
              {mtFiles.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => navigateTo(item.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentSlug === item.slug
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
                  key={item.slug}
                  onClick={() => navigateTo(item.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentSlug === item.slug
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
                  key={item.slug}
                  onClick={() => navigateTo(item.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentSlug === item.slug
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
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">User Personas</h3>
            <nav className="space-y-1">
              {upFiles.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => navigateTo(item.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentSlug === item.slug
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
                    {currentFile.category !== 'Inicio' && (
                      <>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-500">{getCategoryName(currentFile.category)}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{currentFile.name}</span>
                      </>
                    )}
                    {currentFile.category === 'Inicio' && (
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

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  )
}
