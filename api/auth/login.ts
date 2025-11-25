import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;
  const user = await prisma.user.findUnique({ where: { username }});
  if (!user) return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  const token = signToken({ id: user.id, role: user.role });
  return NextResponse.json({ token, user: { id: user.id, username: user.username, role: user.role, ratio: user.ratio }});
}
