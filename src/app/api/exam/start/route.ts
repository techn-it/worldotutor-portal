// /app/api/exam/start/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.PAYLOAD_URL}/api/questions`);
  const data = await res.json();

  // pick random N questions (example: 10)
  const shuffled = data.docs.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);

  return NextResponse.json({ questions: selected });
}
