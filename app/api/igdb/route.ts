import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, systemName, clientId, clientSecret } = body

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Client ID and Client Secret are required" }, { status: 400 })
    }

    // Get access token
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    })

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: `IGDB Auth error: ${tokenResponse.status}` }, { status: tokenResponse.status })
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Build the query
    let query = `search "${title}"; fields name,cover.*,platforms; limit 10;`

    // Add platform filter if available
    if (systemName) {
      query += ` where platforms = (${systemName});`
    }

    // Make the API request
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: query,
    })

    if (!response.ok) {
      return NextResponse.json({ error: `IGDB API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in IGDB proxy:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
