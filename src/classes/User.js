import Recipe from './Recipe'
import RecipeRepository from './RecipeRepository'

class User {
  constructor(userData = {}) {
    this.id = userData.id
    this.name = userData.name
    this.pantry = userData.pantry
    this.favoriteRecipeRepo = new RecipeRepository()
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
