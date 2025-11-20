'use server'

import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || 'https://example.vercel-kv.com',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'example_token',
});


export async function verifyAdminPassword(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) return false;
  return password === correctPassword;
}

export async function getFundingAmount() {
  try {
    const amount = await kv.get('fundingAmount');
    return amount || 0;
  } catch (error) {
    console.log('KV not connected, returning 0');
    return 0;
  }
}

export async function updateFundingAmount(amount: number) {
  try {
    await kv.set('fundingAmount', amount);
    return true;
  } catch (error) {
    console.error('Failed to update funding:', error);
    return false;
  }
}

export async function getVisitorCount() {
  try {
    const count = await kv.get('visitorCount');
    return count || 0;
  } catch (error) {
    return 0;
  }
}

export async function incrementVisitorCount() {
  try {
    const count = await kv.incr('visitorCount');
    return count;
  } catch (error) {
    return 0;
  }
}

export async function resetVisitorCount() {
    try {
        await kv.set('visitorCount', 0);
        return true;
    } catch (error) {
        return false;
    }
}

// Feedback System
export type Feedback = {
  text: string;
  name: string;
  date: string;
};

export async function submitFeedback(text: string, name: string) {
  if (!text || text.length > 280) return false;
  
  const feedback: Feedback = {
    text: text.slice(0, 280), // Truncate just in case
    name: name.slice(0, 50) || 'Anonymous',
    date: new Date().toISOString(),
  };

  try {
    // Push to list and keep only last 50 items
    await kv.lpush('feedback_list', feedback);
    await kv.ltrim('feedback_list', 0, 49);
    return true;
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    return false;
  }
}

export async function getRecentFeedback() {
  try {
    // Get top 10 feedback items
    const feedback = await kv.lrange<Feedback>('feedback_list', 0, 9);
    return feedback;
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return [];
  }
}
