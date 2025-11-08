
import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { User, UserRole } from '../../types';

const StudentManagement: React.FC = () => {
  const { users } = useLibrary();

  const students = users.filter(user => user.role === UserRole.Student);

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white">Student Management</h1>
      
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <th className="p-3">Student ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: User) => (
              <tr key={student.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 font-mono text-sm text-slate-600 dark:text-slate-400">{student.id}</td>
                <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{student.name}</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
