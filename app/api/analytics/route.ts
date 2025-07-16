import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, timestamp } = body

    // Simplified logging for page views and bounce rate only
    if (event === "page_view") {
      console.log("📄 PAGE VIEW:", {
        "🌐 PAGE": properties?.path || "unknown",
        "⏰ TIME": timestamp,
        "🔗 REFERER": request.headers.get("referer") || "direct",
      })
    }

    if (event === "bounce") {
      console.log("⚡ BOUNCE DETECTED:", {
        "📊 BOUNCED": properties?.bounced || false,
        "⏱️ TIME_ON_SITE": `${(properties?.time_on_site || 0) / 1000}s`,
        "📄 PAGES_VIEWED": properties?.pages_viewed || 0,
        "⏰ TIME": timestamp,
      })
    }

    // Here you would save only page views and bounce data to your database
    // Example: await savePageViewOrBounce(event, properties, timestamp)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to process analytics" }, { status: 500 })
  }
}
