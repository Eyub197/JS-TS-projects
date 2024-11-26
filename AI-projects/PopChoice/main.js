import './style.css'
import { openai, supabase } from "./utils.js"

const peopleCountInput = document.getElementById('people-count')
const h1 = document.querySelector('h1')
const form = document.querySelector('form')
const main = document.querySelector('main')
const button = document.querySelector(".cta")
let personNHtml = []
let formDataArray = []

const createPersonForm = (i) => `     
      <label for="favorite-movie">What’s your favorite movie and why?</label>
      <textarea rows="4" name="favorite-movie" id="favorite-movie"></textarea>

      <div class="custom-radio-wrapper-1">
        <label class="film-era" for="film-era">Are you in the mood for something new or a classic?</label>
        <div class="new-classic">
          <label class="custom-radio new" for="new">
            <input type="radio" name="film-era" value="new" id="new"> New
          </label>
          <label class="custom-radio classic" for="classic">
            <input class="classic-input" type="radio" name="film-era" value="classic" id="classic"> Classic
          </label>
         </div>
      </div>
        
      <div class="custom-radio-wrapper-2">
        <label for="film-type">What are you in the mood for?</label>
        <div class="film-types">
          <label class="custom-radio" for="funny">
            <input type="radio" name="film-type" id="funny" value="fun">Fun
          </label>
          <label class="custom-radio" for="serious">
            <input class="serious-input" type="radio" name="film-type" value="serious" id="serious"> Serious
          </label>
          <label class="custom-radio" for="inspiring">
            <input class="inspiring-input" type="radio" name="film-type" value="inspiring" id="inspiring"> Inspiring
          </label>
          <label class="custom-radio" for="scary">
            <input class="scary-input" type="radio" name="film-type" value="scary" id="scary"> Scary
          </label>
        </div>
      </div>
      <label for="favorite-film-person">Which famous film person would you love to be stranded on an island with and why?</label>
      <textarea rows="4" name="favorite-film-person" id="favorite-film-person"></textarea>
`
const createBtn = () => {
    let page = 1

    const submitButton = document.createElement('button')   
    submitButton.type = "submit"
    submitButton.textContent = "Next person"

    submitButton.addEventListener("click", () => {
        const formData = new FormData(form) 
        const fromValues = Object.fromEntries(formData.entries())
        formDataArray.push(fromValues)

        if (page >= personNHtml.length) {
            console.log("Then we will render a film and change the button")
            console.log(formDataArray)
            return
        }
        
        if(personNHtml.length - 1 === page) {
            submitButton.textContent = "Show movie"
        }

        h1.textContent = personNHtml[page].index
        form.innerHTML = personNHtml[page].form
        form.appendChild(submitButton)
        page++
    })    

    return submitButton
}

const createPages = (count) => {
    for (let i = 1; i <= count; i++) {
        personNHtml.push({
            index: i,
            form: createPersonForm(i)
        })
    }

    main.classList.remove('vh100-grid')
    h1.textContent = 1
    form.innerHTML = personNHtml[0].form
    form.appendChild(createBtn())
}

form.addEventListener('submit', event => {
    event.preventDefault()
})

button.addEventListener('click', () => {
    createPages(Number(peopleCountInput.value))
})

// TODO 3  Create a place to store the data from all the forms 
// TODO 4 You got this 