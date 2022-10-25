import './styles.css';
import { fetchAll } from './apiCalls';
import Glide from '@glidejs/glide';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

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
const allRecipesTab = document.getElementById('tabAllRecipes');
const cookbookTab = document.getElementById('tabCookbook');
const clearCookbookSearchButton = document.querySelector('#clearCookbookButton');
const clearAllRecipeSearchButton = document.querySelector('#clearAllRecipesButton');

// ------------------- GLOBAL VARIABLES
const store = {
  userData: [],
  ingredientsData: [],
  recipeData: [],
  recipeRepo: new RecipeRepository(),
  user: new User(),
  tagList: [],
  tag: '',
};

var glide = new Glide('.glide', {
  type: 'carousel',
  autoplay: 5000,
  hoverpause: false,
  perView: 2,
  gap: 0,
  focusAt: 'center',
  animationTimingFunc: 'ease-in-out',
  animationDuration: 800,
  perTouch: 2,
  // breakpoints: {
  //   800: {
  //     perView: 1,
  //   },
  //   480: {
  //     perView: 1,
  //   },
  // },
});

glide.mount();

// --------------------------------------------- Initialize App
const initializeApp = () => {
  fetchAll()
    .then((data) => {
      // Set global variables
      store.userData = data.usersData;
      store.ingredientsData = data.ingredientsData;
      store.recipeData = data.recipeData;
      store.recipeRepo = RecipeRepository.fromRecipeData(
        store.recipeData,
        store.ingredientsData
      );
      store.user = changeUser(store.userData);

      // Change DOM
      displayAllTags();
      updateRecipeDisplay(store.recipeRepo.allRecipes);

      // Bind event listeners
      defineEventListeners();
    })
    .catch((err) => console.error(err));
};

// ------------------- EVENT LISTENERS
window.addEventListener('load', initializeApp);

close.onclick = () => {
  modal.style.display = 'none';
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

clearAllRecipeSearchButton.addEventListener('click', function () {updateRecipeDisplay(store.recipeRepo.allRecipes)})

clearAllRecipeSearchButton.addEventListener('click', function () {
  clearSearchBar(allRecipesSearchBar)})

clearCookbookSearchButton.addEventListener('click', function () {updateRecipeDisplay(store.user.favoriteRecipeRepo.allRecipes)})

clearCookbookSearchButton.addEventListener('click', function () {
  clearSearchBar(cookbookSearchBar)})




const defineEventListeners = () => {
  searchAllRecipesButton.addEventListener('click', function () {
    searchRecipesByName(allRecipesSearchBar.value);
  });

  searchCookbookButton.addEventListener('click', function () {
    searchRecipesByName(cookbookSearchBar.value);
  });

  allRecipesTab.onchange = () => {
    resetTabs(store.recipeRepo.allRecipes);
  };

  cookbookTab.onchange = () => {
    resetTabs(store.user.favoriteRecipeRepo.allRecipes);
  };

}

// --------------------------------------------- FUNCTIONS

// ----- Recipe Display -----

function updateRecipeDisplay(recipesToDisplay) {
  recipeSection.innerHTML = '';
  hide(clearAllRecipeSearchButton);
  hide(clearCookbookSearchButton);
  show(searchCookbookButton);
  show(searchAllRecipesButton);
  recipesToDisplay.forEach((recipe) => {
    const tagsHTML = buildTags(recipe);
    const recipeCard = document.createElement('section');

    buildRecipeCard(recipe, recipeCard, tagsHTML);
    recipeSection.appendChild(recipeCard);
  });
}

function flagFavoritedRecipes(recipe) {
  const isRecipeFavorited =
    store.user.favoriteRecipeRepo.allRecipes.includes(recipe);
  if (isRecipeFavorited) {
    return 'star-yellow.png';
  } else {
    return 'star.png';
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
      <img class="recipe-favorite-icon" id="${
        recipe.id
      }" src="${flagFavoritedRecipes(recipe)}" alt="star icon"/>
    </section>
    <div class="recipe-tags-container">
      ${tags.toString()}
    </div>
  `;

  recipeCard.onclick = (event) => {
    if (event.target.className === 'recipe-favorite-icon') {
      if (event.target.src === 'http://localhost:8080/star.png') {
        event.target.src = 'star-yellow.png';
        addRecipeToCookbook(
          event.target.parentNode.parentNode.dataset.recipeId
        );
      } else if (event.target.src === 'http://localhost:8080/star-yellow.png') {
        event.target.src = 'star.png';
        removeRecipeFromCookbook(
          event.target.parentNode.parentNode.dataset.recipeId);
        removeFromCookbookDisplay(event.target.parentNode.parentNode);
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
  const foundRecipe = store.recipeRepo.allRecipes.find((recipe) => {
    return recipe.id.toString() === recipeId;
  });
  store.user.addFavoriteRecipe(foundRecipe);
}

function removeRecipeFromCookbook(recipeId) {
  const foundRecipe = store.user.favoriteRecipeRepo.allRecipes.find(
    (recipe) => {
      return recipe.id.toString() === recipeId;
    }
  );
  store.user.removeFavoriteRecipe(foundRecipe);
}

function removeFromCookbookDisplay(recipeToDelete) {
  if(cookbookTab.checked) {
    recipeToDelete.remove();
  }
}


function buildModal(recipe) {
  modal.style.display = 'block';
  document.querySelector('.modal-img').src = `${recipe.image}`
  document.querySelector('.modal-img').alt = `this is an image of ${recipe.name}`
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
  ).innerText = `Total Cost: $${recipe.totalCost()}`;
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
  tagsContainer.innerHTML = '';
  let allTags;

  if (allRecipesTab.checked) {
    allTags = store.recipeRepo.retrieveAllTags();
  } else if (!allRecipesTab.checked) {
    allTags = store.user.favoriteRecipeRepo.retrieveAllTags();
  }

  allTags.forEach((tag) => {
    const tagElement = document.createElement('p');
    tagElement.classList.add('recipe-tag');
    tagElement.innerText = tag;

    tagElement.onclick = tagsToggleFilter;

    tagsContainer.appendChild(tagElement);
    store.tagList.push(tagElement);
  });
}

function tagsToggleFilter(event) {
  if (store.tag === event.target.innerText) {
    removeTag(event);
  } else {
    addTag(event);
  }
}

function addTag(event) {
  const filterSelectedTags = store.tagList.filter((tag) =>
    tag.classList.contains('recipe-tag-selected')
  );

  filterSelectedTags.forEach((tag) =>
    tag.classList.remove('recipe-tag-selected')
  );

  let userTag = getTag(event);

  if (allRecipesTab.checked) {
    const filteredRecipes = store.recipeRepo.filterByTag(userTag);
    updateRecipeDisplay(filteredRecipes);
  } else if (cookbookTab.checked) {
    const filteredRecipes = store.user.favoriteRecipeRepo.filterByTag(userTag);
    updateRecipeDisplay(filteredRecipes);
  }
}

function removeTag() {
  deselectTag();

  if (allRecipesTab.checked) {
    updateRecipeDisplay(store.recipeRepo.allRecipes);
  } else if (cookbookTab.checked) {
    updateRecipeDisplay(store.user.favoriteRecipeRepo.allRecipes);
  }
}

function getTag(event) {
  if (event.target.className === 'recipe-tag') {
    store.tag = event.target.innerText;
    event.target.classList.add('recipe-tag-selected');
    return store.tag;
  }
}

function resetTabs(repo) {
  updateRecipeDisplay(repo);
  displayAllTags();
  deselectTag();
  clearSearchBar();
}

function deselectTag() {
  if (document.querySelector('.recipe-tag-selected')) {
    document
      .querySelector('.recipe-tag-selected')
      .classList.remove('recipe-tag-selected');
  }
  store.tag = '';
}

// ----- Searching -----

function searchRecipesByName(search) {
  if (allRecipesTab.checked && search.length > 0) {
    let nameFilteredRecipes = store.recipeRepo.searchByName(search)
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton(clearAllRecipeSearchButton, searchAllRecipesButton);
  } 
  else if (cookbookTab.checked && search.length > 0) {
    let nameFilteredRecipes = store.user.favoriteRecipeRepo.searchByName(search)
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton(clearCookbookSearchButton, searchCookbookButton);
  }
}

function changeSearchButton(clearButton, searchButton) {
  show(clearButton)
  hide(searchButton)
}

function clearSearchBar() {
  cookbookSearchBar.value = '';
  allRecipesSearchBar.value = '';
}

// ----- Users -----

function changeUser(usersData) {
  const userData = getRandomArrayItem(usersData);
  document.querySelector(
    '.user-greeting'
  ).innerText = `Hello, ${userData.name}!`;
  return new User(userData);
}

// ----- Utilities -----
function getRandomArrayItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}