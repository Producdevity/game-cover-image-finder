import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, systemName, apiKey } = body

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Build search URL
    const baseUrl = "https://api.thegamesdb.net/v1"
    const params = new URLSearchParams({
      apikey: apiKey,
      name: title,
      fields: "platform,release_date,boxart",
    })

    // Add platform filter if available
    if (systemName) {
      // We'll handle platform mapping in the client
      params.append("filter[platform]", systemName)
    }

    // Search for the game
    const response = await fetch(`${baseUrl}/Games/ByGameName?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `TheGamesDB API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in TheGamesDB search proxy:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
