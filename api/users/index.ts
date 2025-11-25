import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany({ include: { channels: true }});
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, ratio, role } = body;
  const hash = await bcrypt.hash(password || "123456", 10);
  const user = await prisma.user.create({
    data: { username, password: hash, ratio: ratio ?? 75, role: role ?? "SUB" }
  });
  return NextResponse.json(user);
}
