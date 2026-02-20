import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  let file = searchParams.get('file')

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 })
  }

  try {
    file = decodeURIComponent(file)
  } catch {
    // already decoded
  }

  const markdownDir = path.join(process.cwd(), 'public', 'markdown')
  const files = fs.readdirSync(markdownDir)
  
  const matchingFile = files.find(f => f === file || f.toLowerCase() === file.toLowerCase())

  if (!matchingFile) {
    return NextResponse.json({ error: 'File not found', requested: file }, { status: 404 })
  }

  const filePath = path.join(markdownDir, matchingFile)

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
