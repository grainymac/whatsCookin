import Ingredient from './Ingredient';
import RecipeRepository from './RecipeRepository';

class User {
  constructor(userData = {}, pantryIngredients = []) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = pantryIngredients;
    this.favoriteRecipeRepo = new RecipeRepository();
  }

  static fromUserData(userData, ingredientsData) {
    const pantryIngredients = userData.pantry.map((pantryIngredient) => {
      return Ingredient.fromIngredientData(
        { id: pantryIngredient.ingredient, amount: pantryIngredient.amount },
        ingredientsData
      );
    });
    return new User(userData, pantryIngredients);
  }

  addFavoriteRecipe = (recipe) => {
    return this.favoriteRecipeRepo.addRecipe(recipe);
  };

  removeFavoriteRecipe = (recipe) => {
    return this.favoriteRecipeRepo.removeRecipe(recipe);
  };

  filterFavoriteRecipesByTag(tag) {
    return this.favoriteRecipeRepo.filterByTag(tag);
  }

  searchFavoriteRecipesByName(userSearch) {
    return this.favoriteRecipeRepo.searchByName(userSearch);
  }

  addPantryIngredients(recipe, ingredientsData) {
    const newIngredients = this.getMissingIngredientsForRecipe(recipe);

    newIngredients.forEach((newIngredient) => {
      const foundIngredient = this.pantry.find(
        (pantryIngredient) => pantryIngredient.id === newIngredient.id
      );
      if (foundIngredient) {
        foundIngredient.amount += newIngredient.amount;
      } else {
        const newPantryIngredient = Ingredient.fromIngredientData(
          newIngredient,
          ingredientsData
        );
        this.pantry.push(newPantryIngredient);
      }
    });
  }

  removePantryIngredients(recipe) {
    recipe.ingredients.forEach((recipeIngredient) => {
      const foundIngredient = this.pantry.find((pantryIngredient) => {
        return pantryIngredient.id === recipeIngredient.id
      });
      foundIngredient.amount -= recipeIngredient.amount
    })
  }

  getMissingIngredientsForRecipe(recipe) {
    const missingIngredients = [];
    recipe.ingredients.forEach((recipeIngredient) => {
      const foundIngredient = this.pantry.find((pantryIngredient) => {
        return recipeIngredient.id === pantryIngredient.id;
      });
      if (!foundIngredient) {
        missingIngredients.push({
          id: recipeIngredient.id,
          name: recipeIngredient.name,
          amount: recipeIngredient.amount,
        });
      } else if (foundIngredient.amount < recipeIngredient.amount) {
        missingIngredients.push({
          id: recipeIngredient.id,
          name: recipeIngredient.name,
          amount: recipeIngredient.amount - foundIngredient.amount,
        });
      }
    });

    return missingIngredients;
  }
}

export default User;
