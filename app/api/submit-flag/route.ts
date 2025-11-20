import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || 'https://example.vercel-kv.com',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'example_token',
});

// Valid flags for each level (from environment variables)
const VALID_FLAGS: Record<string, string> = {
  [process.env.CTF_FLAG_LEVEL_1 || 'NETWORK_NINJA_1']: 'level_1',
  [process.env.CTF_FLAG_LEVEL_2 || 'PROMPT_MASTER_2']: 'level_2',
};

// Hints for each level
const HINTS: Record<string, string[]> = {
  level_1: [
    "The response body is just the beginning. HTTP has layers.",
    "Headers carry metadata. One of them speaks in riddles.",
    "13 steps forward, 13 steps back. The cipher is its own inverse."
  ],
  level_2: [
    "Every gatekeeper has a weakness. This one believes what you tell it.",
    "If you were in charge, what would you call yourself?",
    "The system trusts your identity. Claim the highest authority."
  ]
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flag, name, action, level, hintIndex } = body;

    // Get hint action
    if (action === 'get_hint') {
      const levelKey = `level_${level}`;
      
      if (!HINTS[levelKey]) {
        return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
      }

      const hints = HINTS[levelKey];
      const hint = hints[Math.min(hintIndex || 0, hints.length - 1)];

      return NextResponse.json({ 
        hint,
        totalHints: hints.length,
        currentHint: Math.min((hintIndex || 0) + 1, hints.length)
      });
    }

    // Validate flag submission
    if (!flag || typeof flag !== 'string') {
      return NextResponse.json(
        { error: 'Flag is required', success: false },
        { status: 400 }
      );
    }

    const trimmedFlag = flag.trim().toUpperCase();
    const levelId = VALID_FLAGS[trimmedFlag];

    if (!levelId) {
      return NextResponse.json({
        success: false,
        message: "Nope! That's not the right flag. Keep trying, hacker.",
        hint: "Make sure you've completed the challenge correctly."
      });
    }

    // Valid flag! Store in leaderboard
    const submitterName = name?.trim() || 'Anonymous';
    
    try {
      const leaderboardEntry = {
        name: submitterName.slice(0, 30),
        level: levelId,
        flag: trimmedFlag,
        timestamp: new Date().toISOString(),
      };

      await kv.lpush('ctf_leaderboard', leaderboardEntry);
      await kv.ltrim('ctf_leaderboard', 0, 99); // Keep last 100 entries
    } catch (error) {
      console.error('Failed to update leaderboard:', error);
    }

    return NextResponse.json({
      success: true,
      message: `🎉 Correct! You've conquered ${levelId.replace('_', ' ').toUpperCase()}!`,
      level: levelId,
      nextChallenge: levelId === 'level_2' ? 'Try level 2: Prompt Injection Challenge' : 'You\'ve completed all challenges!'
    });

  } catch (error) {
    console.error('Flag submission error:', error);
    return NextResponse.json(
      { error: 'Invalid request', success: false },
      { status: 400 }
    );
  }
}

// Get leaderboard
export async function GET() {
  try {
    const leaderboard = await kv.lrange('ctf_leaderboard', 0, 99); // Get all entries
    
    // Count completions per user
    const userStats: Record<string, { name: string; count: number; levels: Set<string> }> = {};
    const levelSolves: Record<string, number> = {
      level_1: 0,
      level_2: 0
    };
    
    if (Array.isArray(leaderboard)) {
      leaderboard.forEach((entry: any) => {
        const name = entry.name || 'Anonymous';
        if (!userStats[name]) {
          userStats[name] = { name, count: 0, levels: new Set() };
        }
        userStats[name].levels.add(entry.level);
        userStats[name].count = userStats[name].levels.size;
        
        // Count solves per level
        if (entry.level && levelSolves[entry.level] !== undefined) {
          levelSolves[entry.level]++;
        }
      });
    }

    // Convert to array and sort by count
    const topSolvers = Object.values(userStats)
      .map(stat => ({ name: stat.name, flagsFound: stat.count }))
      .sort((a, b) => b.flagsFound - a.flagsFound)
      .slice(0, 10);

    return NextResponse.json({
      leaderboard: topSolvers,
      totalSolvers: Object.keys(userStats).length,
      solvesByLevel: levelSolves
    });
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json({ 
      leaderboard: [], 
      totalSolvers: 0,
      solvesByLevel: { level_1: 0, level_2: 0 }
    });
  }
}
