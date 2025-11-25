import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // This is a simplified endpoint that expects JSON with filename/title/uploaderId
  const body = await req.json();
  const { filename, title, description, uploaderId } = body;
  if (!filename || !title) return NextResponse.json({ error: "Missing" }, { status: 400 });
  const m = await prisma.music.create({ data: { filename, title, description, uploaderId }});
  return NextResponse.json(m);
}
