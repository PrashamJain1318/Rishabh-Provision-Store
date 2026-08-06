import { GoogleGenAI } from "@google/genai";
import env from "./env";

export const getGeminiApiKey = (): string => {
  const key = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is missing. Google Gemini AI initialization failed.");
  }
  return key;
};

export const isGeminiConfigured = (): boolean => {
  return Boolean(process.env.GEMINI_API_KEY || env.GEMINI_API_KEY);
};

const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || "dummy_key_for_init";
export const ai = new GoogleGenAI({ apiKey });

export default ai;
