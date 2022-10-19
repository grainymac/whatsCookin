import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Recipe from './classes/Recipe'
import RecipeRepository from './classes/RecipeRepository'
import recipeData from './data/recipes'
// ------------------- GLOBAL VARIABLES
const recipeRepo = new RecipeRepository(recipeData)
let tag;

// --------------------QUERY SELECTORS
// const modalBtn = document.querySelector('#modalBtn');
const modal = document.querySelector('#modal')
const close = document.querySelector('#close')
const recipeSection = document.querySelector('#recipeSection')
const tags = document.querySelector('#tags')

// --------------------EVENT LISTENERS
// modalBtn.onclick = () => {modal.style.display = "block"};
close.onclick = () => {
  modal.style.display = 'none'
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
window.addEventListener('load', function() {updateAllRecipeDisplay(recipeRepo)})
tags.addEventListener('click', getTag)

//will need some event bubblin for the cards we create dynamically later



// --------------------------------------------- FETCH

// --------------------------------------------- FUNCTIONS
function updateAllRecipeDisplay(recipesToDisplay) {
  recipesToDisplay.newAllRecipes.forEach((recipe) => {
    const tagsHTML = recipe.tags
      .map((tag) => {
        return `<p class="recipe-tag">${tag}</p>`
      })
      .join(' ')

    const recipeCard = document.createElement('section')
    recipeCard.classList.add('recipe-card')
    recipeCard.dataset.recipeId = `${recipe.id}`
    recipeCard.innerHTML = `
      <figure class="recipe-figure">
        <img class="recipe-img" src="${
          recipe.image
        }" alt="this is a picture of ${recipe.name}"/>
      </figure>
      <section class="recipe-details-container">
        <h1 class="recipe-title">${recipe.name}</h1>
        <img class="recipe-favorite-icon" src="star.png" alt="star icon"/>
      </section>
      <div class="recipe-tags-container">
        ${tagsHTML.toString()}
      </div>
    `

    // TO DO: Put modal event handler in line 63
    recipeCard.onclick = () => {
      console.log(`hi! ${recipe.name}`)
    }
    recipeSection.appendChild(recipeCard)
  })
}

function getTag(event) {
  if(event.target.className === 'recipe-tag') {
    tag = event.target.id
    getFilteredList(tag);
  }

  function getFilteredList(tag) {
    const filteredRecipeRepo = new RecipeRepository(recipeData);
    filteredRecipeRepo.filterByTag(tag);
    displayFilteredRecipes()
  }

  function displayFilteredRecipes() {

  }
}
