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
const user = changeUser(usersData)
let tag;
let tagList = [];

// --------------------QUERY SELECTORS
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
const recipeSection = document.querySelector('#recipeSection');
const tagsContainer = document.querySelector('#tagsContainer');
const searchAllRecipesButton = document.querySelector('#searchAllRecipesButton');
const searchCookbookButton = document.querySelector('#searchCookbookButton');
const allRecipesSearchBar = document.querySelector('#allRecipeSearch');
const cookbookSearchBar = document.querySelector('#cookbookSearch');
const allRecipesTab = document.getElementById('tabAllRecipes')
const cookbookTab = document.getElementById('tabCookbook')

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
  updateRecipeDisplay(recipeRepo.allRecipes);
});

window.addEventListener('load', displayAllTags);

searchAllRecipesButton.addEventListener('click', function () {
  searchRecipesByName(allRecipesSearchBar.value);
});

searchCookbookButton.addEventListener('click', function () {
  searchRecipesByName(cookbookSearchBar.value);
})

allRecipesTab.onchange = () => {
  updateTags(recipeRepo.allRecipes)
}

cookbookTab.onchange = () => {
  updateTags(user.favoriteRecipeRepo.allRecipes)
}

// --------------------------------------------- FETCH

// --------------------------------------------- FUNCTIONS

// ----- Recipe Display -----

function updateRecipeDisplay(recipesToDisplay) {
  recipeSection.innerHTML = '';
  recipesToDisplay.forEach((recipe) => {
    const tagsHTML = buildTags(recipe);
    const recipeCard = document.createElement('section');

    buildRecipeCard(recipe, recipeCard, tagsHTML);
    recipeSection.appendChild(recipeCard);
  });
}

function flagFavoritedRecipes(recipe) {
  const isRecipeFavorited = user.favoriteRecipeRepo.allRecipes.includes(recipe)
  if (isRecipeFavorited) {
    return 'star-yellow.png'
  }
  else {
    return 'star.png'
  }
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
      <img class="recipe-favorite-icon" id="${recipe.id}" src="${flagFavoritedRecipes(recipe)}" alt="star icon"/>
    </section>
    <div class="recipe-tags-container">
      ${tags.toString()}
    </div>
  `;

  recipeCard.onclick = (event) => {
    if (event.target.className === 'recipe-favorite-icon') {
      if (event.target.src === 'http://localhost:8080/star.png') {
        event.target.src = 'star-yellow.png';
        addRecipeToCookbook(event.target.parentNode.parentNode.dataset.recipeId);
      }
      else if (event.target.src === 'http://localhost:8080/star-yellow.png') {
        event.target.src = 'star.png';
        removeRecipeFromCookbook(event.target.parentNode.parentNode.dataset.recipeId)
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

function addRecipeToCookbook(recipeId) {
  const foundRecipe = recipeRepo.allRecipes.find((recipe) => {
    return recipe.id.toString() === recipeId
  })
  user.addFavoriteRecipe(foundRecipe)
  console.log(user.favoriteRecipeRepo)
}

function removeRecipeFromCookbook(recipeId) {
  const foundRecipe = user.favoriteRecipeRepo.allRecipes.find((recipe) => {
    return recipe.id.toString() === recipeId;
  })
  user.removeFavoriteRecipe(foundRecipe)
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

// ----- Tags -----

function buildTags(recipe) {
  return recipe.tags
    .map((tag) => {
      return `<p class="recipe-section-tag">${tag}</p>`;
    })
    .join(' ');
}

function displayAllTags() {
  tagsContainer.innerHTML = ''
  let allTags;

  if (allRecipesTab.checked) {
    allTags = recipeRepo.retrieveAllTags();
  }
  else if (!allRecipesTab.checked) {
    allTags = user.favoriteRecipeRepo.retrieveAllTags();
  }

  allTags.forEach((tag) => {
    const tagElement = document.createElement('p');
    tagElement.classList.add('recipe-tag');
    tagElement.innerText = tag;

    tagElement.onclick = tagsToggleFilter;

    tagsContainer.appendChild(tagElement);
    tagList.push(tagElement);
  });
}

function tagsToggleFilter(event) {
  if (tag === event.target.innerText) {
    removeTag(event)
  } else {
    addTag(event)
  }
}

function addTag(event) {
  const filterSelectedTags = tagList.filter((tag) =>
    tag.classList.contains('recipe-tag-selected')
  );

  filterSelectedTags.forEach((tag) =>
    tag.classList.remove('recipe-tag-selected')
  );

  let userTag = getTag(event);

  if (allRecipesTab.checked) {
    const filteredRecipes = recipeRepo.filterByTag(userTag);
    updateRecipeDisplay(filteredRecipes);
  }
  else if (cookbookTab.checked) {
    const filteredRecipes = user.favoriteRecipeRepo.filterByTag(userTag);
    updateRecipeDisplay(filteredRecipes);
  }
}

function removeTag() {
  deselectTag()

  if (allRecipesTab.checked) {
    updateRecipeDisplay(recipeRepo.allRecipes);
  }
  else if (cookbookTab.checked) {
    updateRecipeDisplay(user.favoriteRecipeRepo.allRecipes);
  }
}

function getTag(event) {
  if (event.target.className === 'recipe-tag') {
    tag = event.target.innerText;
    event.target.classList.add('recipe-tag-selected');
    return tag;
  }
}

function updateTags(repo) {
  updateRecipeDisplay(repo)
  displayAllTags()
  deselectTag()
}

function deselectTag() {
  if (document.querySelector('.recipe-tag-selected')) {
    document.querySelector('.recipe-tag-selected').classList.remove('recipe-tag-selected')
  }
  tag = ''
}

// ----- Searching -----

function searchRecipesByName(search) {
  const nameFilteredRecipes = recipeRepo.searchByName(search);
  if (nameFilteredRecipes.length > 0) {
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton();
  }
}

function changeSearchButton() {
  cookbookSearchBar.value = '';
  allRecipesSearchBar.value = '';
}

// ----- Users -----

function changeUser(usersData) {
  const userData = usersData[Math.floor(Math.random() * usersData.length)]
  document.querySelector('.user-greeting').innerText = `Hello, ${userData.name}!`
  return new User(userData);
}
