'use client';
import { useState } from 'react';

export default function Home() {
  const [score, setScore] = useState('');
  const [rank, setRank] = useState(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setScore(value);

    const numericScore = Number(value);
    if (numericScore < 100) {
      setWarning(
        '⚠️ This AI model is trained using CEE UG 2021 results data only. It can predict your rank only if you scored 100 or more.'
      );
    } else {
      setWarning('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericScore = Number(score);

    if (isNaN(numericScore) || numericScore < 0 || numericScore > 200) {
      setError('❌ Please enter a valid score between 0 and 200.');
      setRank(null);
      return;
    }

    if (numericScore < 100) {
      setError('❌ Rank prediction is not supported for scores below 100.');
      setRank(null);
      return;
    }

    setError('');
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: numericScore })
    });

    const data = await res.json();
    setRank(data.predicted_rank);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-start pt-12">
      {/* Navbar */}
      <header className="w-full bg-gray-900 text-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/cee-logo.png" alt="CEE Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-2xl font-semibold">🎓 CEE Rank Predictor (AI-Powered) </h1>
        </div>
      </header>

      {/* Main form card */}
      <main className="flex flex-col items-center mt-12 px-4">
        <div className="bg-gray-800 text-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-6">
            Enter Your Marks to Predict Your Rank
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={score}
              onChange={handleInputChange}
              placeholder="Enter your marks"
              className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
              max={200}
              required
            />

            {warning && (
              <p className="text-yellow-400 text-sm">{warning}</p>
            )}

            {error && (
              <p className="text-red-400 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              🎯 Predict Rank
            </button>
          </form>

          {rank !== null && (
            <p className="mt-6 text-center text-lg text-green-400 font-semibold">
              📊 Predicted Rank: <strong>{rank}</strong>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}