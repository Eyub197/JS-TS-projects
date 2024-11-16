import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})
