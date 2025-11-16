
import { GoogleGenAI } from "@google/genai";

// FIX: Use import.meta.env and the VITE_ prefix for Vite apps
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const lengthMap: { [key: string]: string } = {
  short: 'a concise summary of 1-2 sentences',
  medium: 'a summary of about 3-4 sentences',
  detailed: 'a detailed summary, capturing the main points and nuances in a comprehensive paragraph',
};

const styleMap: { [key: string]: string } = {
  extractive: 'an extractive summary, pulling key sentences directly from the text',
  abstractive: 'an abstractive summary, generating new sentences to capture the core meaning',
};


export async function summarizeText(text: string, length: string, style: string): Promise<string> {
  if (!text) {
    throw new Error("Input text cannot be empty.");
  }

  const prompt = `Please provide ${styleMap[style]} which is ${lengthMap[length]} for the following text:\n\n---\n\n${text}\n\n---\n\nSummary:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error summarizing text with Gemini API:", error);
    throw new Error("Failed to generate summary. Please check your connection or API key.");
  }
}

export async function humanizeText(text: string): Promise<string> {
  if (!text) {
    throw new Error("Input text cannot be empty.");
  }

  const prompt = `Rewrite the following text to make it sound more natural, engaging, and human-like. Focus on clarity, flow, and a conversational tone. Avoid jargon, passive voice, and overly formal language unless it's essential to the meaning.\n\n---\n\n${text}\n\n---\n\nHumanized Text:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error humanizing text with Gemini API:", error);
    throw new Error("Failed to humanize text. Please check your connection or API key.");
  }
}
