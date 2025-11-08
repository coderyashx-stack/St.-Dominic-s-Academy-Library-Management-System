import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { UserRole } from '../../types';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { currentUser, logout } = useLibrary();

  const portalInfo: { [key in UserRole]?: { title: string, icon: string } } = {
    [UserRole.Admin]: { title: 'Admin Dashboard', icon: '👑' },
    [UserRole.Librarian]: { title: 'Librarian Dashboard', icon: '📖' },
    [UserRole.Teacher]: { title: 'Teacher Dashboard', icon: '👨‍🏫' },
    [UserRole.Student]: { title: 'Student Dashboard', icon: '🎓' },
  }

  const currentPortal = currentUser ? portalInfo[currentUser.role] : null;

  return (
    <header className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-5 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#667eea]">
          {currentPortal?.icon} {currentPortal?.title}
        </h1>
        <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="font-semibold text-slate-800 dark:text-white">{currentUser?.name}</p>
            </div>
            <button
              onClick={logout}
              className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Logout
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
