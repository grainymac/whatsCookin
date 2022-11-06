import './styles.css';
import { fetchAll } from './apiCalls';
import { createPostRequests, postAll } from './postRequests';
import Glide from '@glidejs/glide';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

// --------------------QUERY SELECTORS ------------------

const popupError = document.querySelector('.pop-up-error');
const addIngredientSuccessPopup = document.querySelector(
  '.add-ingredients-success'
);
const popupSuccess = document.querySelector('.pop-up-success');
const logo = document.querySelector('.logo');
const pantryBtn = document.querySelector('.pantry__btn');
const pantry = document.querySelector('.pantry');
const pantryContainer = document.querySelector('.dropdown__header');
const dropdownArrow = document.querySelector('.dropdown__arrow');
const allRecipesSearchBar = document.querySelector('#allRecipeSearch');
const allRecipesTab = document.getElementById('tabAllRecipes');
const clearAllRecipeSearchButton = document.querySelector(
  '#clearAllRecipesButton'
);
const clearCookbookSearchButton = document.querySelector(
  '#clearCookbookButton'
);
const close = document.querySelector('#close');
const cookbookSearchBar = document.querySelector('#cookbookSearch');
const cookbookTab = document.getElementById('tabCookbook');
const modal = document.querySelector('#modal');
const recipeSection = document.querySelector('#recipeSection');
const searchAllRecipesButton = document.querySelector(
  '#searchAllRecipesButton'
);
const searchCookbookButton = document.querySelector('#searchCookbookButton');
const tagsContainer = document.querySelector('#tagsContainer');
const missingIngredientModal = document.querySelector(
  '#missingIngredientModal'
);
const missingIngredientContent = document.querySelector(
  '#missingIngredientModalContent'
);
const addIngredientsBtn = document.querySelector('#addIngredientsBtn');
const cookAfterAddingBtn = document.querySelector(".now-cook-recipe-buttton")

// ------------------- GLOBAL VARIABLES ------------------
const store = {
  userData: [],
  ingredientsData: [],
  recipeData: [],
  recipeRepo: new RecipeRepository(),
  currentRecipe: {},
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
});

glide.mount();

// ------------------ Initialize App ------------------
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

      displayAllTags();
      updateRecipeDisplay(store.recipeRepo.allRecipes);
      defineEventListeners();
      console.log('USER', store.user);
      console.log('PANTRY', store.user.pantry);
    })
    .catch((err) => console.error(err));
};

// ------------------- Post to Server ------------------

function addAllIngredients(recipeID, user) {
  const currentRecipe = store.recipeRepo.findRecipeById(recipeID);
  const neededIngredients = user.getMissingIngredientsForRecipe(currentRecipe);
  const requests = createPostRequests(user, neededIngredients, 1);
  postAll(requests)
    .then((data) => {
      data.forEach((response) => {
        console.log(response);
      });
      store.user.addPantryIngredients(currentRecipe, store.ingredientsData);
      populatePantryDisplay();
      console.log(
        'MISSING AFTER',
        store.user.getMissingIngredientsForRecipe(currentRecipe)
      );
      console.log('NEW PANTRY: ', store.user.pantry);
    })
    .catch((err) => {
      console.error(err);
      popupError.style.display = 'block';
    });
}

function removeIngredientsFromPantry(recipeID, user) {
  const currentRecipe = store.recipeRepo.findRecipeById(recipeID);
  console.log('RECIPE', currentRecipe);
  const requests = createPostRequests(user, currentRecipe.ingredients, -1);
  postAll(requests)
    .then((data) => {
      console.log(data);
      store.user.removePantryIngredients(currentRecipe);
      console.log('PANTRY AFTER REMOVE', store.user.pantry);
      populatePantryDisplay();
      popupSuccess.style.display = 'block';
    })
    .catch((err) => {
      console.error("I'm here!", err);
      popupError.style.display = 'block';
    });
}

// ------------------- EVENT LISTENERS ------------------
window.addEventListener('load', initializeApp);

close.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  } else if (event.target === missingIngredientModal) {
    missingIngredientModal.style.display = 'none';
  }
};

pantryBtn.addEventListener('click', togglePantry);

clearAllRecipeSearchButton.addEventListener('click', function () {
  updateRecipeDisplay(store.recipeRepo.allRecipes);
});

clearAllRecipeSearchButton.addEventListener('click', function () {
  clearSearchBar(allRecipesSearchBar);
});

clearCookbookSearchButton.addEventListener('click', function () {
  updateRecipeDisplay(store.user.favoriteRecipeRepo.allRecipes);
});

clearCookbookSearchButton.addEventListener('click', function () {
  clearSearchBar(cookbookSearchBar);
});

recipeSection.addEventListener('click', recipeCardActionFilter);

const defineEventListeners = () => {
  searchAllRecipesButton.addEventListener('click', function () {
    searchRecipesByName(allRecipesSearchBar.value);
  });

  searchCookbookButton.addEventListener('click', function () {
    searchRecipesByName(cookbookSearchBar.value);
  });

  popupSuccess.addEventListener('click', closePopUp);

  allRecipesTab.onchange = () => {
    resetTabs(store.recipeRepo.allRecipes);
  };

  cookbookTab.onchange = () => {
    resetTabs(store.user.favoriteRecipeRepo.allRecipes);
  };
};

// ------------------ FUNCTIONS ------------------
function toggleIngredientsBtn() {
  addIngredientsBtn.classList.add('btn-loading');
}

function togglePantry() {
  pantry.classList.toggle('pantry__open');
  dropdownArrow.classList.toggle('dropdown__arrow-open');
  populatePantryDisplay();
}

function populatePantryDisplay() {
  pantryContainer.innerHTML = `
  <div class="header__container">
    <h5 class="header__id">Ingredient ID</h5>
    <h5 class="header__stock">Stock</h5>
    <h5 class="header__name">Name</h5>
  </div>
  `;
  store.user.pantry.forEach((pantryIngredient) => {
    if (pantryIngredient.amount) {
      pantryContainer.innerHTML += `
        <div class="pantry__ingredient">
          <p class="ingredient__id">${pantryIngredient.id}</p>
          <p class="ingredient__stock">${pantryIngredient.amount}</p>
          <p class="ingredient__name">${pantryIngredient.name}</p>
        </div>
      `;
    }
  });
}

// ----- Recipe Display -----

function updateRecipeDisplay(recipesToDisplay) {
  recipeSection.innerHTML = '';
  hide(clearAllRecipeSearchButton);
  hide(clearCookbookSearchButton);
  show(searchCookbookButton);
  show(searchAllRecipesButton);
  recipesToDisplay.forEach((recipe) => {
    const recipeCard = document.createElement('section');
    const abilityToCook = determineAbilityToCook(recipe);

    buildRecipeCard(recipe, recipeCard, abilityToCook);
    recipeSection.appendChild(recipeCard);
  });
}

function determineAbilityToCook(recipe) {
  if (store.user.getMissingIngredientsForRecipe(recipe).length > 0) {
    return 'Missing Ingredients!';
  } else {
    console.log('User can cook recipe');
    return 'Cook this recipe!';
  }
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

function buildRecipeCard(recipe, recipeCard, abilityToCook) {
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
  `;
    
  updateRecipeCardButtons(recipe, recipeCard, abilityToCook)
}

function updateRecipeCardButtons (recipe, recipeCard, abilityToCook) {
  const cookRecipeContainer = document.createElement('div');
  cookRecipeContainer.classList.add('cook-recipe-container');
  const abilityToCookBtn = document.createElement('button');
  abilityToCookBtn.classList.add('recipe-card-button');
  abilityToCookBtn.setAttribute('id', 'recipeCardButton');
  abilityToCookBtn.innerText = `${abilityToCook}`;
  abilityToCookBtn.addEventListener('click', function () {
    displayCookRecipePopUp(event, recipe.id, recipeCard);
  });
  cookRecipeContainer.appendChild(abilityToCookBtn);
  recipeCard.appendChild(cookRecipeContainer);
}

function displayCookRecipePopUp(event, recipeID, recipeCard) {
  if (event.target.innerText === 'Cook this recipe!') {
    removeIngredientsFromPantry(recipeID, store.user);
  } else if (event.target.innerText === 'Missing Ingredients!') {
    console.log('EVENT', event.target.innerText);
    createMissingIngredientsModal(recipeID, recipeCard);
  }
}

function createMissingIngredientsModal(recipeID, recipeCard) {
  console.log("THE RECIPE CARD", recipeCard)
  missingIngredientModal.style.display = 'block';
  addIngredientsBtn.addEventListener('click', function () {
    addRecipesToPantry(recipeID);
  });
  close.onclick = () => {
    modal.style.display = 'none';
  };
}

function closePopUp(event) {
  if (event.target.id === 'dismissButton') {
    popupSuccess.style.display = 'none';
  }
}

function addRecipesToPantry(recipeID) {
  toggleIngredientsBtn();
  addAllIngredients(recipeID, store.user);

  setTimeout(() => {
    addIngredientsBtn.classList.remove('btn-loading');
    missingIngredientModal.style.display = 'none';
    addIngredientSuccessPopup.style.display = 'block';
    cookAfterAddingBtn.addEventListener('click', function() {
      addIngredientSuccessPopup.style.display = 'none';
      removeIngredientsFromPantry(recipeID, store.user)
    })
  }, 2000);
}

function displayPopUp() {
  addIngredientSuccessPopup.style.display = 'none';
}


// ----- Adding/Removing Recipes from Favorites -----

function recipeCardActionFilter(event) {
  if (event.target === recipeSection) {
    return;
  }

  const parentCardId = event.target.closest('.recipe-card').dataset.recipeId;

  if (
    event.target.matches('.recipe-favorite-icon') &&
    event.target.src === 'http://localhost:8080/star.png'
  ) {
    event.target.src = 'star-yellow.png';
    addRecipeToCookbook(parentCardId);
  } else if (
    event.target.matches('.recipe-favorite-icon') &&
    event.target.src === 'http://localhost:8080/star-yellow.png'
  ) {
    event.target.src = 'star.png';
    removeRecipeFromCookbook(parentCardId);
    removeFromCookbookDisplay(event.target.closest('.recipe-card'));
  } else if (
    event.target.closest('.recipe-card') &&
    event.target.id !== 'recipeCardButton'
  ) {
    buildModal(
      store.recipeRepo.allRecipes.find((recipe) => recipe.id == parentCardId)
    );
  }
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
  if (cookbookTab.checked) {
    recipeToDelete.remove();
  }
}

function buildModalQuerySelectors(recipe) {
  document.querySelector('.modal-img').src = `${recipe.image}`;
  document.querySelector(
    '.modal-img'
  ).alt = `this is an image of ${recipe.name}`;
  document.querySelector('.modal-title').innerText = `${recipe.name}`;
}

function updateModalIngredients(recipe) {
  const modalIngredientsSection = document.getElementById('ingredientSection');
  modalIngredientsSection.innerHTML = '';
  recipe.ingredients.forEach((ingredient) => {
    modalIngredientsSection.innerHTML += `
        <li class="ingredient">${ingredient.name}: ${ingredient.amount} ${ingredient.unit}</li>
      `;
  });
}

function updateModalInstructions(recipe) {
  const modalInstructionSection = document.getElementById('instructionSection');
  modalInstructionSection.innerHTML = '';
  recipe.getInstructions().forEach((instruction) => {
    modalInstructionSection.innerHTML += `
        <p class="instruction">${instruction}</p>
      `;
  });
}

function updateModalCost(recipe) {
  document.getElementById(
    'modalTotalCost'
  ).innerText = `Total Cost: $${recipe.totalCost()}`;
}

function buildModal(recipe) {
  modal.style.display = 'block';
  buildModalQuerySelectors(recipe);
  updateModalIngredients(recipe);
  updateModalInstructions(recipe);
  updateModalCost(recipe);
}

// ----- Tags -----

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
  clearSearchBar();
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
    let nameFilteredRecipes = store.recipeRepo.searchByName(search);
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton(clearAllRecipeSearchButton, searchAllRecipesButton);
    deselectTag();
  } else if (cookbookTab.checked && search.length > 0) {
    let nameFilteredRecipes =
      store.user.favoriteRecipeRepo.searchByName(search);
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton(clearCookbookSearchButton, searchCookbookButton);
    deselectTag();
  }
}

function changeSearchButton(clearButton, searchButton) {
  show(clearButton);
  hide(searchButton);
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

  return User.fromUserData(userData, store.ingredientsData);
}

// ----- Utilities -----
function getRandomArrayItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
