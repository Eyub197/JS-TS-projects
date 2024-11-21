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



// You need a method to create a  prompt  and add it to the dom and then to create a user element and add to the dom to 
// that is really it. It will overflow the container and whoale you have it 

const manageLoading = (isLoading) => {
  //to be changed
}

const createPrompt = async () => {
  //we need to add
  const formData = new FormData(form)
  const userPrompt = await chat.sendMessage(`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language")} language? `)
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
  await createPrompt()
})


