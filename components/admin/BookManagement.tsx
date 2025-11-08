import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Book } from '../../types';
import Modal from '../shared/Modal';
import { PlusIcon } from '../icons/PlusIcon';
import { PencilIcon } from '../icons/PencilIcon';
import { TrashIcon } from '../icons/TrashIcon';

const BookForm: React.FC<{ book?: Book; onSave: (book: any) => void; onCancel: () => void }> = ({ book, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: book?.title || '',
        author: book?.author || '',
        category: book?.category || '',
        quantity: book?.quantity || 1,
        description: book?.description || '',
        coverImage: book?.coverImage || 'https://picsum.photos/seed/newbook/300/450'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(book ? { ...book, ...formData } : formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{book ? 'Edit Book' : 'Add New Book'}</h2>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy-500 focus:ring-navy-500 dark:bg-slate-700 dark:border-slate-600" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy-500 focus:ring-navy-500 dark:bg-slate-700 dark:border-slate-600" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy-500 focus:ring-navy-500 dark:bg-slate-700 dark:border-slate-600" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Quantity</label>
                <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy-500 focus:ring-navy-500 dark:bg-slate-700 dark:border-slate-600" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy-500 focus:ring-navy-500 dark:bg-slate-700 dark:border-slate-600" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                 <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">Cancel</button>
                 <button type="submit" className="px-4 py-2 rounded-md text-white bg-navy-600 hover:bg-navy-700">Save Book</button>
            </div>
        </form>
    );
};

const BookManagement: React.FC = () => {
    const { books, addBook, updateBook, deleteBook } = useLibrary();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

    const openAddModal = () => {
        setEditingBook(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (book: Book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };
    
    const handleSave = (bookData: Book) => {
        if(editingBook) {
            updateBook(bookData);
        } else {
            addBook(bookData);
        }
        setIsModalOpen(false);
        setEditingBook(undefined);
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Book Management</h1>
                <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-navy-600 text-white font-semibold rounded-lg shadow-md hover:bg-navy-700">
                    <PlusIcon className="h-5 w-5 mr-2"/>
                    Add New Book
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                     <thead>
                        <tr className="text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                            <th className="p-3">Cover</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Category</th>
                            <th className="p-3 text-center">Stock</th>
                            <th className="p-3 text-center">Available</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="p-3"><img src={book.coverImage} alt={book.title} className="w-10 h-14 object-cover rounded"/></td>
                                <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{book.title}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{book.author}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{book.category}</td>
                                <td className="p-3 text-center text-slate-600 dark:text-slate-400">{book.quantity}</td>
                                <td className="p-3 text-center font-semibold text-slate-700 dark:text-slate-300">{book.available}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => openEditModal(book)} className="p-2 text-slate-500 hover:text-navy-600"><PencilIcon className="h-5 w-5"/></button>
                                    <button onClick={() => deleteBook(book.id)} className="p-2 text-slate-500 hover:text-red-600"><TrashIcon className="h-5 w-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <BookForm book={editingBook} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default BookManagement;