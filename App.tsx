import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import Login from './components/Login';
import StudentPortal from './components/student/StudentPortal';
import AdminPortal from './components/admin/AdminPortal';
import { UserRole } from './types';
import Chatbot from './components/chatbot/Chatbot';

const AppContent: React.FC = () => {
  const { currentUser } = useLibrary();

  if (!currentUser) {
    return <Login />;
  }

  const renderPortal = () => {
    if (currentUser.role === UserRole.Student) {
      return <StudentPortal />;
    }
  
    if (currentUser.role === UserRole.Admin) {
      return <AdminPortal />;
    }
  
    return <div>Error: Unknown user role.</div>;
  }

  return (
    <>
      {renderPortal()}
      <Chatbot />
    </>
  );
};

const App: React.FC = () => {
  return (
    <LibraryProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <AppContent />
      </div>
    </LibraryProvider>
  );
};

export default App;