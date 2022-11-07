import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipes) {
    this.allRecipes = recipes || [];
  }

  static fromRecipeData(recipeData, ingredientsData) {
    // Aggregate ingredients to remove duplicates.
    recipeData.forEach((recipe) => {
      const recipeIngredientMap = {};

      recipe.ingredients.forEach((ingredient) => {
        const recipeIngredient = recipeIngredientMap[ingredient.id];
        if (!recipeIngredient) {
          recipeIngredientMap[ingredient.id] = ingredient;
        } else {
          recipeIngredient.quantity.amount += ingredient.quantity.amount;
        }
      });

      recipe.ingredients = Object.values(recipeIngredientMap);
    });

    const recipes = recipeData.map((currentRecipe) => {
      return new Recipe(currentRecipe, ingredientsData);
    });
    return new RecipeRepository(recipes);
  }

  filterByTag(tag) {
    return this.allRecipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  }

  searchByName(userSearch) {
    return this.allRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userSearch.toLowerCase());
    });
  }

  retrieveAllTags() {
    const allTags = this.allRecipes.flatMap((recipe) => {
      return recipe.tags;
    });
    return Array.from(new Set(allTags));
  }

  addRecipe(recipe) {
    if (!this.allRecipes.includes(recipe)) {
      this.allRecipes.push(recipe);
    }
  }

  removeRecipe(recipe) {
    if (this.allRecipes.includes(recipe)) {
      this.allRecipes.splice(this.allRecipes.indexOf(recipe), 1);
    }
  }

  findRecipeById(recipeID) {
    return this.allRecipes.find((recipe) => {
      return recipe.id === recipeID;
    });
  }
}

export default RecipeRepository;
