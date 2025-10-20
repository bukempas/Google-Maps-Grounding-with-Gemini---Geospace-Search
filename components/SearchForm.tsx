
import React from 'react';

interface SearchFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    locationAvailable: boolean;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);


export const SearchForm: React.FC<SearchFormProps> = ({ prompt, setPrompt, onSubmit, isLoading, locationAvailable }) => {
    return (
        <form onSubmit={onSubmit} className="w-full">
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={locationAvailable ? "e.g., What are the best vegan restaurants nearby?" : "Waiting for location..."}
                    className="w-full p-4 pr-32 bg-slate-800 border border-slate-600 rounded-full focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow duration-200 placeholder-slate-500"
                    disabled={isLoading || !locationAvailable}
                />
                <button
                    type="submit"
                    disabled={isLoading || !locationAvailable}
                    className="absolute inset-y-0 right-0 flex items-center px-6 m-1.5 bg-cyan-600 text-white rounded-full font-semibold hover:bg-cyan-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <SearchIcon />
                    <span className="ml-2">Search</span>
                </button>
            </div>
        </form>
    );
};
