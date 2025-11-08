import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import Dashboard from './Dashboard';
import BookManagement from './BookManagement';
import StudentManagement from './StudentManagement';
import BorrowLogs from './BorrowLogs';
import { SchoolLogo } from '../shared/SchoolLogo';

type AdminView = 'dashboard' | 'books' | 'students' | 'logs';

const AdminPortal: React.FC = () => {
  const { currentUser, logout } = useLibrary();
  const [view, setView] = useState<AdminView>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'books', label: 'Book Management', icon: BookOpenIcon },
    { id: 'students', label: 'Student Management', icon: UsersIcon },
    { id: 'logs', label: 'Borrow Logs', icon: ClipboardListIcon },
  ];

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <BookManagement />;
      case 'students':
        return <StudentManagement />;
      case 'logs':
        return <BorrowLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-800 shadow-lg flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <SchoolLogo size="sm" />
        </div>
        <nav className="flex-grow p-4">
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setView(item.id as AdminView)}
                  className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                    view === item.id
                      ? 'bg-gold-100 text-gold-800 dark:bg-gold-500/20 dark:text-gold-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="mb-4">
                 <p className="font-semibold text-slate-800 dark:text-white">{currentUser?.name}</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser?.role}</p>
            </div>
             <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 my-1 rounded-lg transition-colors duration-200 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <LogoutIcon className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;