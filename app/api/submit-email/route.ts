import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || 'https://example.vercel-kv.com',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'example_token',
});

export async function POST(request: NextRequest) {
  try {
    const { email, level, name } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Store email submission
    const submission = {
      email: email.trim().toLowerCase(),
      name: name || 'Anonymous',
      level,
      timestamp: new Date().toISOString(),
    };

    await kv.lpush('ctf_gift_emails', submission);
    await kv.ltrim('ctf_gift_emails', 0, 199); // Keep last 200 entries

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit email' },
      { status: 500 }
    );
  }
}

// Get all email submissions (for admin)
export async function GET() {
  try {
    const emails = await kv.lrange('ctf_gift_emails', 0, 199);
    return NextResponse.json({ emails: emails || [] });
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    return NextResponse.json({ emails: [] });
  }
}
