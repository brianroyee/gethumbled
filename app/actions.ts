'use server'

import { kv } from '@vercel/kv';

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
