import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const exts = [".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp"];
  const files = fs.readdirSync(publicDir)
    .filter(file => exts.includes(path.extname(file).toLowerCase()))
    .map(file => "/" + file);
  return NextResponse.json({ files });
}