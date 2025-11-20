import { NextResponse } from 'next/server';

// ROT13 encoding function
function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
}

export async function GET() {
  // The secret clue encoded in ROT13 (from environment variable)
  const flagFromEnv = process.env.CTF_FLAG_LEVEL_1 || 'NETWORK_NINJA_1';
  const secretClue = rot13(flagFromEnv);
  
  // Create response with hint
  const response = NextResponse.json({
    message: "You found the secret endpoint! But the real treasure isn't here...",
    hint: "Sometimes the most valuable information isn't in the body. Check everywhere.",
    challenge: "level 1: Network Inspector",
    difficulty: "Medium"
  });

  // Add custom header with ROT13 encoded flag
  response.headers.set('X-Secret-Clue', secretClue);
  response.headers.set('X-Challenge-Level', '2');
  response.headers.set('X-Hint', 'Decode me with ROT13');

  return response;
}
