import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const text = await req.text();
  // Expect CSV with header: username,password,ratio,channel_name,channel_id
  const parsed = Papa.parse(text, { header: true });
  const rows = parsed.data as any[];
  const created = [];
  for (const r of rows) {
    if (!r.username) continue;
    const hash = await bcrypt.hash(r.password || "123456", 10);
    const u = await prisma.user.create({
      data: { username: r.username, password: hash, ratio: parseInt(r.ratio||"75") }
    });
    if (r.channel_id) {
      await prisma.channel.create({
        data: { platform: "YOUTUBE", channelId: r.channel_id, channelName: r.channel_name || r.username, ownerId: u.id }
      });
    }
    created.push(u);
  }
  return NextResponse.json({ created: created.length });
}
