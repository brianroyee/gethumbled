import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    // Manual env loading fallback if needed (reusing logic from actions.ts if this fails, but trying simple first)
    let url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
       // Fallback to reading file if envs are missing in this context
       try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf-8');
          const urlMatch = envContent.match(/(?:KV_REST_API_URL|UPSTASH_REDIS_REST_URL)=(".*?"|[^#\n]+)/);
          const tokenMatch = envContent.match(/(?:KV_REST_API_TOKEN|UPSTASH_REDIS_REST_TOKEN)=(".*?"|[^#\n]+)/);
          
          if (urlMatch) url = urlMatch[1].replace(/"/g, '');
          if (tokenMatch) token = tokenMatch[1].replace(/"/g, '');
        }
      } catch (e) {
        console.error('Failed to read .env.local:', e);
      }
    }

    if (!url || !token) return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });

    const tempKv = createClient({ url, token });
    await tempKv.set('roastCount', 64);
    
    return NextResponse.json({ success: true, new_count: 64 });
  } catch (error) {
    console.error('Set Count Error:', error);
    return NextResponse.json({ error: 'Failed to set count', details: String(error) }, { status: 500 });
  }
}
