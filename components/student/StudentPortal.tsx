import React, { useState } from 'react';
import Header from '../shared/Header';
import BookCatalog from './BookCatalog';
import MyBooks from './MyBooks';

type StudentView = 'catalog' | 'mybooks';

const StudentPortal: React.FC = () => {
  const [view, setView] = useState<StudentView>('catalog');

  const NavLink: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-gold-100 text-gold-800 dark:bg-gold-500/20 dark:text-gold-300'
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
      <Header>
         <nav className="flex space-x-4">
             <NavLink active={view === 'catalog'} onClick={() => setView('catalog')}>
                 Book Catalog
             </NavLink>
             <NavLink active={view === 'mybooks'} onClick={() => setView('mybooks')}>
                 My Books
             </NavLink>
         </nav>
      </Header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {view === 'catalog' && <BookCatalog />}
        {view === 'mybooks' && <MyBooks />}
      </main>
    </div>
  );
};

export default StudentPortal;