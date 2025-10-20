
import React from 'react';
import type { GroundingChunk } from '../types';

interface ResultsDisplayProps {
    text: string;
    sources: GroundingChunk[];
}

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ text, sources }) => {
    return (
        <div className="w-full space-y-8 mt-8">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Response</h2>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{text}</div>
            </div>

            {sources.length > 0 && (
                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Sources</h2>
                    <ul className="space-y-4">
                        {sources.map((source, index) => (
                            <li key={index} className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                <a
                                    href={source.maps.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-cyan-300 hover:underline"
                                >
                                    <MapPinIcon />
                                    {source.maps.title}
                                </a>
                                {source.maps.placeAnswerSources?.[0]?.reviewSnippets.map((snippet, sIndex) => (
                                   <div key={sIndex} className="mt-2 pl-7 border-l-2 border-slate-600 ml-2">
                                     <p className="text-sm text-gray-400 italic">"{snippet.text}"</p>
                                     <a href={snippet.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">
                                       Read more
                                     </a>
                                   </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
