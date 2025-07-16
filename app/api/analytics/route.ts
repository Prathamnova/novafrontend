import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, timestamp } = body

    // Enhanced logging with username-based visitor tracking
    const analyticsData = {
      event,
      timestamp,
      visitor_id: properties?.visitor_id || "unknown",
      visitor_type: properties?.visitor_type || "unknown",
      visitor_username: properties?.visitor_username || "anonymous",
      session_id: properties?.session_id || "unknown",
      properties: {
        ...properties,
        ip: request.ip || "unknown",
        user_agent: request.headers.get("user-agent") || "unknown",
        referer: request.headers.get("referer") || "direct",
      },
    }

    // Log with clear visitor identification
    console.log("🔍 NOVA USER ANALYTICS:", {
      "👤 VISITOR": {
        id: analyticsData.visitor_id,
        type: analyticsData.visitor_type,
        username: analyticsData.visitor_username,
      },
      "📊 EVENT": {
        name: event,
        timestamp: timestamp,
        session: analyticsData.session_id,
      },
      "📋 DETAILS": properties,
    })

    // Here you would typically save to your database with username as primary key
    // Example: await saveUserActivity(analyticsData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to process analytics" }, { status: 500 })
  }
}
