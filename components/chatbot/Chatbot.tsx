import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '@google/genai';
import { ChatBubbleIcon } from '../icons/ChatBubbleIcon';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PaperAirplaneIcon } from '../icons/PaperAirplaneIcon';

const libraryInfo = `
St. Dominic’s Academy, Shikohabad – Library Information

Book Collection & Periodicals
The school’s official CBSE disclosure reports that the library is “well equipped and spacious” and currently holds 6,610 books in its stock. It also subscribes to 4 leading daily newspapers and 10 magazines suitable for students. (No breakdown by subject or language is given.) The publicly available information makes no mention of any digital library or e-book collection, so the library’s resources appear focused on printed books and periodicals.

Digital Resources
No explicit information was found on any e-books, online journals or other digital library services. All references to the library in official sources describe physical media (books, newspapers, magazines) and general facilities – there is no mention of an online catalog or e-learning content on the school’s site or disclosures.

Library Hours & Access
Public listings suggest that the school (and by extension its library) operates roughly 8:00 AM to 6:00 PM every day. For example, an online FAQ indicates the academy is “functional” Monday through Sunday from 8:00 AM–6:00 PM. (The school’s website itself does not explicitly list library hours, but public listings imply a daily schedule from 8:00 AM.)

Services Provided
Borrowing (Book Bank): The campus facilities include a “Book Bank” in addition to the library, which implies a lending system for textbooks or library materials.
Reading Space: The library is described as “well equipped and spacious”. In addition, the school lists a dedicated Reading Corner among its amenities, indicating that students have on-site study areas.
Periodicals: As noted, students have access to 4 daily newspapers and 10 magazines through the library.
Other Facilities: The campus is said to include Internet/computer facilities as part of its infrastructure, suggesting students can use computers for research. (For example, the school’s published facilities list includes “Academic-Library, Internet, Book Bank, … Reading Corner”.)

Logo
The official crest (logo) of St. Dominic’s Academy, Shikohabad, as displayed on school materials. The school’s logo appears on its publications and campus signage. The crest features a cross above an open book, surrounded by a wreath, with the motto “Love Unites All” on a scroll beneath.

Additional Information
Address: St. Dominic’s Academy is located at Bhooda, Agra Road, Shikohabad, Uttar Pradesh – 283135.
Contact: The official email is st.dominicsacademy@gmail.com and a contact mobile number is provided as 09368708528.
Affiliation: The school is permanently affiliated to CBSE (Affiliation No. 2132053), which appears on its mandatory disclosure.
`;

const systemInstruction = `You are a friendly and helpful library assistant for St. Dominic’s Academy, Shikohabad. Your goal is to answer questions based ONLY on the following information. If a question cannot be answered from this text, you must politely state that you do not have information on that topic. Do not invent information. Keep your answers concise. CONTEXT: ${libraryInfo}`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      const initializeChat = async () => {
        try {
          const { GoogleGenAI } = await import('@google/genai');
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          chatRef.current = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: { systemInstruction },
          });
        } catch (error) {
            console.error("Failed to initialize Gemini AI:", error);
            setMessages([{ role: 'model', text: 'Sorry, the chat service is currently unavailable.' }]);
        }
      };
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: currentInput });
      const botMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const ChatWindow = () => (
    <div className="fixed bottom-24 right-4 sm:right-6 lg:right-8 w-[calc(100%-2rem)] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Library Assistant</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          <XMarkIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </button>
      </header>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-navy-600 text-white rounded-br-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap'}}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg">
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the library..."
            className="w-full pl-4 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-full bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-navy-500 focus:outline-none"
            disabled={isLoading || !chatRef.current}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-600 text-white hover:bg-navy-700 disabled:bg-slate-400 disabled:cursor-not-allowed">
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 lg:right-8 z-50">
      {isOpen && <ChatWindow />}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-navy-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 dark:focus:ring-offset-slate-900 transition-transform duration-200 hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <XMarkIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
      </button>
    </div>
  );
};

export default Chatbot;
