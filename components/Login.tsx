import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { User } from '../types';
import { SchoolLogo } from './shared/SchoolLogo';

const Login: React.FC = () => {
  const { users, login } = useLibrary();
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      login(selectedUserId);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-slate-800">
        <SchoolLogo />
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user-select" className="sr-only">Choose a user</label>
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="relative block w-full px-3 py-3 text-lg border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
              >
                {users.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;