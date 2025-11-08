import React, { useMemo } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BorrowStatus } from '../../types';
import { DownloadIcon } from '../icons/DownloadIcon';
import { exportToCsv } from '../../utils/export';

const BorrowLogs: React.FC = () => {
    const { borrowRecords, users, books } = useLibrary();

    const populatedRecords = useMemo(() => {
        return borrowRecords.map(record => ({
            ...record,
            user: users.find(u => u.id === record.userId),
            book: books.find(b => b.id === record.bookId)
        })).sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());
    }, [borrowRecords, users, books]);

    const statusStyles: { [key in BorrowStatus]: string } = {
      [BorrowStatus.Borrowed]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [BorrowStatus.Returned]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [BorrowStatus.Overdue]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    const handleExport = () => {
        const headers = ['Record ID', 'Student Name', 'Book Title', 'Borrow Date', 'Due Date', 'Return Date', 'Status'];
        const rows = populatedRecords.map(record => [
            record.id,
            record.user?.name || 'N/A',
            record.book?.title || 'N/A',
            record.borrowDate,
            record.dueDate,
            record.returnDate || '',
            record.status,
        ]);
        exportToCsv('borrow_logs_export.csv', [headers, ...rows]);
    };

    return (
         <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Borrow & Return Logs</h1>
                <button onClick={handleExport} className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                    <DownloadIcon className="h-5 w-5 mr-2"/>
                    Export CSV
                </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                     <thead>
                        <tr className="text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                            <th className="p-3">Record ID</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Book Title</th>
                            <th className="p-3">Borrow Date</th>
                            <th className="p-3">Due Date</th>
                            <th className="p-3">Return Date</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {populatedRecords.map(record => (
                            <tr key={record.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm">
                                <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{record.id}</td>
                                <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{record.user?.name || 'N/A'}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{record.book?.title || 'N/A'}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{record.borrowDate}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{record.dueDate}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{record.returnDate || '---'}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[record.status]}`}>
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowLogs;