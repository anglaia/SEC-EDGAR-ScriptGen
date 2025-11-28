import { GoogleGenAI, Type } from "@google/genai";
import { ScriptConfig, GeneratedScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePythonScript = async (config: ScriptConfig): Promise<GeneratedScript> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    You are an expert Python developer specializing in financial data APIs.
    Write a complete, executable Python script to fetch data from the US SEC EDGAR API based on the following requirements.

    User Requirements:
    - Developer Name: ${config.developerName}
    - Developer Email: ${config.developerEmail}
    - Data Goal: ${config.targetData}

    Strict Rules for SEC API:
    1. You MUST use the 'requests' library.
    2. You MUST set the 'User-Agent' header in the exact format: "DeveloperName DeveloperEmail" (e.g., "${config.developerName} ${config.developerEmail}"). This is a hard requirement by the SEC.
    3. You MUST set 'Accept-Encoding' to 'gzip, deflate'.
    4. Handle the specific endpoint for the user's goal (e.g., use 'https://data.sec.gov/submissions/CIK...' for company facts or 'https://www.sec.gov/cgi-bin/browse-edgar' for filings list).
    5. Include error handling for status codes (especially 403 Forbidden).

    Output Format:
    Return a JSON object with two fields:
    - 'code': The raw Python code string (no markdown backticks).
    - 'explanation': A brief explanation of how the script works and which endpoint it uses.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["code", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as GeneratedScript;
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};