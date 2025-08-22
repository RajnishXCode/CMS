// server-less func to commit changes
// app/api/commit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const repo = 'your-username/your-repo';
    const path = 'homepage.json';
    const token = process.env.GITHUB_PAT;

    // 1️⃣ Get current file SHA
    const getFile = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` },
    });
    const fileData = await getFile.json();
    const sha = fileData.sha;

    // 2️⃣ Update file
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update homepage.json via CMS',
        content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
        sha,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ success: false, message: JSON.stringify(err) }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Changes saved to GitHub!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
