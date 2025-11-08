import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';

const Login: React.FC = () => {
  const { login } = useLibrary();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl space-y-6 animate-slideIn">
        <div className="text-center">
          <div className="text-5xl mb-2">📚</div>
          <h1 className="text-3xl font-bold text-[#667eea]">Library Management</h1>
          <p className="text-slate-500">Sign in to access your account</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md animate-shake">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-[#667eea] focus:ring-1 focus:ring-[#667eea] transition"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-[#667eea] focus:ring-1 focus:ring-[#667eea] transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 text-white font-semibold rounded-lg text-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-sm">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact your administrator to reset your password.'); }} className="font-medium text-[#667eea] hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
};

export default Login;
