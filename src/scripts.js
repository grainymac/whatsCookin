import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import User from './classes/User';
import usersData from './data/users';

// ------------------- GLOBAL VARIABLES
const recipeRepo = RecipeRepository.fromRecipeData(recipeData);
const userData = usersData[Math.floor(Math.random() * usersData.length)]
const user = User.updateUserGreeting(userData);
let tag;
let tagList = [];

// --------------------QUERY SELECTORS
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
const recipeSection = document.querySelector('#recipeSection');
const tagsContainer = document.querySelector('#tagsContainer');
const searchAllRecipesButton = document.querySelector(
  '#searchAllRecipesButton'
);
const searchCookbookButton = document.querySelector('#searchCookbookButton');
const allRecipesSearchBar = document.querySelector('#allRecipeSearch');
const cookbookSearchBar = document.querySelector('#cookbookSearch');

// --------------------EVENT LISTENERS
close.onclick = () => {
  modal.style.display = 'none';
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
window.addEventListener('load', function () {
  updateAllRecipeDisplay(recipeRepo.allRecipes);
});

window.addEventListener('load', displayAllTags);

searchAllRecipesButton.addEventListener('click', function () {
  searchRecipesByName(allRecipesSearchBar.value);
});

// --------------------------------------------- FETCH

// --------------------------------------------- FUNCTIONS

function updateAllRecipeDisplay(recipesToDisplay) {
  recipeSection.innerHTML = '';
  recipesToDisplay.forEach((recipe) => {
    const tagsHTML = buildTags(recipe);
    const recipeCard = document.createElement('section');

    buildRecipeCard(recipe, recipeCard, tagsHTML);
    recipeSection.appendChild(recipeCard);
  });
}

function displayAllTags() {
  const allTags = recipeRepo.retrieveAllTags();
  allTags.forEach((tag) => {
    const tagElement = document.createElement('p');
    tagElement.classList.add('recipe-tag');
    tagElement.innerText = tag;

    tagElement.onclick = tagsToggleFilter;

    tagsContainer.appendChild(tagElement);
    tagList.push(tagElement);
  });
}

function buildRecipeCard(recipe, recipeCard, tags) {
  recipeCard.classList.add('recipe-card');
  recipeCard.dataset.recipeId = `${recipe.id}`;
  recipeCard.innerHTML = `
    <figure class="recipe-figure">
      <img class="recipe-img" src="${recipe.image}" alt="this is a picture of ${
    recipe.name
  }"/>
    </figure>
    <section class="recipe-details-container">
      <h1 class="recipe-title">${recipe.name}</h1>
      <img class="recipe-favorite-icon" src="star.png" alt="star icon"/>
    </section>
    <div class="recipe-tags-container">
      ${tags.toString()}
    </div>
  `;

  recipeCard.onclick = (event) => {
    if (event.target.className === 'recipe-favorite-icon') {
      console.log(event.target.src)

      if (event.target.src === 'http://localhost:8080/star.png') {
        event.target.src = 'star-yellow.png';
      }
      else if (event.target.src === 'http://localhost:8080/star-yellow.png') {
        event.target.src = 'star.png';
      }
    } else if (event.target.className === 'recipe-section-tag') {
      alert(
        `TAG - ${event.target.innerText}` // placeholder function in case we end up adding event handling for the recipe cars' tags
      );
    } else {
      buildModal(recipe);
    }
  };
}

function buildModal(recipe) {
  modal.style.display = 'block';
  document.querySelector('.modal-title').innerText = `${recipe.name}`;
  const modalIngredientsSection = document.getElementById('ingredientSection');
  modalIngredientsSection.innerHTML = '';
  recipe.ingredients.forEach((ingredient) => {
    modalIngredientsSection.innerHTML += `
        <li class="ingredient">${ingredient.name}: ${ingredient.amount} ${ingredient.unit}</li>
      `;
  });
  const modalInstructionSection = document.getElementById('instructionSection');
  modalInstructionSection.innerHTML = '';
  recipe.getInstructions().forEach((instruction) => {
    modalInstructionSection.innerHTML += `
        <p class="instruction">${instruction}</p>
      `;
  });
  document.getElementById(
    'modalTotalCost'
  ).innerText = `$${recipe.totalCost()}`;
}

function buildTags(recipe) {
  return recipe.tags
    .map((tag) => {
      return `<p class="recipe-section-tag">${tag}</p>`;
    })
    .join(' ');
}

function tagsToggleFilter(event) {
  if (tag === event.target.innerText) {
    updateAllRecipeDisplay(recipeRepo.allRecipes);
    event.target.classList.remove('recipe-tag-selected');
    tag = '';
  } else {
    const filterSelectedTags = tagList.filter((tag) =>
      tag.classList.contains('recipe-tag-selected')
    );
    filterSelectedTags.forEach((tag) =>
      tag.classList.remove('recipe-tag-selected')
    );

    let userTag = getTag(event);
    const filteredRecipes = recipeRepo.filterByTag(userTag);
    updateAllRecipeDisplay(filteredRecipes);
  }

  function getTag(event) {
    if (event.target.className === 'recipe-tag') {
      tag = event.target.innerText;
      event.target.classList.add('recipe-tag-selected');
      return tag;
    }
  }
}

function searchRecipesByName(search) {
  if (searchAllRecipesButton.innerText === 'Search') {
    const nameFilteredRecipes = recipeRepo.searchByName(search);
    updateAllRecipeDisplay(nameFilteredRecipes);
    changeSearchButton();
  } else {
    updateAllRecipeDisplay(recipeRepo.allRecipes);
    changeSearchButton();
  }
}

function changeSearchButton() {
  if (searchAllRecipesButton.innerText === 'Search') {
    searchAllRecipesButton.innerText = 'Clear';
  } else {
    searchAllRecipesButton.innerText = 'Search';
    allRecipesSearchBar.value = '';
  }
}
