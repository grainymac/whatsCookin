import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Recipe from './classes/Recipe'
import RecipeRepository from './classes/RecipeRepository'
import recipeData from './data/recipes'
// ------------------- GLOBAL VARIABLES
const recipeRepo = new RecipeRepository(recipeData)
let tag

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
window.addEventListener('load', function () {
  updateAllRecipeDisplay(recipeRepo.allRecipes)
})
tags.addEventListener('click', tagsToggleFilter)


// --------------------------------------------- FETCH

// --------------------------------------------- FUNCTIONS

function updateAllRecipeDisplay(recipesToDisplay) {
  recipeSection.innerHTML = ''
    recipesToDisplay.forEach((recipe) => {
    const tagsHTML = buildTags(recipe)
    const recipeCard = document.createElement('section')

    buildRecipeCard(recipe, recipeCard, tagsHTML)
    buildModal(recipe, recipeCard)
    recipeSection.appendChild(recipeCard)
  })
}


function buildRecipeCard(recipe, recipeCard, tags) {
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
      ${tags.toString()}
    </div>
  `
}

function buildModal(recipe, recipeCard) {
  recipeCard.onclick = () => {
    modal.style.display = 'block'
    document.querySelector('.modal-title').innerText = `${recipe.name}`
    document.getElementById('modalIngredients').innerText = `Ingredients: ${recipe.ingredients.map(ingredient => ingredient.name).join(', ')}`
    document.getElementById('modalInstructions').innerText = `${recipe.getInstructions().join(`
    
    `)}`
    document.getElementById('modalTotalCost').innerText = `$${recipe.totalCost()}`
  }
}

function buildTags(recipe) {
  return recipe.tags.map((tag) => {
    return `<p class="recipe-tag">${tag}</p>`
  }).join(' ')
}

function tagsToggleFilter(event) {
  if (tag === event.target.innerText) {
    updateAllRecipeDisplay(recipeRepo.allRecipes)
    event.target.style.backgroundColor = 'cornflowerblue'
    tag = ''
  } else {
    let userTag = getTag(event)
    const filteredRecipes = recipeRepo.filterByTag(userTag)
    updateAllRecipeDisplay(filteredRecipes)
  }
}

function getTag(event) {
  if (event.target.className === 'recipe-tag') {
    tag = event.target.innerText
    event.target.style.backgroundColor = 'hotpink'
    return tag
  }
}

//create tags element and dynamically create the event listener on each tag
