
import { GoogleGenAI } from "@google/genai";
import type { GeoLocation, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GroundedResponse {
    text: string;
    sources: GroundingChunk[];
}

export const fetchGroundedResponse = async (prompt: string, location: GeoLocation): Promise<GroundedResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    }
                }
            },
        });

        const text = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        return { text, sources: sources as GroundingChunk[] };

    } catch (error) {
        console.error("Error fetching grounded response:", error);
        if (error instanceof Error) {
            return { text: `Error: ${error.message}`, sources: [] };
        }
        return { text: "An unknown error occurred.", sources: [] };
    }
};
