'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

import { 
    verifyAdminPassword, 
    getFundingAmount, 
    updateFundingAmount, 
    getVisitorCount, 
    resetVisitorCount,
    getAllFeedback,
    deleteFeedback,
    updateFeedbackRank,
    Feedback
} from '@/app/actions';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentFunding, setCurrentFunding] = useState<number>(0);
    const [visitors, setVisitors] = useState<number>(0);
    const [newFunding, setNewFunding] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [rankInputs, setRankInputs] = useState<Record<string, string>>({});

    // Load initial data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadData();
        }
    }, [isAuthenticated]);

    const loadData = async () => {
        const funding = await getFundingAmount();
        const visitorCount = await getVisitorCount();
        const allFeedback = await getAllFeedback();
        setCurrentFunding(Number(funding));
        setVisitors(Number(visitorCount));
        setFeedbacks(allFeedback);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const isValid = await verifyAdminPassword(password);
            if (isValid) {
                setIsAuthenticated(true);
            } else {
                alert('Incorrect password!');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFunding = async () => {
        const amount = parseFloat(newFunding);
        if (!isNaN(amount) && amount >= 0) {
            const success = await updateFundingAmount(amount);
            if (success) {
                setCurrentFunding(amount);
                setNewFunding('');
                alert('Funding amount updated!');
            } else {
                alert('Failed to update. Check database connection.');
            }
        } else {
            alert('Please enter a valid amount');
        }
    };

    const handleResetVisitors = async () => {
        if (confirm('Are you sure you want to reset visitor count?')) {
            await resetVisitorCount();
            setVisitors(0);
        }
    };

    const handleDeleteFeedback = async (id: string) => {
        if (confirm('Are you sure you want to delete this feedback?')) {
            const success = await deleteFeedback(id);
            if (success) {
                await loadData(); // Reload feedback
            } else {
                alert('Failed to delete feedback');
            }
        }
    };

    const handleUpdateRank = async (id: string) => {
        const rankValue = rankInputs[id];
        const rank = parseInt(rankValue);
        
        if (isNaN(rank) || rank < 0 || rank > 100) {
            alert('Please enter a valid rank (0-100)');
            return;
        }

        const success = await updateFeedbackRank(id, rank);
        if (success) {
            await loadData(); // Reload feedback
            setRankInputs(prev => ({ ...prev, [id]: '' }));
        } else {
            alert('Failed to update rank');
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

                <div className="bg-zinc-900 border-2 border-red-500 p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-red-500 mb-6 text-center uppercase">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white p-3 focus:border-red-500 focus:outline-none"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white uppercase py-3 border-2 border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verifying...' : 'Login'}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

            <Navigation />

            <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase">
                        Admin Dashboard
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Manage funding and analytics
                    </p>
                </header>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Current Funding */}
                    <div className="bg-gradient-to-br from-green-950/50 to-green-900/30 border-2 border-green-500 p-6">
                        <div className="text-sm text-green-400 mb-2 uppercase">Current Funding</div>
                        <div className="text-5xl font-bold text-green-500">${currentFunding}</div>
                        <div className="text-xs text-zinc-400 mt-2">of $50/month goal</div>
                        <div className="mt-4 bg-zinc-900 h-2">
                            <div
                                className="bg-green-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min((currentFunding / 50) * 100, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Total Visitors */}
                    <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border-2 border-blue-500 p-6">
                        <div className="text-sm text-blue-400 mb-2 uppercase">Total Visitors</div>
                        <div className="text-5xl font-bold text-blue-500">{visitors}</div>
                        <div className="text-xs text-zinc-400 mt-2">unique visitors</div>
                        <button
                            onClick={handleResetVisitors}
                            className="mt-4 text-xs text-red-400 hover:text-red-300 underline"
                        >
                            Reset count
                        </button>
                    </div>
                </div>

                {/* Update Funding */}
                <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
                    <h2 className="text-xl text-red-400 mb-4 uppercase">Update Funding Amount</h2>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={newFunding}
                            onChange={(e) => setNewFunding(e.target.value)}
                            placeholder="Enter new amount (e.g., 25)"
                            className="flex-1 bg-zinc-800 border-2 border-zinc-700 text-white p-3 focus:border-red-500 focus:outline-none"
                            step="0.01"
                            min="0"
                        />
                        <button
                            onClick={handleUpdateFunding}
                            className="bg-red-600 hover:bg-red-700 text-white uppercase px-6 py-3 border-2 border-red-500 transition-colors"
                        >
                            Update
                        </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                        This will update the progress bar on the Support page
                    </p>
                </div>

                {/* Feedback Management */}
                <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
                    <h2 className="text-xl text-red-400 mb-4 uppercase">Manage Feedback</h2>
                    {feedbacks.length === 0 ? (
                        <p className="text-zinc-500 text-sm font-mono">No feedback yet</p>
                    ) : (
                        <div className="space-y-4">
                            {feedbacks.map((feedback) => (
                                <div key={feedback.id} className="bg-zinc-800 border border-zinc-700 p-4">
                                    <div className="grid grid-cols-12 gap-4 items-start">
                                        {/* Rank */}
                                        <div className="col-span-1">
                                            <div className="text-xs text-zinc-500 mb-1 uppercase">Rank</div>
                                            <div className="text-2xl font-bold text-red-400">{feedback.rank}</div>
                                        </div>

                                        {/* Feedback Content */}
                                        <div className="col-span-7">
                                            <div className="text-xs text-zinc-500 mb-1 uppercase">Feedback</div>
                                            <p className="text-zinc-300 text-sm mb-2">"{feedback.text}"</p>
                                            <div className="flex gap-4 text-xs text-zinc-600">
                                                <span>By: <span className="text-red-400">{feedback.name}</span></span>
                                                <span>{new Date(feedback.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-4 space-y-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={rankInputs[feedback.id] || ''}
                                                    onChange={(e) => setRankInputs(prev => ({ ...prev, [feedback.id]: e.target.value }))}
                                                    placeholder="New rank (0-100)"
                                                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-2 py-1 text-sm focus:border-red-500 focus:outline-none"
                                                    min="0"
                                                    max="100"
                                                />
                                                <button
                                                    onClick={() => handleUpdateRank(feedback.id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs uppercase transition-colors"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteFeedback(feedback.id)}
                                                className="w-full bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 text-xs uppercase transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-zinc-500 mt-4">
                        Higher rank = displayed first on homepage. Rank 0 = default (sorted by date).
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-zinc-900 border-2 border-zinc-700 p-6 mb-8">
                    <h2 className="text-xl text-zinc-400 mb-4 uppercase">Quick Actions</h2>
                    <div className="space-y-3">
                        <a
                            href="/support"
                            className="block bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 border border-zinc-700 transition-colors text-center"
                        >
                            View Support Page
                        </a>
                        <a
                            href="/"
                            className="block bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 border border-zinc-700 transition-colors text-center"
                        >
                            View Homepage
                        </a>
                        <button
                            onClick={() => {
                                setIsAuthenticated(false);
                                setPassword('');
                            }}
                            className="w-full bg-red-900 hover:bg-red-800 text-red-300 px-4 py-3 border border-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-zinc-900 border-2 border-zinc-700 p-6">
                    <h3 className="text-sm text-zinc-400 mb-3 uppercase">Instructions</h3>
                    <ul className="space-y-2 text-xs text-zinc-500">
                        <li>• Update funding amount when you receive donations</li>
                        <li>• Visitor count is tracked automatically on the homepage</li>
                        <li>• All data is stored locally in your browser</li>
                        <li>• Change the admin password in the code for security</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
