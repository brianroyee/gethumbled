'use client';

import { useState } from 'react';
import { migrateCounts } from '../actions';

export default function MigratePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleMigrate = async () => {
    setLoading(true);
    try {
      const res = await migrateCounts();
      setResult(res);
    } catch (err: any) {
      setResult({ error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <h1 className="text-2xl mb-4">Migration Tool</h1>
      <button
        onClick={handleMigrate}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Migrating...' : 'Start Migration'}
      </button>
      
      {result && (
        <pre className="mt-8 p-4 bg-zinc-900 rounded border border-zinc-800 whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
