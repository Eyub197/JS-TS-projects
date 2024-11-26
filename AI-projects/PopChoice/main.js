import './style.css'
import { openai, supabase } from "./utils.js"

const peopleCountInput = document.getElementById('people-count')
const main = document.querySelector('main')
const peopleTimeForm = document.querySelector('.people-time-form')

let personNHtml = []

const createPersonHtml = index => `
    <header>
        <img src="PopChoice-Icon.png" alt="PopChoice logo, smiaily filled popcorn cup ">
        <h1>${index}</h1>  
    </header>
    <form class="person-form">

    </form>
`



const createBtn = () => {
    let counter = 1

    const submitButton = document.createElement('button')   
    submitButton.type = "submit"
    submitButton.textContent = "Next person"

    submitButton.addEventListener("click", () => {
        if(personNHtml.length - 1 === counter) {
            submitButton.textContent = "Show movie"
        }
        main.innerHTML = personNHtml[counter++].html
        main.appendChild(submitButton)
        console.log(`count: ${counter}`)
    })    

    return submitButton
}

const createPages = (count) => {
    for (let i = 1; i <= count; i++) {
        personNHtml.push({
            index: i,
            html: createPersonHtml(i)
        })

        main.classList.remove('vh100-grid')
        main.innerHTML = personNHtml[0].html
        main.appendChild(createBtn(count))
    }
}

peopleTimeForm.addEventListener('submit', event => {
    event.preventDefault()
    createPages(Number(peopleCountInput.value))
})


// TODO 2. Render the correct html and test it forms 
// TODO 3  Create a place to store the data from all the forms 
// TODO 4 You got this 