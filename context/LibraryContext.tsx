import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Book, User, BorrowRecord, BorrowStatus } from '../types';
import { mockBooks, mockUsers, mockBorrowRecords } from '../data/mockData';

interface LibraryContextType {
  books: Book[];
  users: User[];
  borrowRecords: BorrowRecord[];
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  borrowBook: (bookId: string) => void;
  returnBook: (recordId: string) => void;
  addBook: (book: Omit<Book, 'id' | 'available'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (bookId: string) => void;
  
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(mockBorrowRecords);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const borrowBook = useCallback((bookId: string) => {
    if (!currentUser) return;
    
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId && book.available > 0 
        ? { ...book, available: book.available - 1 } 
        : book
      )
    );

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 14);

    const newRecord: BorrowRecord = {
      id: `rec-${Date.now()}`,
      userId: currentUser.id,
      bookId,
      borrowDate: borrowDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: BorrowStatus.Borrowed,
    };
    setBorrowRecords(prev => [...prev, newRecord]);

  }, [currentUser]);

  const returnBook = useCallback((recordId: string) => {
      const record = borrowRecords.find(r => r.id === recordId);
      if (!record) return;

      setBorrowRecords(prevRecords => 
        prevRecords.map(r => 
          r.id === recordId 
          ? { ...r, status: BorrowStatus.Returned, returnDate: new Date().toISOString().split('T')[0] } 
          : r
        )
      );

      setBooks(prevBooks => 
        prevBooks.map(book =>
          book.id === record.bookId ? { ...book, available: book.available + 1 } : book
        )
      );
  }, [borrowRecords]);
  
  const addBook = useCallback((bookData: Omit<Book, 'id' | 'available'>) => {
    const newBook: Book = {
      ...bookData,
      id: `book-${Date.now()}`,
      available: bookData.quantity,
    };
    setBooks(prev => [...prev, newBook]);
  }, []);

  const updateBook = useCallback((updatedBook: Book) => {
    setBooks(prev => prev.map(book => (book.id === updatedBook.id ? updatedBook : book)));
  }, []);

  const deleteBook = useCallback((bookId: string) => {
    // For simplicity, we just remove the book. A real app should check for active borrows.
    setBooks(prev => prev.filter(book => book.id !== bookId));
  }, []);


  const value = { books, users, borrowRecords, currentUser, login, logout, borrowBook, returnBook, addBook, updateBook, deleteBook };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
