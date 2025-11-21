import { NextResponse } from 'next/server';
import { migrateCounts } from '@/app/actions';

export async function GET() {
  try {
    const result = await migrateCounts();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Migration Error:', error);
    return NextResponse.json({ error: 'Migration failed', details: String(error) }, { status: 500 });
  }
}
