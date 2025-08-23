import { NextRequest, NextResponse } from "next/server";
import globalData from "@/assets/global.json";

export async function POST(req: NextRequest) {
  try {
    const { data, path } = await req.json();
    const repo = globalData.repo;
    const token = process.env.GITHUB_PAT;

    // Get current JSON SHA
    const getFile = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );
    const fileData = await getFile.json();
    const sha = fileData.sha;

    // Update json file
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update ${path} via CMS`,
          content: Buffer.from(JSON.stringify(data, null, 2)).toString(
            "base64"
          ),
          sha,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json(
        { success: false, message: JSON.stringify(err) },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Changes saved to GitHub!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
