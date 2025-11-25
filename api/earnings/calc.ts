import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint simulates updating play counts and calculating revenue
export async function POST(req: Request) {
  const { distributionId, plays } = await req.json();
  const dist = await prisma.distribution.findUnique({ where: { id: distributionId }, include: { toUser: true }});
  if (!dist) return NextResponse.json({ error: "not found" }, { status: 404 });
  const singlePrice = parseFloat(process.env.SINGLE_SONG_PRICE || "0.03");
  const playsN = parseInt(plays || "0");
  const revenue = playsN * singlePrice;
  // create or update play record
  const pr = await prisma.playRecord.create({
    data: { distributionId: dist.id, plays: playsN, revenue }
  });
  // compute shares
  const subRatio = dist.toUser.ratio / 100.0;
  const subAmount = revenue * subRatio;
  const platformFee = parseFloat(process.env.PLATFORM_FEE || "0");
  const adminAmount = revenue * (1 - subRatio) - platformFee;
  return NextResponse.json({ revenue, subAmount, adminAmount, prId: pr.id });
}
