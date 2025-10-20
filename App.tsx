
import React, { useState, useEffect, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultsDisplay } from './components/ResultsDisplay';
import { fetchGroundedResponse } from './services/geminiService';
import type { GeoLocation, GroundingChunk } from './types';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<GeoLocation | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setError(null);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setError(`Geolocation is required for this app to function. Please enable it in your browser settings. Error: ${error.message}`);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);

    const handleSearch = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt.trim() || !location) return;

        setIsLoading(true);
        setError(null);
        setResponse(null);
        setSources([]);

        try {
            const result = await fetchGroundedResponse(prompt, location);
            setResponse(result.text);
            setSources(result.sources);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [prompt, location]);

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center p-4 sm:p-8">
            <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <header className="text-center my-8">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        Geo-Grounded Search
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Your location-aware AI assistant powered by Gemini and Google Maps.
                    </p>
                </header>

                <div className="w-full p-6 bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm">
                    <SearchForm 
                        prompt={prompt} 
                        setPrompt={setPrompt}
                        onSubmit={handleSearch}
                        isLoading={isLoading}
                        locationAvailable={!!location}
                    />
                </div>

                {error && (
                    <div className="mt-6 w-full p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                
                {isLoading && <LoadingSpinner />}

                {response && <ResultsDisplay text={response} sources={sources} />}

            </main>
        </div>
    );
};

export default App;
