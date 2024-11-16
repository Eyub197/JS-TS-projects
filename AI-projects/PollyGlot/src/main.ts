import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})
const form = document.querySelector("form") 
const userInput = document.querySelector(".user-input")


form?.addEventListener("submit", event => {
    event.preventDefault()
    const formData = new FormData(form)
    console.log(formData.get("language"))
})