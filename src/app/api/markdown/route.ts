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
  
  // Check if file contains a subdirectory (e.g., "User Personas/file.md")
  const filePath = path.join(markdownDir, file)
  const dir = path.dirname(filePath)
  const fileName = path.basename(filePath)

  try {
    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ error: 'Directory not found', requested: file }, { status: 404 })
    }

    // Read directory and find matching file
    const files = fs.readdirSync(dir)
    const matchingFile = files.find(f => f === fileName || f.toLowerCase() === fileName.toLowerCase())

    if (!matchingFile) {
      return NextResponse.json({ error: 'File not found', requested: file }, { status: 404 })
    }

    const fullPath = path.join(dir, matchingFile)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error reading file', requested: file }, { status: 500 })
  }
}
