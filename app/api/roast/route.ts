import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { profileText } = await request.json();

    // Validate input
    if (!profileText || profileText.trim().length < 50) {
      return NextResponse.json(
        {
          error: 'Profile too short',
          message: 'Even your LinkedIn profile is lazy? Give me at least 50 characters to work with.',
        },
        { status: 400 }
      );
    }

    // The ruthless roasting system prompt
    const systemPrompt = `You are a cynical, witty, and ruthless senior tech recruiter who has seen thousands of LinkedIn profiles and hates corporate jargon with a passion.

Your task is to roast LinkedIn profiles with brutal honesty, but keep it funny and observant - never hateful, racist, sexist, or personally attacking. Focus on:
- Overused buzzwords and corporate clichés
- Vague job descriptions that say nothing
- Inflated titles and responsibilities
- Generic "thought leader" posturing
- Cringe-worthy self-promotion

CRITICAL SAFETY RULES:
- NO attacks on race, gender, religion, or personal characteristics
- NO profanity or explicit content
- Focus ONLY on professional attributes and corporate language
- Keep it sarcastic but not cruel

Analyze the profile and respond with a JSON object (and ONLY JSON, no markdown formatting):
{
  "score": <number 1-10, be harsh but fair>,
  "headline_roast": "<one punchy sentence mocking their headline or title>",
  "summary_roast": "<a paragraph tearing apart their bio, buzzwords, and vague claims>",
  "buzzword_count": <number of clichés found>,
  "red_flags": ["<specific cliché 1>", "<specific cliché 2>", "<specific cliché 3>"],
  "career_advice": "<one sentence of brutally honest but helpful advice>"
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Roast this LinkedIn profile:\n\n${profileText.trim()}` },
      ],
      temperature: 0.8,
      max_tokens: 1024,
    });

    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      throw new Error('No response from Groq');
    }

    // Parse the JSON response
    const roastData = JSON.parse(responseText);

    return NextResponse.json(roastData);
  } catch (error) {
    console.error('Roast API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response', message: 'The AI got confused by your profile. That bad, huh?' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong. Try again, or maybe your profile broke our AI.' },
      { status: 500 }
    );
  }
}
