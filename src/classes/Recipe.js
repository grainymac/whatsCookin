import ingredientsData from '../data/ingredients'
import Ingredient from './Ingredient'

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id
    this.image = recipeData.image
    this.recipeIngredients = recipeData.ingredients
    this.instructions = recipeData.instructions
    this.name = recipeData.name
    this.searchableName = recipeData.name.toLowerCase()
    this.tags = recipeData.tags
    this.ingredients = this.getAllIngredientsData()
  }

  getAllIngredientsData() {
    return this.recipeIngredients.map((ingredient) => {
      const id = ingredient.id
      const amount = ingredient.quantity.amount
      const unit = ingredient.quantity.unit
      const matchedIngredient = ingredientsData.find(
        (ingredient) => ingredient.id === id
      )

      return new Ingredient(
        id,
        matchedIngredient.name,
        matchedIngredient.estimatedCostInCents,
        amount,
        unit
      )
    })
  }

  findIngredientNames() {
    return this.ingredients.map((ingredient) => ingredient.name)
  }

  totalCost() {
    return this.ingredients.reduce((accumulator, value) => {
      return accumulator += value.estimatedCostInCents * value.amount
    }, 0)
  }

  getInstructions() {
    return this.instructions.map(recipeStep => recipeStep.instruction)
  }
}

export default Recipe