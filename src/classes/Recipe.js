import ingredientsData from '../data/ingredients'
import Ingredient from './Ingredient'

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id
    this.image = recipeData.image
    this.recipeIngredients = recipeData.ingredients
    this.instructions = recipeData.instructions
    this.name = recipeData.name
    this.tags = recipeData.tags
    this.ingredients = this.getAllIngredientsData()
  }

  getAllIngredientsData() {
    // For each ingredient contained in this.ingredients, we want to:
    // 1. Store the ID, amount, and units data of that ingredient in this.ingredientsRepo
    // 2. Find the object with a matching ID in the ingredientsData array
    // 3. Store the name and estimated cost in ingredientsRepo
    return this.recipeIngredients.map((ingredient) => {
      const id = ingredient.id
      const amount = ingredient.quantity.amount
      const units = ingredient.quantity.unit
      const matchedIngredient = ingredientsData.find(
        (ingredient) => ingredient.id === id
      )

      return new Ingredient(
        id,
        matchedIngredient.name,
        matchedIngredient.estimatedCostInCents,
        units,
        amount
      )
    })

    // const ids = this.ingredients.map((ingredient) => ingredient.id)
    // return ingredientsData.filter((ingredient) => ids.includes(ingredient.id))
  }

  findIngredeintNames() {
    const matchedIngredients = this.getAllIngredientsData()
    return matchedIngredients.map((ingredient) => ingredient.name)
  }

  totalCost() {
    const matchedIngredients = this.getAllIngredientsData()
    const costs = matchedIngredients.map(
      (ingredient) => ingredient.estimatedCostInCents
    )
    // this.ingredients.reduce((accumulator, value) => {

    // })
    // amounts.find(ingredient => ingredient.id)
  }
}

export default Recipe
