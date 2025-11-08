import React, { useState } from 'react';
import Header from '../shared/Header';
import BookCatalog from './BookCatalog';
import MyBooks from './MyBooks';
import { useLibrary } from '../../context/LibraryContext';

type StudentView = 'dashboard' | 'catalog' | 'mybooks';

const FeatureCard: React.FC<{ icon: string; title: string; description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="text-white p-6 rounded-xl text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
    </div>
);

const StudentDashboard: React.FC<{ setView: (view: StudentView) => void }> = ({ setView }) => {
    const { currentUser } = useLibrary();
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-slate-800 dark:text-white">Welcome, {currentUser?.name}!</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Explore and borrow books from the library</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard icon="🔍" title="Search Books" description="Find books you want to read" onClick={() => setView('catalog')} />
                <FeatureCard icon="📖" title="My Books" description="View your borrowed books" onClick={() => setView('mybooks')} />
                <FeatureCard icon="📅" title="Due Dates" description="Check return deadlines" onClick={() => alert('Feature coming soon!')} />
                <FeatureCard icon="⭐" title="Favorites" description="Save your favorite books" onClick={() => alert('Feature coming soon!')} />
            </div>
        </div>
    );
};

const StudentPortal: React.FC = () => {
  const [view, setView] = useState<StudentView>('dashboard');

  const renderContent = () => {
      switch(view) {
          case 'catalog':
              return <BookCatalog />;
          case 'mybooks':
              return <MyBooks />;
          case 'dashboard':
          default:
              return <StudentDashboard setView={setView} />;
      }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header />
        {view !== 'dashboard' && (
             <button onClick={() => setView('dashboard')} className="mb-4 px-4 py-2 bg-navy-600 text-white font-semibold rounded-lg shadow-md hover:bg-navy-700">
                &larr; Back to Dashboard
             </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentPortal;
