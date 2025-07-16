import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, timestamp } = body

    // Enhanced logging where every interaction is a new visitor
    const analyticsData = {
      event,
      timestamp,
      visitor_id: properties?.visitor_id || "unknown",
      visitor_type: "new_visitor", // Always new visitor
      session_id: properties?.session_id || "unknown",
      properties: {
        ...properties,
        ip: request.ip || "unknown",
        user_agent: request.headers.get("user-agent") || "unknown",
        referer: request.headers.get("referer") || "direct",
      },
    }

    // Log each interaction as a separate visitor
    console.log("🔍 NOVA ANALYTICS (NEW VISITOR):", {
      "👤 VISITOR": {
        id: analyticsData.visitor_id,
        type: "NEW_VISITOR", // Always new
        is_unique: true,
      },
      "📊 EVENT": {
        name: event,
        timestamp: timestamp,
        session: analyticsData.session_id,
      },
      "📋 DETAILS": properties,
      "🌐 REQUEST": {
        ip: analyticsData.properties.ip,
        user_agent: analyticsData.properties.user_agent,
        referer: analyticsData.properties.referer,
      },
    })

    // Here you would save each interaction as a separate visitor record
    // Example: await saveNewVisitorActivity(analyticsData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to process analytics" }, { status: 500 })
  }
}
