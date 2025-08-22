import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

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
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid password." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}