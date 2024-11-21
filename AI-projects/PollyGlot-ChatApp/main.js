import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const form = document.querySelector("form") 

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts:[{text: "Can you help me with translating text" }]
    },
    {
      role: "model",
      parts:[{text: "Select the language you want me to translate into, type your text and hit send!"}]
    }
  ]
})

const renderUserMessage = () => {
  const userMessageContainer = document.createElement("div") 
  userMessageContainer.classList.add("user-message-container", "message")
  const userMessage = document.createElement("p")
  userMessage.textContent = document.querySelector('input[type="text"]').value
  userMessageContainer.appendChild(userMessage)
  document.querySelector(".messages-container").appendChild(userMessageContainer)
}


const manageLoading = (isLoading) => {
  //to be changed
}

const createPrompt = async () => {
  //we need to add
  const formData = new FormData(form)
  const userPrompt = await chat.sendMessage(`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language") || "Bulgarian"} language?, the answer should contain only the translated words nothing else `)
  console.log(userPrompt.response.text())
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

document.querySelector("button").addEventListener("click", async () => {
  renderUserMessage()
  await createPrompt()
  renderTranslation()
})


