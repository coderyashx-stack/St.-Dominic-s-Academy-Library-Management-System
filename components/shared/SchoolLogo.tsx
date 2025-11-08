import React from 'react';
import { BookOpenIcon } from '../icons/BookOpenIcon';

export const SchoolLogo: React.FC<{ size?: 'sm' | 'lg'}> = ({ size = 'lg' }) => (
    <div className="text-center">
        <div className={`mx-auto flex items-center justify-center rounded-full bg-navy-100 dark:bg-navy-800 mb-2 border-4 border-gold-400 ${size === 'lg' ? 'w-24 h-24' : 'w-16 h-16'}`}>
            <div className="relative">
                <span className={`absolute left-1/2 -translate-x-1/2 font-thin text-gold-500 ${size === 'lg' ? '-top-8 text-4xl' : '-top-5 text-2xl'}`}>+</span>
                <BookOpenIcon className={`text-navy-600 dark:text-navy-300 ${size === 'lg' ? 'h-12 w-12' : 'h-8 w-8'}`} />
            </div>
        </div>
        <h2 className={`font-extrabold text-navy-800 dark:text-white ${size === 'lg' ? 'text-3xl' : 'text-xl'}`}>
            St. Dominic’s Academy
        </h2>
        <p className={`mt-1 text-gold-600 dark:text-gold-400 font-serif italic ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
            "Love Unites All"
        </p>
    </div>
);