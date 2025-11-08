import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BorrowStatus, Book, BorrowRecord, User, UserRole } from '../../types';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ElementType;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
            </div>
        </div>
    )
}

const Dashboard: React.FC = () => {
    const { books, users, borrowRecords } = useLibrary();

    const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
    const borrowedBooks = borrowRecords.filter(r => r.status === BorrowStatus.Borrowed || r.status === BorrowStatus.Overdue).length;
    const overdueBooks = borrowRecords.filter(r => r.status === BorrowStatus.Overdue).length;
    const totalStudents = users.filter(u => u.role === UserRole.Student).length;

    const recentActivity = [...borrowRecords]
        .sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime())
        .slice(0, 5)
        .map(record => ({
            ...record,
            user: users.find(u => u.id === record.userId),
            book: books.find(b => b.id === record.bookId)
        }));

    return (
        <div>
            <h1 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Books" value={totalBooks} icon={BookOpenIcon} color="bg-navy-500" />
                <StatCard title="Books Borrowed" value={borrowedBooks} icon={ClipboardListIcon} color="bg-gold-500" />
                <StatCard title="Books Overdue" value={overdueBooks} icon={ClipboardListIcon} color="bg-red-500" />
                <StatCard title="Total Students" value={totalStudents} icon={UsersIcon} color="bg-green-500" />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Recent Activity</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-3">Student</th>
                                <th className="p-3">Book Title</th>
                                <th className="p-3">Borrow Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map(item => (
                                <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{item.user?.name}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">{item.book?.title}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">{item.borrowDate}</td>
                                    <td className="p-3">
                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            item.status === BorrowStatus.Borrowed ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                                            item.status === BorrowStatus.Returned ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`
                                         }>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;