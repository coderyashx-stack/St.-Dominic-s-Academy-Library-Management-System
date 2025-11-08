import React, { useState, useMemo } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Book } from '../../types';
import { SearchIcon } from '../icons/SearchIcon';

const BookCard: React.FC<{ book: Book; onBorrow: (bookId: string) => void; isBorrowed: boolean }> = ({ book, onBorrow, isBorrowed }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{book.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-2">by {book.author}</p>
        <p className="text-sm bg-gold-100 text-gold-800 dark:bg-gold-500/20 dark:text-gold-300 inline-block px-2 py-1 rounded-full mb-4">{book.category}</p>
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 line-clamp-3">{book.description}</p>
        <div className="flex justify-between items-center">
          <p className={`font-semibold ${book.available > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {book.available} Available
          </p>
          <button
            onClick={() => onBorrow(book.id)}
            disabled={book.available === 0 || isBorrowed}
            className="px-4 py-2 bg-navy-600 text-white font-semibold rounded-lg shadow-md hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800"
          >
            {isBorrowed ? 'Borrowed' : (book.available > 0 ? 'Borrow' : 'Unavailable')}
          </button>
        </div>
      </div>
    </div>
  );
};


const BookCatalog: React.FC = () => {
  const { books, borrowBook, currentUser, borrowRecords } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const studentBorrowedBookIds = useMemo(() => {
    return new Set(borrowRecords
      .filter(r => r.userId === currentUser?.id && (r.status === 'BORROWED' || r.status === 'OVERDUE'))
      .map(r => r.bookId)
    );
  }, [borrowRecords, currentUser]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || book.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, category]);

  const categories = useMemo(() => ['All', ...new Set(books.map(b => b.category))], [books]);

  return (
    <div>
      <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Book Catalog</h1>
        <p className="text-slate-600 dark:text-slate-400">Browse and borrow from our extensive collection.</p>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-navy-500 focus:outline-none"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-navy-500 focus:outline-none"
            >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} onBorrow={borrowBook} isBorrowed={studentBorrowedBookIds.has(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;