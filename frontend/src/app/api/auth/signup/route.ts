import { hash } from "bcrypt";
import { NextResponse } from "next/server";

const obj: any = {};

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const exists = await obj.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }
  const hashed = await hash(password, 10);
  await obj.user.create({
    data: { name, email, password: hashed, role },
  });
  return NextResponse.json({ ok: true });
}
