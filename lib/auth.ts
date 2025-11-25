import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function getUserFromToken(token?: string) {
  if (!token) return null;
  try {
    const data = verifyToken(token as string) as any;
    if (!data?.id) return null;
    const user = await prisma.user.findUnique({ where: { id: data.id }});
    return user;
  } catch {
    return null;
  }
}
