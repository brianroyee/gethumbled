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

export async function getRoastCount() {
  try {
    const count = await kv.get<number>('roastCount');
    return count || 0;
  } catch (error) {
    return 0;
  }
}

export async function incrementRoastCount() {
  try {
    const count = await kv.incr('roastCount');
    return count;
  } catch (error) {
    return 0;
  }
}

export async function migrateCounts() {
  try {
    // Manual env loading fallback
    let url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
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

    if (!url || !token) {
      throw new Error('Missing KV credentials');
    }

    // Create a fresh client with explicit credentials
    const tempKv = createClient({ url, token });

    const visitorCount = await tempKv.get<number>('visitorCount') || 0;
    const roastCount = await tempKv.get<number>('roastCount') || 0;
    
    const newTotal = Number(visitorCount) + Number(roastCount);
    
    await tempKv.set('roastCount', newTotal);
    return { success: true, visitorCount, roastCount, newTotal };
  } catch (error: any) {
    console.error('Migration action failed:', error);
    return { success: false, error: error.message || String(error) };
  }
}





// Feedback System
export type Feedback = {
  id: string;
  text: string;
  name: string;
  date: string;
  rank: number;
  reply?: string;
};

export async function submitFeedback(text: string, name: string) {
  if (!text || text.length > 280) return false;
  
  const feedback: Feedback = {
    id: crypto.randomUUID(),
    text: text.slice(0, 280),
    name: name.slice(0, 50) || 'Anonymous',
    date: new Date().toISOString(),
    rank: 0, // Default rank
  };

  try {
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
    const feedback = await kv.lrange<Feedback>('feedback_list', 0, 49);
    // Sort by rank (desc), then date (desc)
    const sorted = feedback.sort((a, b) => {
      if (b.rank !== a.rank) return b.rank - a.rank;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return sorted.slice(0, 10); // Return top 10
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return [];
  }
}

// Admin Functions
export async function getAllFeedback() {
  try {
    const feedback = await kv.lrange<Feedback>('feedback_list', 0, 49);
    // Sort by rank (desc), then date (desc)
    return feedback.sort((a, b) => {
      if (b.rank !== a.rank) return b.rank - a.rank;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Failed to fetch all feedback:', error);
    return [];
  }
}

export async function deleteFeedback(id: string) {
  try {
    const allFeedback = await kv.lrange<Feedback>('feedback_list', 0, 49);
    const filtered = allFeedback.filter(f => f.id !== id);
    
    // Clear and repopulate the list
    await kv.del('feedback_list');
    if (filtered.length > 0) {
      await kv.lpush('feedback_list', ...filtered);
    }
    return true;
  } catch (error) {
    console.error('Failed to delete feedback:', error);
    return false;
  }
}

export async function updateFeedbackRank(id: string, rank: number) {
  try {
    const allFeedback = await kv.lrange<Feedback>('feedback_list', 0, 49);
    const updated = allFeedback.map(f => 
      f.id === id ? { ...f, rank } : f
    );
    
    // Clear and repopulate the list
    await kv.del('feedback_list');
    if (updated.length > 0) {
      await kv.lpush('feedback_list', ...updated);
    }
    return true;
  } catch (error) {
    console.error('Failed to update feedback rank:', error);
    return false;
  }
}

export async function updateFeedbackReply(id: string, reply: string) {
  try {
    const allFeedback = await kv.lrange<Feedback>('feedback_list', 0, 49);
    const updated = allFeedback.map(f => 
      f.id === id ? { ...f, reply } : f
    );
    
    // Clear and repopulate the list
    await kv.del('feedback_list');
    if (updated.length > 0) {
      await kv.lpush('feedback_list', ...updated);
    }
    return true;
  } catch (error) {
    console.error('Failed to update feedback reply:', error);
    return false;
  }
}
