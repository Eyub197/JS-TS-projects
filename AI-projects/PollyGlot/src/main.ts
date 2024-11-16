import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})

const form = document.querySelector("form") 
const translateButton = document.querySelector(".cta")
const resetButton = document.querySelector(".reset")
const languagesAnswerSection = document.querySelector(".languages-answer") 

let translatedText: string

const manageLoading = (isLoading: boolean): void => {
    if(isLoading) {
        languagesAnswerSection!.innerHTML = "<p>Loading...</p>"
        translateButton!.textContent = "Translating..."
    } else {
        languagesAnswerSection!.innerHTML = ""
    }
}

const createPrompt = async () => {
    const formData = new FormData(form!)
    const prompt = (`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language")} language? I want only the translated text as a response.`)
    manageLoading(true)
    const result = await model.generateContent(prompt)
    return result.response.text()
}

const renderTranslation = () => {
    document.querySelector('label[for="text"]')!.textContent = "Original text 👇"
    document.querySelector('label[for="languages"]')!.textContent = "Your translation 👇"
    if(languagesAnswerSection) {
        const answer = document.createElement("textarea")
        answer.rows = 5
        answer.classList.add("width-100")
        answer.textContent = translatedText
        languagesAnswerSection.appendChild(answer)
    }
    translateButton?.classList.add("hidden")
    resetButton?.classList.remove("hidden")
} 

form?.addEventListener("submit", event => {
    event.preventDefault()
})

translateButton?.addEventListener("click", async event => {
    event.preventDefault()
    translatedText = await createPrompt()
    manageLoading(false)
    renderTranslation()
})

resetButton?.addEventListener("click", () => {
    document.querySelector('label[for="text"]')!.textContent = "Text to translate 👇"
    document.querySelector('label[for="languages"]')!.textContent = "Select language 👇"
    if(languagesAnswerSection) {
        languagesAnswerSection.innerHTML = `
         <div class="radio-option">
              <input type="radio" name="language" id="language" value="french"> 
              <span class="radio-text">French</span>
              <img src="fr-flag.png" alt="France's flag">
            </div>
            
            <div class="radio-option">
              <input type="radio" name="language" id="language" value="spanish">
              <span class="radio-text"> Spanish</span>
              <img src="sp-flag.png" alt="Spain's flag">
            </div>
            
            <div class="radio-option">
              <input type="radio" name="language" id="language" value="japanese">
              <span class="radio-text">
                Japanese
              </span>
              <img src="jpn-flag.png" alt="Japan's flag">
            </div>  
        `
    }
    resetButton?.classList.add("hidden")
    translateButton?.classList.remove("hidden")
})