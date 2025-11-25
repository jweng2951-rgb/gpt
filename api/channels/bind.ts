import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { ownerId, platform, channelId, channelName } = body;
  const c = await prisma.channel.create({ data: { platform, channelId, channelName, ownerId }});
  return NextResponse.json(c);
}
