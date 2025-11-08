
import React, { useState, useEffect, useCallback } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Book } from '../../types';
import { RefreshIcon } from '../icons/RefreshIcon';

const RecommendationCard: React.FC<{ book: Book, reason: string }> = ({ book, reason }) => (
    <div className="flex-shrink-0 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={book.coverImage} alt={book.title} className="w-full h-32 object-cover" />
        <div className="p-3">
            <h4 className="text-sm font-bold truncate text-slate-800 dark:text-white" title={book.title}>{book.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-2" title={book.author}>by {book.author}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2" title={reason}>"{reason}"</p>
        </div>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="flex-shrink-0 w-48 h-full bg-slate-200 dark:bg-slate-700 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-32 bg-slate-300 dark:bg-slate-600"></div>
        <div className="p-3 space-y-2">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/2"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
        </div>
    </div>
);


const Recommendations: React.FC = () => {
    const { books, borrowRecords, currentUser } = useLibrary();
    const [recommendations, setRecommendations] = useState<{ book: Book; reason: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const generateRecommendations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const userHistory = borrowRecords
                .filter(r => r.userId === currentUser?.id)
                .map(r => books.find(b => b.id === r.bookId)?.title)
                .filter(Boolean) as string[];

            if (userHistory.length === 0) {
                 // Recommend popular books if no history
                const popularBooks = [...books].sort((a,b) => b.quantity - b.available - (a.quantity - a.available)).slice(0, 4);
                setRecommendations(popularBooks.map(b => ({ book: b, reason: "A popular choice in our library."})));
                setIsLoading(false);
                return;
            }

            const catalogForPrompt = books.map(b => ({ title: b.title, author: b.author, category: b.category, description: b.description }));

            const prompt = `Based on the user's borrowing history of these books: [${userHistory.join(', ')}], recommend up to 4 books from the following catalog. Do not recommend books from the user's history. For each recommendation, provide a very short, one-sentence reason why the user might like it.

            Library Catalog:
            ${JSON.stringify(catalogForPrompt, null, 2)}
            `;

            const responseSchema = {
                type: 'OBJECT',
                properties: {
                    recommendations: {
                        type: 'ARRAY',
                        description: 'List of recommended books.',
                        items: {
                            type: 'OBJECT',
                            properties: {
                                title: {
                                    type: 'STRING',
                                    description: "The exact title of the recommended book from the catalog."
                                },
                                reason: {
                                    type: 'STRING',
                                    description: "A short, one-sentence reason for the recommendation."
                                }
                            },
                            required: ['title', 'reason']
                        }
                    }
                }
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema,
                }
            });

            const parsed = JSON.parse(response.text);
            
            if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
                const recs = parsed.recommendations
                    .map((rec: { title: string; reason: string }) => {
                        const book = books.find(b => b.title.toLowerCase() === rec.title.toLowerCase());
                        return book ? { book, reason: rec.reason } : null;
                    })
                    .filter(Boolean);
                setRecommendations(recs as {book: Book, reason: string}[]);
            } else {
                throw new Error("Invalid response format from AI.");
            }

        } catch (e) {
            console.error("Failed to generate recommendations:", e);
            setError("Sorry, I couldn't fetch recommendations right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [books, borrowRecords, currentUser]);

    useEffect(() => {
        generateRecommendations();
    }, [generateRecommendations]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Recommended For You</h2>
                <button 
                    onClick={generateRecommendations} 
                    disabled={isLoading}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-wait"
                    aria-label="Refresh recommendations"
                >
                    <RefreshIcon className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            {error && (
                <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
                {isLoading && Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} />)}
                {!isLoading && !error && recommendations.length > 0 && recommendations.map(({ book, reason }) => (
                    <RecommendationCard key={book.id} book={book} reason={reason} />
                ))}
                 {!isLoading && !error && recommendations.length === 0 && (
                     <div className="w-full text-center py-4">
                         <p className="text-slate-500 dark:text-slate-400">No recommendations available at the moment.</p>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default Recommendations;