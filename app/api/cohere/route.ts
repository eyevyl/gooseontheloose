import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello, Next.js with TypeScript!' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: `Hello, ${body.name}!` });
}
