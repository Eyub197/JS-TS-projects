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

      <label for="favourite-movie">What’s your favorite movie and why?</label>
      <textarea rows="4" name="favourite-movie" id="favourite-movie"></textarea>

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
            <input type="radio" name="film-type" id="funny" >Fun
          </label>
          <label class="custom-radio" for="serious">
            <input class="serious-input" type="radio" name="film-type" id="serious"> Serious
          </label>
          <label class="custom-radio" for="inspiring">
            <input class="inspiring-input" type="radio" name="film-type" id="inspiring"> Inspiring
          </label>
          <label class="custom-radio" for="scary">
            <input class="scary-input" type="radio" name="film-type" id="scary"> Scary
          </label>
        </div>
      </div>

      <label for="favorite-film-person">Which famous film person would you love to be stranded on an island with and why?</label>
      <textarea rows="4" name="favorite-film-person" id="favorite-film-person"></textarea>

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

// TODO 3  Create a place to store the data from all the forms 
// TODO 4 You got this 