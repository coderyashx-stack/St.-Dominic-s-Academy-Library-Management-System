import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { LogoutIcon } from '../icons/LogoutIcon';
import { BookOpenIcon } from '../icons/BookOpenIcon';

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { currentUser, logout } = useLibrary();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <BookOpenIcon className="h-8 w-8 text-navy-500" />
            <div>
              <span className="text-xl font-bold text-navy-800 dark:text-white">St. Dominic’s Academy</span>
              <p className="text-xs text-gold-600 dark:text-gold-400 font-serif italic -mt-1">"Love Unites All"</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             {children}
          </div>
          <div className="flex items-center">
            <div className="text-right mr-4">
                <p className="font-semibold text-slate-800 dark:text-white">{currentUser?.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 dark:focus:ring-offset-slate-800"
              aria-label="Logout"
            >
              <LogoutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;