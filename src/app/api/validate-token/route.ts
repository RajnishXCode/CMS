import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Read token from cookie using NextRequest cookies API
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ valid: false, message: "No token provided." }, { status: 400 });
    }
    const secret = process.env.JWT_SECRET || "default_secret";
    try {
      const decoded = jwt.verify(token, secret);
      return NextResponse.json({ valid: true, user: decoded });
    } catch (err) {
      return NextResponse.json({ valid: false, message: "Token invalid or expired." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ valid: false, message: "Server error." }, { status: 500 });
  }
}