import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const validPassword = process.env.VALIDATION_PASSWD;
    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Server misconfigured." }, { status: 500 });
    }
    if (password === validPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid password." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
