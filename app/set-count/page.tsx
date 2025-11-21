'use client';

import { useState } from 'react';
import { setRoastCount } from '../actions';

export default function SetCountPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSetCount = async () => {
    setLoading(true);
    try {
      const res = await setRoastCount(64);
      setResult(res);
    } catch (err: any) {
      setResult({ error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <h1 className="text-2xl mb-4">Set Roast Count Tool</h1>
      <button
        onClick={handleSetCount}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Setting...' : 'Set Count to 64'}
      </button>
      
      {result && (
        <pre className="mt-8 p-4 bg-zinc-900 rounded border border-zinc-800 whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
