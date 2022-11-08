import './styles.css';
import { fetchAll } from './apiCalls';
import { createPostRequests, postAll } from './postRequests';
import Glide from '@glidejs/glide';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

// --------------------QUERY SELECTORS ------------------

const addIngredientsBtn = document.querySelector('#addIngredientsBtn');
const addIngredientModal = document.querySelector('#addIngredientModal');
const addIngredientSuccessPopup = document.querySelector('.add-ingredients-success');
const allRecipesSearchBar = document.querySelector('#allRecipeSearch');
const allRecipesTab = document.getElementById('tabAllRecipes');
const clearAllRecipeSearchButton = document.querySelector('#clearAllRecipesButton');
const clearCookbookSearchButton = document.querySelector('#clearCookbookButton');
const close = document.querySelector('#close');
const closeIngredientModal = document.querySelector('#closeIngredientModal');
const cookbookSearchBar = document.querySelector('#cookbookSearch');
const cookbookTab = document.getElementById('tabCookbook');
const dropdownArrow = document.querySelector('.dropdown__arrow');
const loadCooking = document.querySelector('.pop-up-cooking');
const missingIngredientModal = document.querySelector('#missingIngredientModal');
const missingIngredientsList = document.querySelector('.missing-ingredients-list');
const modal = document.querySelector('#modal');
const pantry = document.querySelector('.pantry');
const pantryBtn = document.querySelector('.pantry__btn');
const pantryContainer = document.querySelector('.dropdown__header');
const popupError = document.querySelector('.pop-up-error');
const popupSuccess = document.querySelector('.pop-up-success');
const recipeSection = document.querySelector('#recipeSection');
const searchAllRecipesButton = document.querySelector('#searchAllRecipesButton');
const searchCookbookButton = document.querySelector('#searchCookbookButton');
const tagsContainer = document.querySelector('#tagsContainer');


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

let cookbookFlag = false;

let currentRecipeDisplay;

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
      resetCurrentRecipeRepo(store.recipeRepo.allRecipes);

      defineEventListeners();
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
      store.user.addPantryIngredients(currentRecipe, store.ingredientsData);
      setTimeout(() => {
        populatePantryDisplay();
        display(addIngredientSuccessPopup)
        updateRecipeDisplay(currentRecipeDisplay);
      }, 1900);
    })
    .catch((err) => {
      console.error(err);
      display(popupError);
    });
}

function removeIngredientsFromPantry(recipeID, user) {
  const currentRecipe = store.recipeRepo.findRecipeById(recipeID);
  const requests = createPostRequests(user, currentRecipe.ingredients, -1);
  postAll(requests)
    .then((data) => {
      store.user.removePantryIngredients(currentRecipe);
      display(loadCooking)
      setTimeout(() => {
        populatePantryDisplay();
        updateRecipeDisplay(currentRecipeDisplay);
        removeDisplay(loadCooking);
        display(popupSuccess);
      }, 2000);
    })
    .catch((err) => {
      console.error('CATCH ERROR', err);
      display(popupError)
      updateRecipeDisplay(currentRecipeDisplay);
      console.log('NEEDED', user.getMissingIngredientsForRecipe(currentRecipe));
    });
}

// ------------------- EVENT LISTENERS ------------------
window.addEventListener('load', initializeApp);


const defineEventListeners = () => {

  pantryBtn.addEventListener('click', togglePantry);

  pantryBtn.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
      togglePantry()
    }
  })

  clearAllRecipeSearchButton.addEventListener('click', function () {
    resetCurrentRecipeRepo(store.recipeRepo.allRecipes);
    updateRecipeDisplay(store.recipeRepo.allRecipes);
  });
  
  clearAllRecipeSearchButton.addEventListener('click', function () {
    clearSearchBar(allRecipesSearchBar);
  });
  
  clearCookbookSearchButton.addEventListener('click', function () {
    resetCurrentRecipeRepo(store.user.favoriteRecipeRepo.allRecipes);
    updateRecipeDisplay(store.user.favoriteRecipeRepo.allRecipes);
  });
  
  clearCookbookSearchButton.addEventListener('click', function () {
    clearSearchBar(cookbookSearchBar);
  });

  recipeSection.addEventListener('click', recipeCardActionFilter);
  
  recipeSection.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
      recipeCardActionFilter(event)
    }
  })

  searchAllRecipesButton.addEventListener('click', function () {
    searchRecipesByName(allRecipesSearchBar.value);
  });

  searchCookbookButton.addEventListener('click', function () {
    searchRecipesByName(cookbookSearchBar.value);
  });

  
  allRecipesTab.addEventListener('click', (event) => {
    resetTabs(event, store.recipeRepo.allRecipes);
  });

  cookbookTab.addEventListener('click', (event) => {
    resetTabs(event, store.user.favoriteRecipeRepo.allRecipes);
  });
  
};


// ----------Add ingredients event listeners----------

addIngredientModal.onclick = () => {
  removeDisplay(addIngredientSuccessPopup)
};

addIngredientsBtn.addEventListener('click', addToPantry);



// ---------- Close modals event listeners -------------

window.onclick = (event) => {
  if (event.target == modal) {
    removeDisplay(modal)
  } else if (event.target === missingIngredientModal) {
    removeDisplay(missingIngredientModal)
  }
};

window.addEventListener('keyup', (event) => {
  if(event.key === 'Escape') {
    removeDisplay(modal);
    removeDisplay(popupSuccess);
    removeDisplay(popupError);
    removeDisplay(addIngredientSuccessPopup);
    removeDisplay(addIngredientModal);
    removeDisplay(missingIngredientModal);
  }
})

close.onclick = () => {
  removeDisplay(modal)
};

closeIngredientModal.onclick = () => {
  removeDisplay(missingIngredientModal)
};

popupSuccess.addEventListener('click', closePopUp);

popupError.addEventListener('click', closePopUp);




// ------------------ FUNCTIONS ------------------


function togglePantry() {
  pantry.classList.toggle('pantry__open')
  if(pantry.classList.contains('pantry__open')) {
    pantry.ariaExpanded = 'true';
  } else {
    pantry.ariaExpanded = 'false'}
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

// ----- Recipe Card Display -----

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
  recipeCard.setAttribute('tabIndex', 0)
  recipeCard.dataset.recipeId = `${recipe.id}`;
  recipeCard.innerHTML = `
    <figure class="recipe-figure">
      <img class="recipe-img" src="${recipe.image}" alt="this is a picture of ${
    recipe.name
  }"/>
    </figure>
    <section class="recipe-details-container">
      <h1 class="recipe-title">${recipe.name}</h1>
      <img class="recipe-favorite-icon" tabindex=0 id="${
        recipe.id
      }" src="${flagFavoritedRecipes(recipe)}" alt="star icon"/>
    </section>
  `;
  if (cookbookFlag) {
    updateRecipeCardButtons(recipe, recipeCard, abilityToCook);
  }
}


function updateRecipeCardButtons(recipe, recipeCard, abilityToCook) {
  const cookRecipeContainer = document.createElement('div');
  cookRecipeContainer.classList.add('cook-recipe-container');
  const abilityToCookBtn = document.createElement('button');
  abilityToCookBtn.classList.add('recipe-card-button');
  abilityToCookBtn.setAttribute('id', 'recipeCardButton');
  abilityToCookBtn.setAttribute('tabindex', 0)
  abilityToCookBtn.innerText = `${abilityToCook}`;
  const recipeStatus = abilityToCookBtn.innerText;
  if (recipeStatus === 'Cook this recipe!') {
    abilityToCookBtn.classList.add('cook-button');
  } else if (recipeStatus === 'Missing Ingredients!') {
    abilityToCookBtn.classList.toggle('.cook-button');
  }

  abilityToCookBtn.dataset.recipeId = `${recipe.id}`;
  abilityToCookBtn.addEventListener('click', function (event) {
    displayCookRecipePopUp(event, recipe);
  });
  cookRecipeContainer.appendChild(abilityToCookBtn);
  recipeCard.appendChild(cookRecipeContainer);
}


function displayCookRecipePopUp(event, recipe) {
  if (event.target.innerText === 'Cook this recipe!') {
    removeIngredientsFromPantry(recipe.id, store.user);
  } else if (event.target.innerText === 'Missing Ingredients!') {
    createMissingIngredientsModal(recipe.id);
  }
}


// ------- Recipe Card Actions -------

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


// ----- Missing Ingredients Modal -----

function createMissingIngredientsModal(recipeId) {
  missingIngredientsList.innerHTML = '';
  display(missingIngredientModal);
  addIngredientsBtn.dataset.recipeId = recipeId;
  const recipe = store.recipeRepo.findRecipeById(recipeId);
  const ingredientList = createMissingIngredientsList(recipe);
  createMissingListElements(ingredientList);

  close.onclick = () => {
    removeDisplay(modal);
  };
}


function createMissingIngredientsList(recipe) {
  const missingIngredients = store.user.getMissingIngredientsForRecipe(recipe);
  const ingredientList = missingIngredients.map((missingIngredient) => {
    if (
      missingIngredient.unit === '' &&
      missingIngredient.name[missingIngredient.name.length - 1] !== 's'
    ) {
      return `${missingIngredient.amount} ${missingIngredient.unit} ${missingIngredient.name}s`;
    } else {
      return `${missingIngredient.amount} ${missingIngredient.unit} ${missingIngredient.name}`;
    }
  });
  return ingredientList;
}


function createMissingListElements(ingredientList) {
  ingredientList.forEach((listedIngredient) => {
    const ingredient = document.createElement('li');
    ingredient.innerText = `${listedIngredient}`;
    missingIngredientsList.appendChild(ingredient);
  });
}


function closePopUp(event) {
  if (event.target.id === 'dismissButton') {
    removeDisplay(popupSuccess)
    removeDisplay(popupError)
  }
}


// ----- Adding/Removing Ingredients from Pantry -----

function addToPantry() {
  const recipeId = Number(addIngredientsBtn.dataset.recipeId);
  toggleIngredientsBtn();
  addAllIngredients(recipeId, store.user);

  setTimeout(() => {
    addIngredientsBtn.classList.remove('btn-loading');
    removeDisplay(missingIngredientModal)
  }, 2000);
}


// ----- Adding/Removing Recipes from Favorites -----

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

// ------- Modal Display --------

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
  display(modal)
  modal.ariaModal = true
  buildModalQuerySelectors(recipe);
  updateModalIngredients(recipe);
  updateModalInstructions(recipe);
  updateModalCost(recipe);
}


// ----- Filter Tags -----

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
    tagElement.setAttribute('tabindex', 0)
    tagElement.innerText = tag;
    tagElement.onclick = tagsToggleFilter;
    tagElement.addEventListener('keyup', (event) => {
      if(event.key === "Enter") {
        tagsToggleFilter(event)
      }
    })
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
  event.target.ariaSelected='true'
  clearSearchBar();
  const filterSelectedTags = store.tagList.filter((tag) =>
    tag.classList.contains('recipe-tag-selected')
  );

  filterSelectedTags.forEach((tag) => {
    console.log(tag)
    tag.classList.remove('recipe-tag-selected')
    tag.ariaSelected = 'false'
    }
  );

  let userTag = getTag(event);

  if (allRecipesTab.checked) {
    const filteredRecipes = store.recipeRepo.filterByTag(userTag);
    resetCurrentRecipeRepo(filteredRecipes);
    updateRecipeDisplay(filteredRecipes);
  } else if (cookbookTab.checked) {
    const filteredRecipes = store.user.favoriteRecipeRepo.filterByTag(userTag);
    resetCurrentRecipeRepo(filteredRecipes);
    updateRecipeDisplay(filteredRecipes);
  }
}


function removeTag() {
  deselectTag();

  if (allRecipesTab.checked) {
    resetCurrentRecipeRepo(store.recipeRepo.allRecipes);
    updateRecipeDisplay(store.recipeRepo.allRecipes);
  } else if (cookbookTab.checked) {
    resetCurrentRecipeRepo(store.user.favoriteRecipeRepo.allRecipes);
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


function resetTabs(event, repo) {
  if (event.target.id === 'tabCookbook') {
    cookbookFlag = true;
    cookbookTab.ariaChecked = true;
    allRecipesTab.ariaChecked = false;
  } else if (event.target.id === 'tabAllRecipes') {
    cookbookFlag = false;
    allRecipesTab.ariaChecked = true;
    cookbookTab.ariaChecked = false;
  }
  resetCurrentRecipeRepo(repo);
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

// ----- Search -----

function searchRecipesByName(search) {
  if (allRecipesTab.checked && search.length > 0) {
    let nameFilteredRecipes = store.recipeRepo.searchByName(search);
    updateRecipeDisplay(nameFilteredRecipes);
    changeSearchButton(clearAllRecipeSearchButton, searchAllRecipesButton);
    deselectTag();
  } else if (cookbookTab.checked && search.length > 0) {
    let nameFilteredRecipes =
      store.user.favoriteRecipeRepo.searchByName(search);
    resetCurrentRecipeRepo(nameFilteredRecipes);
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


function display(element) {
  element.style.display = 'block'
}


function removeDisplay(element) {
  element.style.display = 'none'
}


function resetCurrentRecipeRepo(newRecipeRepo) {
  currentRecipeDisplay = '';
  currentRecipeDisplay = newRecipeRepo;
}


function toggleIngredientsBtn() {
  addIngredientsBtn.classList.add('btn-loading');
  } 