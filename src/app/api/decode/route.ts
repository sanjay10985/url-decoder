import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { input } = await request.json()

  try {
    const parsedUrl = new URL(input)
    const params = parsedUrl.searchParams

    const result: { [key: string]: any } = {
      endpoint: parsedUrl.origin + parsedUrl.pathname,
      params: {}
    }

    for (const [key, value] of params.entries()) {
      try {
        result.params[key] = JSON.parse(value)
      } catch {
        result.params[key] = value
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid URL or query string' }, { status: 400 })
  }
}

