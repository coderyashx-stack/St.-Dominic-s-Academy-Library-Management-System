import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import Login from './components/Login';
import StudentPortal from './components/student/StudentPortal';
import AdminPortal from './components/admin/AdminPortal';
import LibrarianPortal from './components/librarian/LibrarianPortal';
import TeacherPortal from './components/teacher/TeacherPortal';
import { UserRole } from './types';
import Chatbot from './components/chatbot/Chatbot';

const AppContent: React.FC = () => {
  const { currentUser } = useLibrary();

  if (!currentUser) {
    return <Login />;
  }

  const renderPortal = () => {
    switch (currentUser.role) {
      case UserRole.Student:
        return <StudentPortal />;
      case UserRole.Admin:
        return <AdminPortal />;
      case UserRole.Librarian:
        return <LibrarianPortal />;
      case UserRole.Teacher:
        return <TeacherPortal />;
      default:
        return <div>Error: Unknown user role.</div>;
    }
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
      <div className="text-slate-800 dark:text-slate-200">
        <AppContent />
      </div>
    </LibraryProvider>
  );
};

export default App;
