import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const form = document.querySelector("form") 
const loadingAnimation = document.createElement("div") 


const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts:[{text: "Can you help me with translating text into this language" }]
    },
    {
      role: "model",
      parts:[{text: "Select the language you want me to translate into, type your text and hit send!"}]
    }
  ]
})

let aiTranslation

const aiMessageLoader = (isLoading) => {  
  if (isLoading === true) {
    loadingAnimation.classList.add("loading", "message")
    document.querySelector(".messages-container").appendChild(loadingAnimation)
  } else {
    console.log("else run")
    loadingAnimation.classList.add("hidden")
    loadingAnimation.remove()   
    console.log("class added")
  }
}

const renderUserMessage = () => {
  const userMessageContainer = document.createElement("div") 
  userMessageContainer.classList.add("user-message-container", "message")
  const userMessage = document.createElement("p")
  userMessage.textContent = document.querySelector('input[type="text"]').value
  userMessageContainer.appendChild(userMessage)
  document.querySelector(".messages-container").appendChild(userMessageContainer)
}

const createPrompt = async () => {
  const formData = new FormData(form)
  const result = await chat.sendMessage(`Can you translate ${document.querySelector('input[type="text"]').value} to this language ${formData.get("language") || "Bulgarian"} language? I want only the translated text as a response.`)
  aiTranslation = result.response.text()
  return result.response.text()
}

const renderTranslation = async () => {  
  const aiMessageContainer = document.createElement("div") 
  aiMessageContainer.classList.add("ai-message-container", "message")
  const aiResponse = document.createElement("p")
  aiMessageLoader(true)
  aiResponse.textContent = await createPrompt()
  aiMessageContainer.appendChild(aiResponse)
  document.querySelector(".messages-container").appendChild(aiMessageContainer)
} 

form?.addEventListener("submit", event => { event.preventDefault() })

document.querySelector("button").addEventListener("click", async () => {
  renderUserMessage()
  await renderTranslation()
  aiMessageLoader(false)
})


