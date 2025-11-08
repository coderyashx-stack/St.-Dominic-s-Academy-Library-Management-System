import React from 'react';
import Header from '../shared/Header';
import { useLibrary } from '../../context/LibraryContext';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="text-white p-6 rounded-xl text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
    </div>
);

const TeacherPortal: React.FC = () => {
    const { currentUser } = useLibrary();

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
             <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <Header />
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 dark:text-white">Welcome, {currentUser?.name}!</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Access library resources from here</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard icon="📚" title="Browse Books" description="Search and view available books" />
                        <FeatureCard icon="📖" title="My Books" description="View your borrowed books" />
                        <FeatureCard icon="📝" title="Request Books" description="Request new books for the library" />
                        <FeatureCard icon="📊" title="Reading History" description="View your reading history" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherPortal;
