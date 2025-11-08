import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { User, UserRole } from '../../types';
import { DownloadIcon } from '../icons/DownloadIcon';
import { exportToCsv } from '../../utils/export';

const StudentManagement: React.FC = () => {
  const { users } = useLibrary();

  const students = users.filter(user => user.role === UserRole.Student);

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email'];
    const rows = students.map(student => [
        student.id,
        student.name,
        student.email,
    ]);
    exportToCsv('students_export.csv', [headers, ...rows]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white">Student Management</h1>
        <button onClick={handleExport} className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
            <DownloadIcon className="h-5 w-5 mr-2"/>
            Export CSV
        </button>
      </div>
      
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