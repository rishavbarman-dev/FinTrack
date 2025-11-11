/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log(
  "🔑 GEMINI API Key Loaded:",
  process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No"
);

export async function generateSpendingInsight(data) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    // console.log("AI Insights DAta", data);

    const prompt = `
        You are a friendly and intelligent financial advisor writing an insight summary for a monthly email report.

        Analyze the following financial data carefully and provide clear, professional, and easy-to-read insights.

        ### Financial Data for ${data.month}
        - Total Incomes: ${JSON.stringify(data.incomes, null, 2)}
        - Total Expenses: ${JSON.stringify(data.expenses, null, 2)}

        ---

        ### Your Task
        1. Write a **short introductory sentence** that reflects the user’s overall financial health this month.
        2. Then, give **3 concise, actionable insights** about their spending and saving patterns.  
        - Each insight should be 1–2 sentences long.  
        - Use an encouraging, conversational tone (not robotic).  
        3. End with a **friendly closing line** motivating the user for next month.

        ### Style & Formatting
        - Write in **plain text**, formatted cleanly for an email body.  
        - Use **line breaks** between sections (no JSON or markdown).  
        - You may use light bullet points (•) or dashes (-) for clarity.

        ---

        ### Example Format

        Your financial habits in October 2025 show excellent control and consistency.  

        • You saved nearly 30% of your income — a strong sign of discipline.  
        • Entertainment spending rose slightly, so you may want to set a small cap next month.  
        • Groceries and essentials stayed stable, indicating steady budgeting.  

        Keep up the great work, and continue balancing your spending smartly next month!
        `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    console.log("✅ Gemini Insight Generated:", text);
    return text || "No insight available";
  } catch (error) {
    console.error("❌ Gemini insight generation failed:", error);
    return "Unable to generate AI insights this month.";
  }
}
