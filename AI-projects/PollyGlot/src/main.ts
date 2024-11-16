import { GoogleGenerativeAI } from "@google/generative-ai"
import './style.css'

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_AI_API_KEY)
const model = genAi.getGenerativeModel({model: "gemini-1.5-pro"})

const form = document.querySelector("form") 
const translateButton = document.querySelector(".cta")
const resetButton = document.querySelector(".reset")
const languagesAnswerSection = document.querySelector(".languages-answer") 

let aiResponse: string

const manageLoading = (isLoading: boolean): void => {
    if(isLoading) {
        document.querySelector(".loading")?.classList.remove("hidden")
        translateButton!.textContent = "Translating..."
    } else {
        document.querySelector(".loading")?.classList.add("hidden")
        translateButton!.textContent = "Translate"
    }
}

const createPrompt = async () : Promise<string> => {
    const formData = new FormData(form!)
    const prompt = (`Hello, can you translate this text ${formData.get("text")} into ${formData.get("language")} language? I want only the translated text as a response.`)
    manageLoading(true)

    try {
        const result = await model.generateContent(prompt)
        return result.response.text()
    }
    catch (error : any) {
        console.log(error.message)
        return error.message
    }
    
}

const renderTranslation = () : void => {
    document.querySelector('label[for="text"]')!.textContent = "Original text 👇"
    document.querySelector('label[for="languages"]')!.textContent = "Your translation 👇"
    
    languagesAnswerSection!.innerHTML = ""
    const answer = document.createElement("textarea")
    answer.rows = 5
    answer.classList.add("width-100")
    answer.textContent = aiResponse
    languagesAnswerSection!.appendChild(answer)
    
    translateButton?.classList.add("hidden")
    resetButton?.classList.remove("hidden")
} 

form?.addEventListener("submit", event => { event.preventDefault() })

translateButton?.addEventListener("click", async event => {
    event.preventDefault()
    aiResponse = await createPrompt()
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