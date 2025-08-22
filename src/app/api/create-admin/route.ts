import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

interface AdminRecord {
  username: string;
  password: string;
  domain: string;
  project: string;
  isAuthenticated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password, domain, project } = await req.json();
    if (!username || !password || !domain || !project) {
      return NextResponse.json({ success: false, message: "All fields required: username, password, domain, project." }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection("cms_auth").findOne({ username, domain, project });
    if (existing) {
      return NextResponse.json({ success: false, message: "Admin already exists for this domain and project." }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    const adminRecord: AdminRecord = {
      username,
      password: hashedPassword,
      domain,
      project,
      isAuthenticated: false,
      createdAt: now,
      updatedAt: now,
    };
    await db.collection("cms_auth").insertOne(adminRecord);
    return NextResponse.json({ success: true, message: "Admin created." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
