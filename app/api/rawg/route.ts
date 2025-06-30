import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { title, platformIds = [], apiKey } = await request.json()

    const baseUrl = "https://api.rawg.io/api/games"
    const params = new URLSearchParams({
      search: title,
      page_size: "10",
    })

    if (apiKey) params.append("key", apiKey)
    if (platformIds.length) params.append("platforms", platformIds.join(","))

    const rawgRes = await fetch(`${baseUrl}?${params}`, {
      headers: { Accept: "application/json" },
      // RAWG sometimes rate-limits without a UA
      next: { revalidate: 60 },
    })

    if (!rawgRes.ok) {
      return NextResponse.json({ error: `RAWG API error: ${rawgRes.status}` }, { status: rawgRes.status })
    }

    const data = await rawgRes.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error("RAWG proxy error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
