import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})

const form = document.querySelector("form") 

const manageLoading = (isLoading) => {
  //to be changed
}

const createPrompt = async () => {
  //we need to add
  const formData = new FormData(form)
  const prompt = (`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language")} language? I want only the translated text as a response.`)
  try {
      const result = await model.generateContent(prompt)
      return result.response.text()
  }
  catch (error) {
      console.log(error.message)
      return error.message
  }
    
}

const renderTranslation = () => {  
  //to be changed
} 

form?.addEventListener("submit", event => { event.preventDefault() })



