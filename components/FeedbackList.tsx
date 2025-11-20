'use client';

import { useEffect, useState } from 'react';
import { getRecentFeedback, Feedback } from '@/app/actions';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getRecentFeedback().then(setFeedbacks);
  }, []);

  if (feedbacks.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <h2 className="text-center text-zinc-500 font-mono uppercase tracking-widest text-sm mb-8">
        Wall of Shame (Recent Victims)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map((item, i) => (
          <div 
            key={i}
            className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
          >
            <p className="text-zinc-300 font-mono text-sm mb-4 leading-relaxed">
              "{item.text}"
            </p>
            <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
              <span className="text-red-400 text-xs font-bold uppercase font-mono">
                {item.name}
              </span>
              <span className="text-zinc-600 text-xs font-mono">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
