import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, systemName, apiKey } = body

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Build search URL for v1.1 API
    const baseUrl = "https://api.thegamesdb.net/v1.1"
    const params = new URLSearchParams({
      apikey: apiKey,
      name: title,
      include: "boxart", // Include boxart data in the response
    })

    // Add platform filter if available
    if (systemName) {
      params.append("filter[platform]", systemName)
    }

    // Search for the game using v1.1 API
    const response = await fetch(`${baseUrl}/Games/ByGameName?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "GameCoverResolver/1.0",
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
