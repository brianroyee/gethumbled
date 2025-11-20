'use client';

import { useEffect, useState } from 'react';
import { getRecentFeedback, Feedback } from '@/app/actions';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getRecentFeedback().then(setFeedbacks);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <h2 className="text-center text-zinc-500 font-mono uppercase tracking-widest text-sm mb-8">
        Wall of Shame (Recent Victims)
      </h2>
      
      {feedbacks.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-800 bg-zinc-900/30">
          <p className="text-zinc-600 font-mono text-sm">No victims yet... be the first! 💀</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map((item, i) => (
          <div 
            key={i}
            className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors flex flex-col h-full"
          >
            <div className="flex-grow">
              <p className="text-zinc-300 font-mono text-sm mb-4 leading-relaxed">
                "{item.text}"
              </p>
              
              {item.reply && (
                <div className="mb-4 pl-4 border-l-2 border-red-500/50">
                  <p className="text-red-400/80 font-mono text-xs uppercase mb-1">Creator Reply:</p>
                  <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                    {item.reply}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-auto">
              <span className="text-red-400 text-xs font-bold uppercase font-mono">
                {item.name}
              </span>
              <span className="text-zinc-600 text-xs font-mono whitespace-nowrap ml-4">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
