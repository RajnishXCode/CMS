import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { username, password, domain, project } = await req.json();
    if (!username || !password || !domain || !project) {
      return NextResponse.json({ success: false, message: "All fields required: username, password, domain, project." }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const auth = await db.collection("cms_auth").findOne({ username, domain, project });

    if (!auth || !auth.password) {
      return NextResponse.json({ success: false, message: "No admin found for these credentials." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, auth.password);
    if (valid) {
      // Generate JWT
      const secret = process.env.JWT_SECRET || "default_secret";
      const token = jwt.sign(
        {
          userId: auth._id,
          username: auth.username,
          domain: auth.domain,
          project: auth.project,
        },
        secret,
        { expiresIn: "1h" }
      );
      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true, user: { username: auth.username, domain: auth.domain, project: auth.project } });
      response.headers.set(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
      );
      return response;
    } else {
      return NextResponse.json({ success: false, message: "Invalid password." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}