import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// body: musicId, toUserIds[]
export async function POST(req: Request) {
  const body = await req.json();
  const { musicId, toUserIds } = body;
  const created = [];
  for (const uid of toUserIds) {
    // create distributions for each of user's channels
    const channels = await prisma.channel.findMany({ where: { ownerId: uid }});
    if (channels.length === 0) {
      // create distribution with null channel - visible in user's library
      const d = await prisma.distribution.create({ data: { musicId, toUserId: uid }});
      created.push(d);
    } else {
      for (const ch of channels) {
        const d = await prisma.distribution.create({ data: { musicId, toUserId: uid, toChannelId: ch.id }});
        created.push(d);
      }
    }
  }
  return NextResponse.json({ count: created.length });
}
