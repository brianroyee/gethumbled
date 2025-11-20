'use client';

import { useState } from 'react';
import { submitFeedback } from '@/app/actions';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    const success = await submitFeedback(text, name);
    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      setText('');
      setName('');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-900/20 border border-green-500/50 p-6 text-center animate-in fade-in zoom-in duration-300">
        <p className="text-green-400 font-mono text-lg mb-2">Feedback Received! 🫡</p>
        <p className="text-zinc-400 text-sm">Thanks for shouting into the void (we actually read it).</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs text-zinc-500 hover:text-white underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border-t-4 border-zinc-800 p-6 md:p-8">
      <h3 className="text-zinc-400 font-mono uppercase tracking-wider text-xs mb-4">
        Leave a Review (Or Hate Mail)
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us how much it hurt..."
            maxLength={280}
            required
            className="w-full bg-black border-2 border-zinc-800 text-white p-4 font-mono text-sm focus:border-red-500 focus:outline-none transition-colors min-h-[100px] resize-none"
          />
          <div className="text-right text-xs text-zinc-600 mt-1 font-mono">
            {text.length}/280
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name / Handle (Optional)"
            maxLength={50}
            className="flex-1 bg-black border-2 border-zinc-800 text-white px-4 py-3 font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
          />
          
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="bg-zinc-100 hover:bg-white text-black font-mono uppercase font-bold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
