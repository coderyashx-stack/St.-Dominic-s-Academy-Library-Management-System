import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BorrowStatus, BorrowRecord, Book } from '../../types';

const statusStyles: { [key in BorrowStatus]: string } = {
  [BorrowStatus.Borrowed]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [BorrowStatus.Returned]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [BorrowStatus.Overdue]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const MyBooks: React.FC = () => {
  const { borrowRecords, books, currentUser, returnBook } = useLibrary();

  const myRecords = borrowRecords
    .filter(record => record.userId === currentUser?.id)
    .map(record => ({
      ...record,
      book: books.find(b => b.id === record.bookId)
    }))
    .filter(record => record.book)
    .sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());

  const currentlyBorrowed = myRecords.filter(r => r.status === BorrowStatus.Borrowed || r.status === BorrowStatus.Overdue);
  const history = myRecords.filter(r => r.status === BorrowStatus.Returned);

  const BookListItem: React.FC<{ record: BorrowRecord & { book?: Book } }> = ({ record }) => {
    if (!record.book) return null;
    return (
      <li className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm gap-4">
        <div className="flex items-start gap-4">
          <img src={record.book.coverImage} alt={record.book.title} className="w-16 h-24 object-cover rounded-md" />
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">{record.book.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">by {record.book.author}</p>
            <div className="mt-2 text-xs">
              <p>Borrowed: {record.borrowDate}</p>
              <p>Due: {record.dueDate}</p>
              {record.returnDate && <p>Returned: {record.returnDate}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[record.status]}`}>
            {record.status}
          </span>
          {(record.status === BorrowStatus.Borrowed || record.status === BorrowStatus.Overdue) && (
            <button
              onClick={() => returnBook(record.id)}
              className="mt-2 px-4 py-2 bg-navy-600 text-white font-semibold rounded-lg shadow-md hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 text-sm"
            >
              Return Book
            </button>
          )}
        </div>
      </li>
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Currently Borrowed</h1>
        {currentlyBorrowed.length > 0 ? (
          <ul className="space-y-4">
            {currentlyBorrowed.map(record => <BookListItem key={record.id} record={record as BorrowRecord & {book: Book}} />)}
          </ul>
        ) : (
          <p className="text-slate-600 dark:text-slate-400 p-6 bg-white dark:bg-slate-800 rounded-lg text-center">You have no books currently borrowed.</p>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Borrowing History</h1>
        {history.length > 0 ? (
          <ul className="space-y-4">
            {history.map(record => <BookListItem key={record.id} record={record as BorrowRecord & {book: Book}} />)}
          </ul>
        ) : (
          <p className="text-slate-600 dark:text-slate-400 p-6 bg-white dark:bg-slate-800 rounded-lg text-center">No borrowing history found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooks;