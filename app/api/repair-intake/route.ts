import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, company, serviceInterest, message, dataSecureGuarantee } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and repair details are required." }, { status: 400 })
    }

    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO // e.g. "username/repo"

    let githubIssueUrl: string | null = null
    let ticketNumber: number | null = null

    if (githubToken && githubRepo) {
      const issueTitle = `Repair Request: ${company || name} - ${serviceInterest || "General"}`
      const issueBody = [
        "## Repair Intake Request",
        "",
        `**Name:** ${name}`,
        `**Email:** ${email}`,
        `**Organization:** ${company || "N/A"}`,
        `**Service Interest:** ${serviceInterest || "N/A"}`,
        `**Data Secure Guarantee Requested:** ${dataSecureGuarantee ? "Yes" : "No"}`,
        "",
        "### Device Symptoms / Repair Brief:",
        message,
      ].join("\n")

      const githubRes = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ["repair-intake", serviceInterest || "general"].filter(Boolean),
        }),
      })

      if (githubRes.ok) {
        const data = await githubRes.json()
        githubIssueUrl = data.html_url
        ticketNumber = data.number
      } else {
        console.error("[v0] Failed to create GitHub issue:", await githubRes.text())
      }
    }

    return NextResponse.json({
      success: true,
      message: "Repair intake received successfully.",
      githubIssueUrl,
      ticketNumber,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unexpected error"
    console.error("[v0] Intake error:", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
