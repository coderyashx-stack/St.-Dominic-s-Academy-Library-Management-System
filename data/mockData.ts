
import { Book, User, BorrowRecord, UserRole, BorrowStatus } from '../types';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@library.com', role: UserRole.Admin },
  { id: 'user-2', name: 'Alice Smith', email: 'alice@school.com', role: UserRole.Student },
  { id: 'user-3', name: 'Bob Johnson', email: 'bob@school.com', role: UserRole.Student },
  { id: 'user-4', name: 'Charlie Brown', email: 'charlie@school.com', role: UserRole.Student },
];

export const mockBooks: Book[] = [
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    quantity: 5,
    available: 3,
    coverImage: 'https://picsum.photos/seed/gatsby/300/450',
    description: 'A novel about the American dream, decadence, and idealism in the Jazz Age.'
  },
  {
    id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    quantity: 3,
    available: 3,
    coverImage: 'https://picsum.photos/seed/mockingbird/300/450',
    description: 'A story of racial injustice and the loss of innocence in the American South.'
  },
  {
    id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    quantity: 7,
    available: 6,
    coverImage: 'https://picsum.photos/seed/1984/300/450',
    description: 'A classic dystopian novel about totalitarianism and surveillance.'
  },
  {
    id: 'book-4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    quantity: 10,
    available: 10,
    coverImage: 'https://picsum.photos/seed/hobbit/300/450',
    description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins.'
  },
   {
    id: 'book-5',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    quantity: 4,
    available: 2,
    coverImage: 'https://picsum.photos/seed/sapiens/300/450',
    description: 'A sweeping overview of the history of Homo sapiens, from the Stone Age to the present.'
  },
  {
    id: 'book-6',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    quantity: 6,
    available: 6,
    coverImage: 'https://picsum.photos/seed/dune/300/450',
    description: 'A science fiction epic about politics, religion, and power on a desert planet.'
  },
  {
    id: 'book-7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    quantity: 5,
    available: 5,
    coverImage: 'https://picsum.photos/seed/pride/300/450',
    description: 'A classic romance novel exploring manners, upbringing, and marriage in 19th-century England.'
  },
   {
    id: 'book-8',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    quantity: 8,
    available: 7,
    coverImage: 'https://picsum.photos/seed/habits/300/450',
    description: 'A practical guide on how to build good habits and break bad ones.'
  },
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: 'rec-1',
    userId: 'user-2',
    bookId: 'book-1',
    borrowDate: '2023-10-01',
    dueDate: '2023-10-15',
    returnDate: '2023-10-14',
    status: BorrowStatus.Returned
  },
  {
    id: 'rec-2',
    userId: 'user-2',
    bookId: 'book-5',
    borrowDate: '2023-10-20',
    dueDate: '2023-11-04',
    status: BorrowStatus.Borrowed
  },
  {
    id: 'rec-3',
    userId: 'user-3',
    bookId: 'book-1',
    borrowDate: '2023-10-18',
    dueDate: '2023-11-01',
    status: BorrowStatus.Borrowed
  },
  {
    id: 'rec-4',
    userId: 'user-3',
    bookId: 'book-3',
    borrowDate: '2023-09-15',
    dueDate: '2023-09-30',
    status: BorrowStatus.Overdue
  },
    {
    id: 'rec-5',
    userId: 'user-4',
    bookId: 'book-8',
    borrowDate: '2023-10-25',
    dueDate: '2023-11-08',
    status: BorrowStatus.Borrowed
  }
];
