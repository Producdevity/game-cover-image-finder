import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { gameId, apiKey } = body

    if (!apiKey || !gameId) {
      return NextResponse.json({ error: "API key and game ID are required" }, { status: 400 })
    }

    // Build URL
    const baseUrl = "https://api.thegamesdb.net/v1"
    const params = new URLSearchParams({
      apikey: apiKey,
      games_id: gameId.toString(),
    })

    // Get the images
    const response = await fetch(`${baseUrl}/Games/Images?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "GameCoverResolver/1.0",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `TheGamesDB Images API error: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in TheGamesDB images proxy:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
