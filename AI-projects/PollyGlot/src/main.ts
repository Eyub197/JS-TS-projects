import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})
const form = document.querySelector("form") 
const userInput = document.querySelector(".user-input")
const translateButton = document.querySelector(".cta")


const createPrompt = async () => {
    const formData = new FormData(form!)
    const prompt = (`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language")} language? `)
    const result = await model.generateContent(prompt)
    console.log(result.response.text())
    return result.response.text()
}

form?.addEventListener("submit", event => {
    event.preventDefault()
})

translateButton?.addEventListener("click", event => {
    event.preventDefault()
    createPrompt()
})