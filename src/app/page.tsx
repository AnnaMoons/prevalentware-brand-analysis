import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const files: Record<string, string> = {
  'indice': '00 - INDICE MAESTRO.md',
  
  'mt-1-dog-matrix': 'MT 1 - The Dog Matrix.md',
  'mt-2-feel-map': 'MT 2 - The Feel Map.md',
  'mt-3-brand-desire-canvas': 'MT 3 - Brand Desire Canvas.md',
  'mt-4-attitudinal-journey': 'MT 4 - Attitudinal Journey.md',
  'mt-5-brand-ego': 'MT 5 - The Brand Ego.md',
  'mt-6-maxpyramid': 'MT 6 - MaxPyramid.md',
  'mt-7-brand-territory': 'MT 7 - The Brand Territory.md',
  'mt-8-abc-roll-axis': 'MT 8 - ABC Roll Axis.md',
  'mt-9-revolution-matrix': 'MT 9 - Revolution Matrix.md',
  'mt-10-5-friends': 'MT 10 - The 5 Friends.md',
  'mt-11-adn-tool': 'MT 11 - ADN Tool.md',
  'mt-12-5-ques': 'MT 12 - Los 5 ques del branding.md',
  'mt-13-core-value': 'MT 13 - The Core Value.md',
  'mt-14-brand-positioning': 'MT 14 - Brand Positioning Model.md',
  'mt-15-proposito-check': 'MT 15 - Propósito Check.md',
  'mt-16-brand-values': 'MT 16 - Brand Values.md',
  'mt-17-identidad-activos': 'MT 17 - Identidad y Activos de Marca.md',
  'mt-18-brand-symbol': 'MT 18 - The Brand Symbol.md',
  'mt-19-charisma-archetypes': 'MT 19 - Brand Charisma Archetypes.md',
  'mt-20-tone-of-voice': 'MT 20 - Tone of Voice Path.md',
  'mt-21-naming': 'MT 21 - Naming.md',
  'mt-22-full-brand-board': 'MT 22 - Full Brand Board.md',
  'mt-23-sense-square': 'MT 23 - The Sense Square.md',
  'mt-24-why-we': 'MT 24 - Why We.md',
  'mt-25-brand-narratives': 'MT 25 - Brand Narratives.md',
  'mt-26-brand-rituals': 'MT 26 - Brand Rituals.md',
  'mt-27-golden-moments': 'MT 27 - The 10 Golden Moments.md',
  'mt-28-burn-pyramid': 'MT 28 - The Burn Pyramid.md',
  'mt-29-brand-power': 'MT 29 - Brand Power.md',
  'mt-30-devotion-journey': 'MT 30 - Devotion Journey.md',
  'mt-31-ejercicios-arquetipos': 'MT 31 - Ejercicios Arquetipos.md',
  'mt-personalidad': 'MT PERSONALIDAD - Ejercicio Personificacion de Marca - RESPUESTAS.md',
  
  'sb-1-carta-intencion': 'SB 1 - Carta de Intencion.md',
  'sb-2-reconocimiento-lote': 'SB 2 - Reconocimiento de Lote.md',
  'sb-3-brujula-estrategica': 'SB 3 - Brujula Estrategica.md',
  'sb-4-lista-negra': 'SB 4 - Lista Negra de Perdidas Innegociables.md',
  'sb-5-mapa-fugas': 'SB 5 - Mapa de Fugas.md',
  'sb-6-canvas': 'SB 6 - Canvas - A la gente como nosotros.md',
  'sb-7-dolor-contenido': 'SB 7 - Dolor + Contenido.md',
  'sb-8-brand-building': 'SB 8 - Brand Building vs Sales Activation.md',
  'sb-9-el-rey': 'SB 9 - El Rey.md',
  
  'vn-1-explora-marca': 'VN 1 - Explora tu Marca Personal.md',
  'vn-2-diversifica-ideas': 'VN 2 - Diversifica tus Ideas y Explora tus Suenos.md',
  'vn-3-diversifica-objetivos': 'VN 3 - Diversifica Objetivos Visibilidad y Comunicacion.md',
  'vn-4-diversifica-ingresos': 'VN 4 - Diversifica Ingresos y Monetiza tu Talento.md',
  'vn-5-crea-plan': 'VN 5 - Crea tu Plan.md',
  
  'user-persona-cfo': 'User Personas/User Persona - CFO.md',
  'user-persona-cto': 'User Personas/User Persona - CTO.md',
  'user-persona-ceo': 'User Personas/User Persona - CEO.md',
  'user-persona-operaciones': 'User Personas/User Persona - Director Operaciones.md',
  'user-persona-lider-td': 'User Personas/User Persona - Líder Transformación Digital.md',
}

const fileNames: Record<string, string> = {
  'indice': 'Índice Maestro',
  'mt-1-dog-matrix': 'MT 1 - The Dog Matrix',
  'mt-2-feel-map': 'MT 2 - The Feel Map',
  'mt-3-brand-desire-canvas': 'MT 3 - Brand Desire Canvas',
  'mt-4-attitudinal-journey': 'MT 4 - Attitudinal Journey',
  'mt-5-brand-ego': 'MT 5 - The Brand Ego',
  'mt-6-maxpyramid': 'MT 6 - MaxPyramid',
  'mt-7-brand-territory': 'MT 7 - The Brand Territory',
  'mt-8-abc-roll-axis': 'MT 8 - ABC Roll Axis',
  'mt-9-revolution-matrix': 'MT 9 - Revolution Matrix',
  'mt-10-5-friends': 'MT 10 - The 5 Friends',
  'mt-11-adn-tool': 'MT 11 - ADN Tool',
  'mt-12-5-ques': 'MT 12 - Los 5 qués del branding',
  'mt-13-core-value': 'MT 13 - The Core Value',
  'mt-14-brand-positioning': 'MT 14 - Brand Positioning Model',
  'mt-15-proposito-check': 'MT 15 - Propósito Check',
  'mt-16-brand-values': 'MT 16 - Brand Values',
  'mt-17-identidad-activos': 'MT 17 - Identidad y Activos',
  'mt-18-brand-symbol': 'MT 18 - The Brand Symbol',
  'mt-19-charisma-archetypes': 'MT 19 - Brand Charisma Archetypes',
  'mt-20-tone-of-voice': 'MT 20 - Tone of Voice Path',
  'mt-21-naming': 'MT 21 - Naming',
  'mt-22-full-brand-board': 'MT 22 - Full Brand Board',
  'mt-23-sense-square': 'MT 23 - The Sense Square',
  'mt-24-why-we': 'MT 24 - Why We',
  'mt-25-brand-narratives': 'MT 25 - Brand Narratives',
  'mt-26-brand-rituals': 'MT 26 - Brand Rituals',
  'mt-27-golden-moments': 'MT 27 - The 10 Golden Moments',
  'mt-28-burn-pyramid': 'MT 28 - The Burn Pyramid',
  'mt-29-brand-power': 'MT 29 - Brand Power',
  'mt-30-devotion-journey': 'MT 30 - Devotion Journey',
  'mt-31-ejercicios-arquetipos': 'MT 31 - Ejercicios Arquetipos',
  'mt-personalidad': 'MT PERSONALIDAD - Ejercicio Personificación',
  'sb-1-carta-intencion': 'SB 1 - Carta de Intención',
  'sb-2-reconocimiento-lote': 'SB 2 - Reconocimiento de Lote',
  'sb-3-brujula-estrategica': 'SB 3 - Brújula Estratégica',
  'sb-4-lista-negra': 'SB 4 - Lista Negra',
  'sb-5-mapa-fugas': 'SB 5 - Mapa de Fugas',
  'sb-6-canvas': 'SB 6 - Canvas',
  'sb-7-dolor-contenido': 'SB 7 - Dolor + Contenido',
  'sb-8-brand-building': 'SB 8 - Brand Building vs Sales',
  'sb-9-el-rey': 'SB 9 - El Rey',
  'vn-1-explora-marca': 'VN 1 - Explora tu Marca',
  'vn-2-diversifica-ideas': 'VN 2 - Diversifica Ideas',
  'vn-3-diversifica-objetivos': 'VN 3 - Diversifica Objetivos',
  'vn-4-diversifica-ingresos': 'VN 4 - Diversifica Ingresos',
  'vn-5-crea-plan': 'VN 5 - Crea tu Plan',
  'user-persona-cfo': 'User Persona - CFO',
  'user-persona-cto': 'User Persona - CTO',
  'user-persona-ceo': 'User Persona - CEO',
  'user-persona-operaciones': 'User Persona - Dir. Operaciones',
  'user-persona-lider-td': 'User Persona - Líder TD',
}

const getCategory = (slug: string): string => {
  if (slug === 'indice') return 'Inicio'
  if (slug.startsWith('mt-')) return 'MT'
  if (slug.startsWith('sb-')) return 'SB'
  if (slug.startsWith('vn-')) return 'VN'
  if (slug.startsWith('user-')) return 'UP'
  return 'MT'
}

const getCategoryName = (cat: string): string => {
  const categories: Record<string, string> = {
    'Inicio': 'Inicio',
    'MT': 'Marketing Templates',
    'SB': 'Strategic Blocks',
    'VN': 'Vision Notes',
    'UP': 'User Personas',
  }
  return categories[cat] || cat
}

export default async function Page({ searchParams }: { searchParams: Promise<{ doc?: string }> }) {
  const params = await searchParams
  const slug = params.doc || 'indice'
  const fileName = files[slug] || '00 - INDICE MAESTRO.md'
  const displayName = fileNames[slug] || 'Índice Maestro'
  const category = getCategory(slug)
  
  const markdownDir = path.join(process.cwd(), 'public', 'markdown')
  let content = ''
  
  try {
    const filePath = path.join(markdownDir, fileName)
    content = fs.readFileSync(filePath, 'utf-8')
  } catch {
    content = '# Error\n\nDocumento no encontrado.'
  }

  const allDocs = Object.entries(fileNames).map(([s, n]) => ({ slug: s, name: n }))
  const mtDocs = allDocs.filter(d => d.slug.startsWith('mt-'))
  const sbDocs = allDocs.filter(d => d.slug.startsWith('sb-'))
  const vnDocs = allDocs.filter(d => d.slug.startsWith('vn-'))
  const upDocs = allDocs.filter(d => d.slug.startsWith('user-'))

  return (
    <div className="flex min-h-screen">
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            PrevalentWare
            <span className="block text-sm font-normal text-gray-500 mt-1">
              Análisis de Marca
            </span>
          </h1>
          
          <nav className="space-y-1 mb-4">
            <a
              href="?doc=indice"
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                slug === 'indice'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Indice Maestro
            </a>
          </nav>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">MT - marketing</h3>
            <nav className="space-y-1">
              {mtDocs.map((item) => (
                <a
                  key={item.slug}
                  href={`?doc=${item.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    slug === item.slug
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SB - Strategic</h3>
            <nav className="space-y-1">
              {sbDocs.map((item) => (
                <a
                  key={item.slug}
                  href={`?doc=${item.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    slug === item.slug
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">VN - Vision</h3>
            <nav className="space-y-1">
              {vnDocs.map((item) => (
                <a
                  key={item.slug}
                  href={`?doc=${item.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    slug === item.slug
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">User Personas</h3>
            <nav className="space-y-1">
              {upDocs.map((item) => (
                <a
                  key={item.slug}
                  href={`?doc=${item.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    slug === item.slug
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-8 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="?doc=indice" className="text-blue-600 hover:text-blue-800 font-medium">
                Inicio
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">{getCategoryName(category)}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{displayName}</span>
            </nav>
          </div>
        </div>
        <article className="max-w-4xl mx-auto p-8 bg-white min-h-full shadow-sm">
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  )
}
