import Ingredient from './Ingredient'
import RecipeRepository from './RecipeRepository'

class User {
  constructor(userData = {}, pantryIngredients = []) {
    this.id = userData.id
    this.name = userData.name
    this.pantry = pantryIngredients
    this.favoriteRecipeRepo = new RecipeRepository()
  }

  static fromUserData(userData, ingredientsData) {
    const pantryIngredients = userData.pantry.map((pantryIngredient) => {
      return Ingredient.fromIngredientData(pantryIngredient, ingredientsData)
    })
    return new User(userData, pantryIngredients)
  }

  addFavoriteRecipe = (recipe) => {
    return this.favoriteRecipeRepo.addRecipe(recipe)
  }

  removeFavoriteRecipe = (recipe) => {
    return this.favoriteRecipeRepo.removeRecipe(recipe)
  }

  filterFavoriteRecipesByTag(tag) {
    return this.favoriteRecipeRepo.filterByTag(tag)
  }

  searchFavoriteRecipesByName(userSearch) {
    return this.favoriteRecipeRepo.searchByName(userSearch)
  }

  getMissingIngredientsForRecipe(recipe) {
    const missingIngredients = []

    recipe.ingredients.forEach((recipeIngredient) => {
      const foundIngredient = this.pantry.find((pantryIngredient) => {
        return recipeIngredient.id === pantryIngredient.ingredient
      })
      if (!foundIngredient) {
        missingIngredients.push({
          id: recipeIngredient.id,
          name: recipeIngredient.name,
          amount: recipeIngredient.amount,
        })
      } else if (foundIngredient.amount < recipeIngredient.amount) {
        missingIngredients.push({
          id: recipeIngredient.id,
          name: recipeIngredient.name,
          amount: recipeIngredient.amount - foundIngredient.amount,
        })
      }
    })

    return missingIngredients
  }
}

export default User
