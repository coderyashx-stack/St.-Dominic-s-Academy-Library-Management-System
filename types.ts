export enum UserRole {
  Admin = 'ADMIN',
  Student = 'STUDENT',
  Librarian = 'LIBRARIAN',
  Teacher = 'TEACHER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  quantity: number;
  available: number;
  coverImage: string;
  description: string;
}

export enum BorrowStatus {
    Borrowed = 'BORROWED',
    Returned = 'RETURNED',
    Overdue = 'OVERDUE',
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: BorrowStatus;
}
