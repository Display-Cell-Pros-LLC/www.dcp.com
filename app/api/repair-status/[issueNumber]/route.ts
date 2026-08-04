import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }: { params: Promise<{ issueNumber: string }> }) {
  try {
    const { issueNumber } = await params
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO

    if (!githubToken || !githubRepo) {
      return NextResponse.json({ error: "Status lookup is not configured on the server yet." }, { status: 503 })
    }

    if (!/^\d+$/.test(issueNumber)) {
      return NextResponse.json({ error: "Invalid ticket number." }, { status: 400 })
    }

    const response = await fetch(`https://api.github.com/repos/${githubRepo}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Ticket not found." }, { status: 404 })
      }
      throw new Error("Failed to fetch ticket.")
    }

    const data = await response.json()
    return NextResponse.json({
      title: data.title,
      state: data.state,
      created_at: data.created_at,
      updated_at: data.updated_at,
      labels: (data.labels || []).map((l: { name: string }) => l.name),
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unexpected error"
    console.error("[v0] Status fetch error:", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
